import { Package } from 'dgeni';
import * as path from 'path';

import { Categorizer } from './processors/categorizer';
import { ComponentGrouper } from './processors/component-grouper';
import { DocsPrivateFilter } from './processors/docs-private-filter';
import { FilterDuplicateExports } from './processors/filter-duplicate-exports';
import { MergeInheritedProperties } from './processors/merge-inherited-properties';

// Dgeni packages that the Material docs package depends on.
const jsdocPackage = require('dgeni-packages/jsdoc');
const nunjucksPackage = require('dgeni-packages/nunjucks');
const typescriptPackage = require('dgeni-packages/typescript');

export const apiDocsPackage = new Package('ng-aquila-api-docs', [jsdocPackage, nunjucksPackage, typescriptPackage]);

// Processor that filters out duplicate exports that should not be shown in the docs.
apiDocsPackage.processor(new FilterDuplicateExports());

// Processor that merges inherited properties of a class with the class doc.
apiDocsPackage.processor(new MergeInheritedProperties());

// Processor that filters out symbols that should not be shown in the docs.
apiDocsPackage.processor(new DocsPrivateFilter());

// Processor that appends categorization flags to the docs, e.g. `isDirective`, `isNgModule`, etc.
apiDocsPackage.processor(new Categorizer());

// Processor to group components into top-level groups such as "Tabs", "Sidenav", etc.
apiDocsPackage.processor(new ComponentGrouper());

apiDocsPackage.config((log, readFilesProcessor, readTypeScriptModules, templateFinder, templateEngine, writeFilesProcessor) => {
    log.level = 'warn';

    /** disable readFilesProcessor as we are using readTypeScriptModules */
    readFilesProcessor.$enabled = false;
    readTypeScriptModules.hidePrivateMembers = true;

    // Specify collections of source files that should contain the documentation to extract
    readTypeScriptModules.sourceFiles = [
        {
            include: '**/*.ts',
        },
    ];

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders.unshift(path.resolve(__dirname, './templates'));

    // Specify how to match docs to templates.
    // In this case we just use the same static template for all docs
    templateFinder.templatePatterns = [
        '${ doc.template }',
        '${ doc.id }.${ doc.docType }.template.html',
        '${ doc.id }.template.html',
        '${ doc.docType }.template.html',
        '${ doc.id }.${ doc.docType }.template.js',
        '${ doc.id }.template.js',
        '${ doc.docType }.template.js',
        '${ doc.id }.${ doc.docType }.template.json',
        '${ doc.id }.template.json',
        '${ doc.docType }.template.json',
        'common.template.html',
    ];

    templateEngine.config.tags = {
        variableStart: '{$',
        variableEnd: '$}',
    };
});

// Configure custom JsDoc tags.
apiDocsPackage.config((parseTagsProcessor: any) => {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
        { name: 'docs-private' }, // prevent listing an item in the documentation app
        { name: 'deletion-target' }, // communicate in which version the deletion is intended
        { name: 'title' }, // display inlined text as title in the documentation app (used for example components)
        { name: 'dynamic' }, // TODO research what this is for, do we need it? we only have 2 occurrences.

        // standard jsdoc tags:
        { name: 'throws' }, // not recognized by dgeni-packages
    ]);
});

apiDocsPackage.config(computePathsProcessor => {
    computePathsProcessor.pathTemplates = [
        {
            docTypes: ['componentGroup'],
            pathTemplate: '${name}',
            outputPathTemplate: '${name}.html',
        },
    ];
});
