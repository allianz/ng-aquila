import * as fs from 'fs';
import * as path from 'path';

import { CategorizedClassDoc, ContentSlot, ContentSlotSelector } from './dgeni-definitions';

/**
 * Matches an `<ng-content>` tag and, if there is one directly in front of it, the HTML comment
 * that documents it. The inner group of the comment must not run over a `-->` so that a comment
 * somewhere earlier in the template cannot be glued to an unrelated `<ng-content>`.
 */
const NG_CONTENT_PATTERN = /(?:<!--((?:(?!-->)[\s\S])*)-->\s*)?<ng-content\b([^>]*)>/g;

/** Matches the value of the `select` attribute of an `<ng-content>` tag. */
const SELECT_ATTRIBUTE_PATTERN = /\bselect\s*=\s*(?:"([^"]*)"|'([^']*)')/;

/** Prefix an HTML comment needs in order to be picked up as the description of a slot. */
const SLOT_COMMENT_PREFIX = '@slot';

/** Matches a selector that is nothing but an element name, such as `nx-formfield`. */
const ELEMENT_SELECTOR_PATTERN = /^[a-z][\w-]*$/i;

/**
 * Splits the selectors a directive is used by into the parts a template needs to render them.
 * Whether a selector is an element name decides if it reads as a tag (`<nx-formfield>`) or stays
 * verbatim (`[nxComparisonTableCell]`); the template cannot tell the two apart on its own.
 */
export function getHostSelectors(classDoc: CategorizedClassDoc): ContentSlotSelector[] {
  return (classDoc.directiveSelectors ?? []).map((selector) => {
    const text = selector.trim();

    return { text, isElement: ELEMENT_SELECTOR_PATTERN.test(text) };
  });
}

/**
 * Reads the content projection slots of a component or directive from its template.
 *
 * Both inline templates and templates that live in a separate file are supported. Inline
 * templates that are built from a template literal with interpolations are not, because the
 * directive metadata only keeps plain string literals.
 */
export function getContentSlots(classDoc: CategorizedClassDoc): ContentSlot[] {
  const template = getTemplateContent(classDoc);

  if (!template) {
    return [];
  }

  const slots: ContentSlot[] = [];
  const pattern = new RegExp(NG_CONTENT_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(template)) !== null) {
    const [, comment, attributes] = match;
    const selectMatch = attributes.match(SELECT_ATTRIBUTE_PATTERN);
    const select = selectMatch ? (selectMatch[1] ?? selectMatch[2]).trim() : '';

    const description = getSlotDescription(comment);
    const existing = slots.find((slot) => slot.select === select);

    // A template can project the same content in multiple branches, e.g. once for the
    // negative and once for the default appearance. That is a single slot for the reader,
    // documented by whichever of the branches carries a description.
    if (existing) {
      existing.description ||= description;
      continue;
    }

    slots.push({ select, isDefault: !select, description, targets: [] });
  }

  return slots;
}

/**
 * Splits a selector list such as `nx-card-header, [nxCardHeader]` into its single selectors.
 * Commas inside brackets or parentheses are part of a selector and don't split it.
 */
export function splitSelectorList(selectorList: string): string[] {
  const selectors: string[] = [];
  let current = '';
  let depth = 0;

  for (const character of selectorList) {
    if (character === '(' || character === '[') {
      depth++;
    } else if (character === ')' || character === ']') {
      depth--;
    } else if (character === ',' && depth === 0) {
      selectors.push(current);
      current = '';
      continue;
    }

    current += character;
  }

  selectors.push(current);

  return selectors.map((selector) => selector.trim()).filter((selector) => selector !== '');
}

/**
 * Resolves the keys a single selector can be looked up by. A selector is indexed by its full
 * text (`input[nxInput]`) and by each of its attributes (`[nxInput]`), so that a slot can be
 * matched even when it narrows or widens the selector of the directive it projects.
 */
export function getSelectorKeys(selector: string): string[] {
  // Pseudo classes like `:not(nxIconPositionStart)` only exclude candidates, they never
  // identify the directive that is meant to go into the slot.
  const cleaned = selector.replace(/:not\([^)]*\)/g, '').trim();

  if (!cleaned) {
    return [];
  }

  const attributes = cleaned.match(/\[[^\]]+\]/g) ?? [];
  const keys = [cleaned, ...attributes];

  // Only index a bare element name when the selector is nothing but that element name.
  // Otherwise `input[nxInput]` would claim every slot that selects an `input`.
  if (attributes.length === 0) {
    const elementName = cleaned.match(/^[a-z][\w-]*/i);

    if (elementName) {
      keys.push(elementName[0]);
    }
  }

  return keys.filter((key, index) => keys.indexOf(key) === index);
}

/** Reads the template of the given class doc, or null if it doesn't have a readable one. */
function getTemplateContent(classDoc: CategorizedClassDoc): string | null {
  const metadata = classDoc.directiveMetadata;

  if (!metadata) {
    return null;
  }

  const inlineTemplate = metadata.get('template');

  if (typeof inlineTemplate === 'string') {
    return inlineTemplate;
  }

  const templateUrl = metadata.get('templateUrl');
  const filePath = classDoc.fileInfo?.filePath;

  if (typeof templateUrl !== 'string' || !filePath) {
    return null;
  }

  const templatePath = path.resolve(path.dirname(filePath), templateUrl);

  try {
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.warn(
      `Warning: Could not read the template of ${classDoc.name} at ${templatePath}: ${(error as Error).message}`,
    );
    return null;
  }
}

/** Picks up the description of a slot from the HTML comment in front of it. */
function getSlotDescription(comment: string | undefined): string {
  const trimmed = comment?.trim() ?? '';

  return trimmed.startsWith(SLOT_COMMENT_PREFIX)
    ? trimmed.slice(SLOT_COMMENT_PREFIX.length).trim()
    : '';
}
