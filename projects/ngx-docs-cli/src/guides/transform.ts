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
  .use(markdownDocsClasses)
  .use(require('markdown-it-anchor'), {permalink: false});

export const transform = pipe(
  logFile,
  map( (file: MarkdownFile) => {
    // strip any front matter and save resulting yaml
    if (fm.test(file.rawData)) {
      const fmObject = fm(file.rawData);
      file.content = fmObject.body;
      file.yaml = fmObject.attributes;
    }

    return file;
  }),
  map( (file: MarkdownFile) => {
    file.content = md.render(file.content);
    return file;
  })
);
