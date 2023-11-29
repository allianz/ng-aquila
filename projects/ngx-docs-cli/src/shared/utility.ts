import { readFile } from 'fs-extra';
import { from } from 'rxjs';

export const readFile$ = (path: string, encoding: BufferEncoding) => from(readFile(path, encoding));
