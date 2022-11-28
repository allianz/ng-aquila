import * as fmImport from 'front-matter';
import hljs from 'highlight.js';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { logFile } from '../shared/logging';
import { markdownDocsClasses } from '../shared/markdown-docs';
import { MarkdownFile } from '../shared/markdown-file';
// front-matter 4.0.2 exports the type declarations incorrectly
// use this until that is fixed
const fm = fmImport as any;

const md = require('markdown-it')({
    html: true,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    },
})
    .use(require('markdown-it-anchor'), { permalink: false })
    .use(markdownDocsClasses);

const EXAMPLE_PATTERN = /<!--\W*example\(([^)]+)\)\W*-->/g;

const renderMarkdown = map((file: MarkdownFile) => {
    file.content = md.render(file.content);
    return file;
});

// parse and strip away any front matter meta data fron the content
// so it's not included in the html output
const processFrontMatter = map((file: MarkdownFile) => {
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
const parseExamples = ignorePrivateExamples =>
    map((file: MarkdownFile) => {
        const content = file.content;

        // replace  marker with a div to attach later
        file.content = replaceMarkers(content, ignorePrivateExamples);

        // collect all examples for this component
        file.examples = getAllExamples(content, ignorePrivateExamples);

        return file;
    });

function getAllExamples(value: string, ignorePrivateExamples) {
    const examples = [];
    let match = EXAMPLE_PATTERN.exec(value);
    while (match !== null) {
        const name = match[1].split(',')[0];
        const containsConfig = match[1].indexOf(',') !== -1;
        const config = containsConfig ? match[1].replace(/[^,]*,\s*/, '') : '{}';

        // add id if example is not private and private examples should be ignored
        if (!(config && config.indexOf('privateExample') !== -1 && ignorePrivateExamples)) {
            examples.push({ name, config: JSON.parse(config) });
        }

        match = EXAMPLE_PATTERN.exec(value);
    }

    return examples;
}

const replaceMarkers = (content, ignorePrivateExamples) =>
    content.replace(EXAMPLE_PATTERN, (_match: string, example: string) => {
        const name = example.split(',')[0];
        const containsConfig = example.indexOf(',') !== -1;
        const config = containsConfig ? example.replace(/[^,]*,\s*/, '') : '{}';

        if (config && config.indexOf('privateExample') !== -1 && ignorePrivateExamples) {
            return ``;
        }

        return `<div nx-docs-example="${name}" config="${config.replace(/"/g, `'`)}">exampleID: ${name}</div>`;
    });

export const transform = ignorePrivateExamples => pipe(logFile, processFrontMatter, renderMarkdown, parseExamples(ignorePrivateExamples));
