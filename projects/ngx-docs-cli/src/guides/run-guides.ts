import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { bindNodeCallback, pipe, of } from 'rxjs';
import { concatAll, map, mergeMap, take } from 'rxjs/operators';

import { readMarkdownFileStream } from '../shared/read-markdown-file';
import { manifest } from './manifest';
import { transform } from './transform';
import { MarkdownFile } from '../shared/markdown-file';
import { showProcessingNotice } from '../shared/logging';
import chalk = require('chalk');

const mdFiles$ = bindNodeCallback(glob);
const outputFile$ = bindNodeCallback(fs.outputFile);

const findAllFiles = filePaths => {
    // when a file array comes from a config.json
    if (Array.isArray(filePaths)) {
        // if a file does not exist throw an errror
        filePaths.forEach(filePath => {
            if (fs.existsSync(filePath) === false) {
                console.error(chalk.red(`Given path '${filePath}' for a guide file doesn't exist!`));
                process.exit(1);
            }
        });
        return of(filePaths);
    } else {
        // glob with path to the md folder (default)
        const mdSearchGlob = path.join(filePaths, '**/*.md');
        return mdFiles$(mdSearchGlob).pipe(take(1));
    }
};

const save = folder =>
    pipe(
        mergeMap((file: MarkdownFile) => {
            const title = path.basename(file.filename, path.extname(file.filename));
            const targetFile = path.join(folder, title + '.html');
            return outputFile$(targetFile, file.content).pipe(map(() => file)); // return file, not output result
        }),
    );

export const build = ({ source, dest }) => {
    return findAllFiles(source).pipe(
        showProcessingNotice('Processing Guides'),
        concatAll(),
        readMarkdownFileStream,
        transform,
        save(dest),
        manifest({ key: 'guides' }),
    );
};
