import {
  findElementsWithAttribute,
  getProjectFromWorkspace,
  getPropertyNameText,
  isStringLiteralLike,
  parse5,
} from '@angular/cdk/schematics';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { readWorkspace } from '@schematics/angular/utility';
import * as ts from 'typescript';

import { Schema } from './schema';

type Parse5Element = parse5.DefaultTreeAdapterMap['element'];

/** Attribute names as parse5 reports them (lower case). */
const BUTTON_ATTRS = ['nxbutton', 'nxiconbutton'];
const PLAIN_BUTTON_ATTR = 'nxplainbutton';

const APPEARANCES = ['primary', 'secondary', 'tertiary', 'cta', 'emphasis', 'attention'];
const SIZES = ['small', 'small-medium', 'medium', 'large'];
const FLAGS = ['danger', 'negative', 'block'];
const KNOWN_TOKENS = [...APPEARANCES, ...SIZES, ...FLAGS];

const BUTTON_SELECTOR_PATTERN = /nx(Icon|Plain)?Button/;

interface Template {
  content: string;
  /** Offset of the template inside its file. */
  offset: number;
  /** Quote character of the enclosing TS string, for inline templates. */
  delimiter?: string;
}

interface Edit {
  start: number;
  end: number;
  text: string;
}

export default function (options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const root = options.path ?? (await getSourceRoot(tree, options));
    const dir = tree.getDir(root);
    if (options.path && dir.subfiles.length === 0 && dir.subdirs.length === 0) {
      throw new SchematicsException(
        `Path "${options.path}" does not exist or is empty. It must be relative to the workspace root.`,
      );
    }
    let migratedButtons = 0;
    let migratedFiles = 0;

    dir.visit((filePath) => {
      if (filePath.includes('/node_modules/') || !/\.(html|ts)$/.test(filePath)) {
        return;
      }
      const content = tree.readText(filePath);
      if (!BUTTON_SELECTOR_PATTERN.test(content)) {
        return;
      }

      const warn = (offset: number, message: string) =>
        context.logger.warn(`${filePath}:${position(content, offset)} - ${message}`);
      const templates = filePath.endsWith('.html')
        ? [{ content, offset: 0 }]
        : findInlineTemplates(filePath, content, warn);

      const edits = templates.flatMap((template) => migrateTemplate(template, warn));
      if (edits.length === 0) {
        return;
      }

      const recorder = tree.beginUpdate(filePath);
      for (const edit of edits) {
        recorder.remove(edit.start, edit.end - edit.start);
        recorder.insertLeft(edit.start, edit.text);
      }
      tree.commitUpdate(recorder);
      migratedButtons += edits.length;
      migratedFiles++;
    });

    context.logger.info(`Migrated ${migratedButtons} button(s) in ${migratedFiles} file(s).`);
  };
}

async function getSourceRoot(tree: Tree, options: Schema): Promise<string> {
  const workspace = await readWorkspace(tree);
  const projectNames = [...workspace.projects.keys()];
  // `$default: projectName` is only filled in by `ng g` inside a project, not by the schematics CLI.
  const projectName = options.project ?? (projectNames.length === 1 ? projectNames[0] : undefined);
  if (!projectName) {
    throw new SchematicsException(
      `The workspace has several projects. Pass --project=<${projectNames.join('|')}> or --path=<dir>.`,
    );
  }
  const project = getProjectFromWorkspace(workspace, projectName);
  return project.sourceRoot || project.root || '/';
}

