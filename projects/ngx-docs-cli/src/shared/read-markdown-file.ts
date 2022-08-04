import * as fs from 'fs-extra';
import { bindNodeCallback, pipe } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { MarkdownFile } from './markdown-file';

const readFile$ = bindNodeCallback(fs.readFile);

export const readMarkdownFileStream = pipe(
    mergeMap(filename => readFile$(filename, 'utf8').pipe(map((content: any) => ({ filename, content, rawData: content, yaml: {} } as MarkdownFile)))),
);
