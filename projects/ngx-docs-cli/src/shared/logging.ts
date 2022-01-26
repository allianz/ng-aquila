import { basename } from 'path';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MarkdownFile } from './markdown-file';
import chalk = require('chalk');

export const showProcessingNotice = title => pipe(tap(() => console.log(chalk.green(title))));

export const logFile = tap((file: MarkdownFile) => {
    console.log(chalk.magenta('-- ' + basename(file.filename)));
});
