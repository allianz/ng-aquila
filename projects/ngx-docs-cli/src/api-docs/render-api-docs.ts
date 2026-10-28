import * as fs from 'fs-extra';
import * as path from 'path';

import { ComponentGroup } from './processors/component-grouper';
import { ContentSlotPage } from './processors/content-slot-page';

import Handlebars = require('handlebars');
import MarkdownIt = require('markdown-it');

// HTML in doc comments (e.g. `<nx-card>`) is shown as text.
const md = MarkdownIt({ html: false, linkify: true });

const TEMPLATES_DIR = path.resolve(__dirname, './templates');

/**
 * `strict` throws on a field that doesn't exist instead of rendering nothing. `noEscape` leaves the
 * output as it is, so only what goes through the `escape` helper is escaped.
 */
const COMPILE_OPTIONS: CompileOptions = {
  strict: true,
  noEscape: true,
  ignoreStandalone: true,
  preventIndent: true,
};

const ESCAPED_CHARACTERS: { [key: string]: string } = {
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;',
  '<': '&lt;',
  '>': '&gt;',
  '\\': '&#92;',
};

const handlebars = Handlebars.create();

handlebars.registerHelper({
  marked: (content: string) => content && md.render(content),
  // Not `Handlebars.escapeExpression`, which also escapes `=` in types such as `() => void`.
  escape: (text: unknown) =>
    text == null ? '' : String(text).replace(/["&'<>\\]/g, (char) => ESCAPED_CHARACTERS[char]),
  or: (...args: unknown[]) => {
    const values = args.slice(0, -1);
    return values.find(Boolean) ?? values[values.length - 1];
  },
  and: (...args: unknown[]) => args.slice(0, -1).every(Boolean),
  neq: (a: unknown, b: unknown) => a !== b,
});

/** Compiles every template in the templates folder, e.g. `method-list.template.hbs` as `methodList`. */
const templates = Object.fromEntries(
  fs
    .readdirSync(TEMPLATES_DIR)
    .filter((file) => file.endsWith('.hbs'))
    .map((file) => {
      const name = file
        .replace(/(\.template)?\.hbs$/, '')
        .replace(/-(\w)/g, (_, char: string) => char.toUpperCase());
      const source = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');
      return [name, handlebars.compile(source, COMPILE_OPTIONS)];
    }),
);
handlebars.registerPartial(templates);

/** Writes the api page of every group to `dest`, and the slot pages next to it in `slots`. */
export async function renderApiDocs(
  groups: ComponentGroup[],
  slotPages: ContentSlotPage[],
  dest: string,
) {
  await Promise.all([
    ...groups.map((doc) => render('componentGroup', doc, path.join(dest, `${doc.name}.html`))),
    ...slotPages.map((doc) =>
      render('contentSlotPage', doc, path.join(dest, '../slots', `${doc.name}.html`)),
    ),
  ]);
}

function render(template: string, doc: ComponentGroup | ContentSlotPage, file: string) {
  return fs.outputFile(file, templates[template]({ doc }));
}
