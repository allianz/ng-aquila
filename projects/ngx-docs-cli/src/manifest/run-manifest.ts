import * as fs from 'fs-extra';
import { bindNodeCallback, pipe } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import chalk = require('chalk');

const fileWriter$ = bindNodeCallback(fs.outputFile);

export const processManifestData = manifestFile =>
    pipe(
        tap(() => console.log(chalk.green('Generating Manifest'))),
        switchMap((value: any) => {
            // merge all objects so we have a singe object with multiple {key: values}
            const procssedValue = value.reduce((accu, current) => {
                if (current && Object.keys(current).length) {
                    return Object.assign(accu, current);
                }

                return accu;
            }, {});

            const content = JSON.stringify(procssedValue, null, 2);
            return fileWriter$(manifestFile, content);
        }),
    );
