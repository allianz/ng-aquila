import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { bindNodeCallback, pipe, of } from 'rxjs';
import { map, mergeAll, mergeMap, switchMap, toArray, mapTo, concatAll } from 'rxjs/operators';
import * as ts from 'typescript';

import { generateExampleMetadata } from './generate-metadata';
import { generateExampleNgModuleContent } from './generate-module';
import { parseExampleMetadata } from './parse-metadata';
import { MarkdownFile } from '../../shared/markdown-file';

const tsFiles$ = bindNodeCallback(glob);
const readFile$ = bindNodeCallback(fs.readFile);
const outputFile$ = bindNodeCallback(fs.outputFile);

const EXAMPLE_MODULE_FILE_NAME = 'example.module.ts';

const findAllFiles = source => {
  const tsFilesSearch = path.join(source, '*/*.ts');

  return tsFiles$(tsFilesSearch)
    // .pipe(showProcessingNotice('  Building Examples Module'))
    .pipe(mergeAll());
};


const readFileStream = pipe(
    mergeMap(filename => readFile$(filename, 'utf8'),
        (sourcePath: string, content: any) => ({ filename: sourcePath, content, rawData: null })
    )
);

const createSourceFile = pipe(
    map((file: MarkdownFile) => ts.createSourceFile(file.filename, file.content,
        ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
    )
);

const saveModuleFile = (file) => switchMap( ({moduleContent, metadata}) => {
  return outputFile$(file, moduleContent)
    // once the file is written return metadata to keep processing
    // as we want to use that data in the manifest file generation
    .pipe(mapTo(metadata));
});

const manifest = pipe(
  concatAll(),
  map((value: any) => {
    const {id, component, title} = value;
    return {
        id,
        component,
        title,
        types: ['ts', 'html', 'css'],
        url: `lib-viewer/examples/${id}-example-###TYPE###.html`
    };
  }),
  toArray()
);

export const generateModuleFile = ({ source, dest}) => {
  if (dest === null) {
    return of([{}]); // fulfill expected return values of this processor.
  }

  return findAllFiles(source)
    .pipe(
        readFileStream,
        // logFile,
        createSourceFile,
        parseExampleMetadata,
        generateExampleMetadata,
        toArray(),
        generateExampleNgModuleContent(source, dest),
        saveModuleFile(path.join(dest, EXAMPLE_MODULE_FILE_NAME)),
        manifest
    );
};
