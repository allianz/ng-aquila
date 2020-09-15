import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as hljs from 'highlight.js';
import * as path from 'path';
import { bindNodeCallback, pipe } from 'rxjs';
import { map, mergeAll, mergeMap, switchMap } from 'rxjs/operators';

const exampleCodeFiles$ = bindNodeCallback(glob);
const readFile$ = bindNodeCallback(fs.readFile);
const outputFile$ = bindNodeCallback(fs.outputFile);

const extensionMap = {
    'css': 'css',
    'ts': 'typescript',
    'html': 'html'
};
interface File {
    filePath: string;
    content: string;
}

const findAllFiles = source => exampleCodeFiles$(path.join(source, '/*/*.+(html|css|ts)'))
    .pipe(mergeAll());

const readFileStream = pipe(
    mergeMap(filename => readFile$(filename, 'utf8'),
        (filePath: string, content: any) => ({ filePath, content })
    )
);

const highlightFile = pipe(
    map((file: File) => {
        const extension = extensionMap[path.extname(file.filePath).slice(1)];
        file.content = hljs.highlight(extension, file.content).value;
        return file;
    })
);

const saveFile = (outputFolder) => pipe(
    switchMap((file: File) => {
        const extension = path.extname(file.filePath);
        const base = path.basename(file.filePath, extension);
        const newFileTitle = `${base}-${extension.slice(1)}`;
        const targetFile = path.join(outputFolder, newFileTitle + '.html');
        return outputFile$(targetFile, file.content);
    })
);

export const highlightSourceFiles = ({source, dest}) => {
  return findAllFiles(source)
  .pipe(
      readFileStream,
      highlightFile,
      saveFile(dest)
  );
};
