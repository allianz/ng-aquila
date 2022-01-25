import * as fs from 'fs-extra';
import { bindNodeCallback, pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MarkdownFile } from './markdown-file';

const readFile$ = bindNodeCallback(fs.readFile);

export const readMarkdownFileStream = pipe(
    mergeMap(
        filename => readFile$(filename, 'utf8'),
        // return not only the new content, keep the filename
        (filename: string, content: any) => {
            return { filename, content, rawData: content, yaml: {} } as MarkdownFile;
        },
    ),
);
