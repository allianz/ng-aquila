/** A `@tag` of a JSDoc comment. */
export interface ParsedTag {
  tagName: string;
  /** Everything after the tag name, including the lines up to the next tag. */
  description: string;
  /** Only set on `@param` tags. */
  name?: string;
}

export interface TagCollection {
  /** The text in front of the first tag. */
  description: string;
  tags: ParsedTag[];
}

/** JSDoc fields a doc gets from its tags. */
export interface JsDocFields {
  tags: TagCollection;
  description: string;
  deprecated?: string;
  params?: (ParsedTag & { name: string })[];
  returns?: ParsedTag;
}

const END_OF_LINE = /\r?\n/;
const TAG_MARKER = /^\s*@(\S+)/;
const CODE_FENCE = /^\s*```(?!.*```)/;
const HTML_BLOCK_START = /^<([-a-z]+)\b[^>]*>/i;
const VOID_TAGS = [
  'area',
  'base',
  'basefont',
  'bgsound',
  'br',
  'col',
  'command',
  'embed',
  'frame',
  'hr',
  'image',
  'img',
  'input',
  'isindex',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'nextid',
  'param',
  'source',
  'track',
  'wbr',
];

/** Matches `name`, `[name]` or `[name=default]`. */
const PARAM_NAME = /^\s*(?:\[([^=\]]+)(?:=[^\]]+)?\]|(\S+))/;
/** Matches what separates the name from the description: whitespace or a dash. */
const PARAM_SEPARATOR = /^(?:[\t ]*-\s*|\s+)/;

/** The standard JSDoc tags, plus our own. */
const KNOWN_TAGS = new Set([
  'access',
  'animations',
  'async',
  'class',
  'classdesc',
  'const',
  'constant',
  'constructor',
  'deprecated',
  'description',
  'enum',
  'function',
  'global',
  'kind',
  'license',
  'memberof',
  'method',
  'module',
  'name',
  'namespace',
  'param',
  'private',
  'property',
  'propertyof',
  'protected',
  'public',
  'requires',
  'return',
  'returns',
  'see',
  'since',
  'throws',
  'type',
  'usage',
  'version',
  // --- Custom ---
  // Hides an item in the documentation app.
  'docs-private',
  // The version in which a deprecated item is going to be deleted.
  'deletion-target',
  // Title of an example component in the documentation app.
  'title',
  'dynamic',
]);

/** Warns about tags that are not in `KNOWN_TAGS` */
export function warnUnknownTags(doc: { id: string; tags: TagCollection }) {
  const unknownTags = doc.tags.tags.filter((tag) => !KNOWN_TAGS.has(tag.tagName));

  if (unknownTags.length) {
    console.warn(
      `Warning: Unknown JSDoc tags ${unknownTags.map((tag) => `@${tag.tagName}`).join(', ')} in`,
      doc.id,
    );
  }
}

/** Reads the tags of a JSDoc comment and the fields the templates use from them. */
export function getJsDocFields(content: string): JsDocFields {
  const tags = parseTags(content);
  const fields: JsDocFields = { tags, description: tags.description.trim() };
  const tagsNamed = (...names: string[]) => tags.tags.filter((tag) => names.includes(tag.tagName));

  const [descriptionTag] = tagsNamed('description');
  if (descriptionTag) {
    const description = tags.description
      ? `${tags.description}\n${descriptionTag.description}`
      : descriptionTag.description;
    fields.description = description.trim();
  }

  const [deprecatedTag] = tagsNamed('deprecated');
  if (deprecatedTag) {
    fields.deprecated = deprecatedTag.description.trim();
  }

  const paramTags = tagsNamed('param');
  if (paramTags.length) {
    fields.params = paramTags.map(extractName);
  }

  [fields.returns] = tagsNamed('returns', 'return');

  return fields;
}

/**
 * Splits a comment into the description in front of the first tag and the tags after it. Lines
 * inside a code fence or an HTML block never start a tag, so examples can show decorators.
 */
function parseTags(content: string): TagCollection {
  const lines = content.split(END_OF_LINE);
  const collection: TagCollection = { description: '', tags: [] };
  const descriptionLines: string[] = [];
  const isTagLine = createTagLineDetector(lines);
  let current: ParsedTag | null = null;

  lines.forEach((line, lineNumber) => {
    const match = isTagLine(line, lineNumber) ? TAG_MARKER.exec(line) : null;

    if (match) {
      if (current) {
        collection.tags.push(current);
      }
      current = { tagName: match[1], description: line.slice(match[0].length).trimStart() };
    } else if (current) {
      current.description = current.description ? `${current.description}\n${line}` : line;
    } else {
      descriptionLines.push(line);
    }
  });

  if (current) {
    collection.tags.push(current);
  }
  collection.description = descriptionLines.join('\n');

  return collection;
}

/** Tracks code fences and HTML blocks line by line; lines inside them can't start a tag. */
function createTagLineDetector(lines: string[]) {
  let inCode = false;
  let htmlTag: string | null = null;
  let htmlDepth = 0;

  return (line: string, lineNumber: number) => {
    if (CODE_FENCE.test(line)) {
      inCode = !inCode;
    }

    if (htmlDepth === 0 && lines[lineNumber - 1] === '') {
      const match = HTML_BLOCK_START.exec(line);
      if (match && !VOID_TAGS.includes(match[1])) {
        htmlTag = match[1];
      }
    }
    if (htmlTag) {
      htmlDepth += countTags(line, `<${htmlTag}`) - countTags(line, `</${htmlTag}`);
    }
    if (htmlDepth === 0) {
      htmlTag = null;
    }

    return !inCode && !htmlTag;
  };
}

function countTags(line: string, marker: string) {
  return line.match(new RegExp(`${marker}\\b[\\s\\S]*?(/)?>`, 'g'))?.length ?? 0;
}

/** Splits `@param name - description` into the name and the description. */
function extractName(tag: ParsedTag): ParsedTag & { name: string } {
  const match = PARAM_NAME.exec(tag.description);

  if (!match) {
    return { ...tag, name: '' };
  }

  const rest = tag.description.slice(match[0].length);
  const separator = PARAM_SEPARATOR.exec(rest)?.[0] ?? '';

  return {
    ...tag,
    name: (match[1] ?? match[2]).split('|')[0],
    description: rest.slice(separator.length),
  };
}
