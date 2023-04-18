import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import { bindNodeCallback, combineLatest, of, pipe } from 'rxjs';
import { concatAll, map, mergeMap, take } from 'rxjs/operators';

import { showProcessingNotice } from '../shared/logging';
import { MarkdownFile } from '../shared/markdown-file';
import { readMarkdownFileStream } from '../shared/read-markdown-file';
import { manifest } from './manifest';
import { transform } from './transform';

import chalk = require('chalk');

const mdFiles$ = bindNodeCallback(glob);
const outputFile$ = bindNodeCallback(fs.outputFile);

const getChangelogFile = () => of([path.join(process.cwd(), 'CHANGELOG.md')]);

const findAllFiles = filePaths => {
    // when a file array comes from a config.json
    if (Array.isArray(filePaths)) {
        // if a file does not exist throw an errror
        filePaths.forEach(filePath => {
            if (!fs.existsSync(filePath)) {
                console.error(chalk.red(`Given path '${filePath}' for a guide file doesn't exist!`));
                process.exit(1);
            }
        });
        return of(filePaths);
    }
    // glob with path to the md folder (default)
    const mdSearchGlob = path.join(filePaths, '**/*.md');
    return mdFiles$(mdSearchGlob).pipe(take(1));
};

const save = folder =>
    pipe(
        mergeMap((file: MarkdownFile) => {
            const title = path.basename(file.filename, path.extname(file.filename));
            const targetFile = path.join(folder, title + '.html');
            return outputFile$(targetFile, file.content).pipe(map(() => file)); // return file, not output result
        }),
    );

const guides = [];
const saveForSearch = (file: MarkdownFile, searchDest: string) => {
    if (file.yaml) {
        const guide = {
            id: path.basename(file.filename).replace('.md', ''),
            yaml: file.yaml,
            content: file.content,
        };
        guides.push(guide);
        fs.writeFileSync(searchDest, JSON.stringify(guides));
    }
    return file;
};

export const build = ({ source, dest, searchDest }) =>
    combineLatest([findAllFiles(source), getChangelogFile()]).pipe(
        showProcessingNotice('Processing Guides'),
        map((arrays: any[]) => arrays.flat()),
        concatAll(),
        readMarkdownFileStream,
        transform,
        map(file => saveForSearch(file, searchDest)),
        save(dest),
        manifest({ key: 'guides' }),
    );