/** Finds the `template` of every `@Component` decorator. */
function findInlineTemplates(
  filePath: string,
  content: string,
  warn: (offset: number, message: string) => void,
): Template[] {
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
  const templates: Template[] = [];

  const visit = (node: ts.Node): void => {
    if (
      (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node)) &&
      getPropertyNameText(node.name) === 'template' &&
      isComponentDecoratorArgument(node.parent)
    ) {
      if (ts.isPropertyAssignment(node) && isStringLiteralLike(node.initializer)) {
        // Slice the raw source instead of using `initializer.text`, so offsets still match the file.
        const start = node.initializer.getStart(sourceFile) + 1;
        const end = node.initializer.getEnd() - 1;
        templates.push({
          content: content.slice(start, end),
          offset: start,
          delimiter: content[start - 1],
        });
      } else {
        const expression = ts.isPropertyAssignment(node) ? node.initializer : node.name;
        warn(
          expression.getStart(sourceFile),
          'The template is not a plain string literal and was not migrated. Migrate any buttons in it by hand.',
        );
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  return templates;
}

function isComponentDecoratorArgument(node: ts.Node): boolean {
  const call = node.parent;
  return (
    ts.isCallExpression(call) &&
    ts.isIdentifier(call.expression) &&
    call.expression.text === 'Component'
  );
}

function migrateTemplate(
  template: Template,
  warn: (offset: number, message: string) => void,
): Edit[] {
  const edits: Edit[] = [];

  for (const attrName of [...BUTTON_ATTRS, PLAIN_BUTTON_ATTR]) {
    const isButton = attrName !== PLAIN_BUTTON_ATTR;

    for (const bound of [`[${attrName}]`, `bind-${attrName}`]) {
      for (const element of findElementsWithAttribute(template.content, bound)) {
        warnDynamic(template, element, bound, isButton, warn);
      }
    }

    for (const element of findElementsWithAttribute(template.content, attrName)) {
      const attr = element.attrs.find((a) => a.name === attrName)!;
      const location = element.sourceCodeLocation!.attrs![attrName];
      const offset = template.offset + location.startOffset;

      if (attr.value.includes('{{')) {
        warnDynamic(template, element, attrName, isButton, warn);
        continue;
      }

      const tokens = attr.value.split(/\s+/).filter(Boolean);
      const unknown = tokens.filter((token) => !KNOWN_TOKENS.includes(token));
      if (isButton && unknown.length > 0) {
        warn(offset, `Unknown button modifier(s) "${unknown.join(' ')}" — button not migrated.`);
        continue;
      }

      const original = template.content.slice(location.startOffset, location.endOffset);
      const name = sourceName(template, location.startOffset, attrName);
      const fallbackQuote = template.delimiter === '"' ? "'" : '"';
      const quote = original.charAt(original.indexOf('=') + 1) === "'" ? "'" : fallbackQuote;
      const hasInput = (input: string) =>
        element.attrs.some((a) => [input, `[${input}]`, `bind-${input}`].includes(a.name));

      const replacement = isButton
        ? migrateButton(name, quote, tokens, hasInput)
        : migratePlainButton(name, quote, tokens, hasInput);

      if (replacement !== original) {
        edits.push({ start: offset, end: template.offset + location.endOffset, text: replacement });
      }
    }
  }

  return edits;
}

function warnDynamic(
  template: Template,
  element: Parse5Element,
  attrName: string,
  isButton: boolean,
  warn: (offset: number, message: string) => void,
): void {
  const start = element.sourceCodeLocation!.attrs![attrName].startOffset;
  const hint = isButton
    ? `Move size, danger (now "critical"), negative (now "inverse") and block into their own ` +
      `inputs, e.g. nxButton="secondary" [inverse]="isInverse".`
    : `"danger" has no effect on nxPlainButton any more; bind [critical] instead.`;
  warn(
    template.offset + start,
    `"${sourceName(template, start, attrName)}" is bound dynamically and was not migrated. ${hint}`,
  );
}

/**
 * `nxButton="secondary small danger negative block"` →
 * `nxButton="secondary" size="small" critical inverse block`.
 * A modifier that is already set through its own input is dropped, since the input wins anyway.
 */
function migrateButton(
  name: string,
  quote: string,
  tokens: string[],
  hasInput: (input: string) => boolean,
): string {
  const appearance = tokens.find((token) => APPEARANCES.includes(token));
  const size = tokens.find((token) => SIZES.includes(token));
  const inputs: string[] = [];

  if (size && !hasInput('size')) {
    inputs.push(`size=${quote}${size}${quote}`);
  }
  if (tokens.includes('danger') && !hasInput('critical')) {
    inputs.push('critical');
  }
  if (tokens.includes('negative') && !hasInput('negative') && !hasInput('inverse')) {
    inputs.push('inverse');
  }
  if (tokens.includes('block') && !hasInput('block')) {
    inputs.push('block');
  }

  return [withValue(name, quote, appearance), ...inputs].join(' ');
}

/** `nxPlainButton="danger"` no longer has any effect, `critical` replaces it. */
function migratePlainButton(
  name: string,
  quote: string,
  tokens: string[],
  hasInput: (input: string) => boolean,
): string {
  const rest = tokens.filter((token) => token !== 'danger');
  const attr = withValue(name, quote, rest.join(' '));
  return tokens.includes('danger') && !hasInput('critical') ? `${attr} critical` : attr;
}

function withValue(name: string, quote: string, value: string | undefined): string {
  return value ? `${name}=${quote}${value}${quote}` : name;
}

/** The attribute name as written in the source, since parse5 lower-cases it. */
function sourceName(template: Template, start: number, attrName: string): string {
  return template.content.slice(start, start + attrName.length);
}

function position(content: string, offset: number): string {
  const lines = content.slice(0, offset).split('\n');
  return `${lines.length}:${lines[lines.length - 1].length + 1}`;
}
