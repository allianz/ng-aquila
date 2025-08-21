import chalk from 'chalk';
import { basename } from 'path';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MarkdownFile } from './markdown-file';

export const showProcessingNotice = (title) => pipe(tap(() => console.log(chalk.green(title))));

export const logFile = tap((file: MarkdownFile) => {
  console.log(chalk.magenta('-- ' + basename(file.filename)));
});
