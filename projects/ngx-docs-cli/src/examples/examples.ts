
import { highlightSourceFiles } from './example-sources/examples-sources';
import { generateModuleFile } from './example-module/examples-module';
import { of } from 'rxjs';
import { tap, concat, last, map, catchError } from 'rxjs/operators';
import chalk from 'chalk';


function run(source, {moduleFile, outputExampleSources}) {
  return of('Processing Examples')
    .pipe(tap(value => console.log(chalk.green(value) )),
    concat(
      highlightSourceFiles({source, dest: outputExampleSources}),
      generateModuleFile({source, dest: moduleFile})
    ),
    last(),
    tap((value: any) => {
      value.map(item => {
        console.log(chalk.magenta(`-- ${item.id}`));
      });
    }),
    map(value => ({examples: value})),
    catchError(error => {
      console.error(chalk.magentaBright('Error while process example sources'));
      console.error(chalk.magentaBright(error));
      return null;
    })
  );
}

export default {
  run
};
