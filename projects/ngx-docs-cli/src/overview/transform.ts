import * as fmImport from 'front-matter';
// front-matter 4.0.2 exports the type declarations incorrectly
// use this until that is fixed
const fm = fmImport as any;
import * as hljs from 'highlight.js';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { markdownDocsClasses } from '../shared/markdown-docs';
import { MarkdownFile } from '../shared/markdown-file';
import { logFile } from '../shared/logging';


const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  })
  .use(require('markdown-it-anchor'), {permalink: false})
  .use(markdownDocsClasses);

const EXAMPLE_PATTERN = /<!--\W*example\(([^)]+)\)\W*-->/g;

const renderMarkdown = map( (file: MarkdownFile) => {
  file.content = md.render(file.content);
  return file;
});

// parse and strip away any front matter meta data fron the content
// so it's not included in the html output
const processFrontMatter = map( (file: MarkdownFile) => {
  if (fm.test(file.rawData)) {
    const fmObject = fm(file.rawData);
    file.content = fmObject.body;
    file.yaml = fmObject.attributes;
  }

  return file;
});

// Replace all example makers with a div
// And collect all found examples in an array so we
// can save them in the manifest file later
const parseExamples = map( (file: MarkdownFile) => {
  const content = file.content;

  // replace  marker with a div to attach later
  file.content = replaceMarkers(content);

  // collect all examples for this component
  file.examples = getAllExamplesIDs(content);
  return file;
});


function getAllExamplesIDs(value: string) {
  const ids = [];
  let match = EXAMPLE_PATTERN.exec(value);
  while (match !== null) {
    const name = match[1].split(',')[0];
    ids.push(name);
    match = EXAMPLE_PATTERN.exec(value);
  }

  return ids;
}

const replaceMarkers = content => (
  content.replace(EXAMPLE_PATTERN, (_match: string, example: string) => {
    const name = example.split(',')[0];
    const containsConfig = example.indexOf(',') !== -1;
    const config = containsConfig ? example.replace(/[^,]*,\s*/, '') : '{}';
    return `<div nx-docs-example="${name}" config="${config.replace(/"/g, `'`)}">exampleID: ${name}</div>`;
  })
);


export const transform = pipe(
  logFile,
  processFrontMatter,
  renderMarkdown,
  parseExamples
);
