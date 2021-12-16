import { tap } from 'rxjs/operators';
import chalk = require('chalk');
import { pipe } from 'rxjs';
import { basename } from 'path';
import { MarkdownFile } from './markdown-file';

export const showProcessingNotice = title => pipe(tap(() => console.log(chalk.green(title))));

export const logFile = tap((file: MarkdownFile) => {
    console.log(chalk.magenta('-- ' + basename(file.filename)));
});
