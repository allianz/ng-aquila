import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { bindNodeCallback, pipe } from 'rxjs';
import { concatAll, map, mergeMap, take, filter } from 'rxjs/operators';

import { manifest } from './manifest';
import { transform } from './transform';
import { MarkdownFile } from '../shared/markdown-file';
import { showProcessingNotice } from '../shared/logging';

// prepare callback functions to use in rxjs
const mdFiles$ = bindNodeCallback(glob);
const readFile$ = bindNodeCallback(fs.readFile);
const outputFile$ = bindNodeCallback(fs.outputFile);

// This is our stream of relevant files we want to transform.
const findAllFiles = sourceFolder => {
    const mdSearchGlob = path.join(sourceFolder, '**/!(README).md');

    return mdFiles$(mdSearchGlob);
};

const readFileStream = pipe(
    mergeMap(
        filename => readFile$(filename, 'utf8'),
        // return not only the new content, keep the filename
        (filename: string, content: any) => {
            return <MarkdownFile>{ filename, content, rawData: content, yaml: {} };
        },
    ),
);

const save = folder =>
    pipe(
        mergeMap((file: MarkdownFile) => {
            const title = path.basename(file.filename, path.extname(file.filename));
            const targetFile = path.join(folder, title + '.html');
            return outputFile$(targetFile, file.content).pipe(map(() => file)); // return file, not output result
        }),
    );

export const build = ({ source, dest, ignorePrivateExamples }) => {
    return findAllFiles(source).pipe(
        showProcessingNotice('Processing Overview'),
        take(1),
        concatAll(),
        filter((file: string) => {
            // we are only interested in markdown files with the same name as the folder (by convention)
            return path.basename(file, '.md') === path.basename(path.dirname(file));
        }),
        readFileStream,
        transform(ignorePrivateExamples),
        save(dest),
        manifest({ key: 'components' }),
    );
};
