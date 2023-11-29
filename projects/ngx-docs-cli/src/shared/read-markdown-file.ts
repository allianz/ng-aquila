import { pipe } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { MarkdownFile } from './markdown-file';
import { readFile$ } from './utility';

export const readMarkdownFileStream = pipe(
    mergeMap((filename: string) =>
        readFile$(filename, 'utf8').pipe(map((content: any) => ({ filename, content, rawData: content, yaml: {} }) as MarkdownFile)),
    ),
);
