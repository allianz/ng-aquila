import * as fm from 'front-matter';
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
    ids.push(match[1]);
    match = EXAMPLE_PATTERN.exec(value);
  }

  return ids;
}


const replaceMarkers = content => (
  content.replace(EXAMPLE_PATTERN, (_match: string, name: string) =>
    `<div nx-docs-example="${name}">exampleID: ${name}</div>`
  )
);


export const transform = pipe(
  logFile,
  processFrontMatter,
  renderMarkdown,
  parseExamples
);
