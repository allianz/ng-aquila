#!/usr/bin/env node
import chalk = require('chalk');
import { Command } from '@commander-js/extra-typings';
import * as path from 'path';
import { concat } from 'rxjs';
import { auditTime, filter, switchMap, take, tap, toArray } from 'rxjs/operators';

import dgeni from './dgeni/dgeni';
import examples from './examples/examples';
import guides from './guides/guides';
import { processManifestData } from './manifest/run-manifest';
import overview from './overview/overview';
import { RxWatchData, rxWatcher } from './rx-watcher';
import { buildSearchIndex } from './shared/search-indexer';

const program = new Command();

const fs = require('fs');

const parsePath = value => path.resolve(value);

const pathCompiled = path.join(__dirname, './package.json');
let packageJson;

if (fs.existsSync(pathCompiled)) {
    packageJson = JSON.parse(fs.readFileSync(pathCompiled));
} else {
    // package is located one level higher during development
    packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));
}

program
    .version(packageJson.version)
    .command('generate <dir>')
    .description(
        `Process your sources files & examples to generate all necessary files to display them with lib-viewer.
    Your files need to be organized in the following way:

    your-library-folder
    |-- documentation/guides/*.md
    |-- documentation/examples/[exampleName]/*.[css|html|ts]
    |-- src/[componentName]/[componentName].md

    The CLI will generate all files here
    |-- documentation/generated
  `,
    )
    .option('-s, --source-files <path>', 'Location of your library source files.', parsePath)

    .option('-d, --documentation <path>', 'Folder with guides and examples. By default ./documentation', parsePath)
    .option('-e, --examples <path>', 'Examples Folder. By default ./documentation/examples', parsePath)
    .option('-g, --guides <path>', 'Guides Folder ./documentation/guides', parsePath)
    .option('-w, --watch', 'Watch the source folder')
    .option('-c, --config <path>', 'Path to config file', parsePath)
    .option('-o, --output <path>', 'Where to save all generated files. By default `./generated` in your documentaiton folder .', parsePath)
    .option('-pe, --private-examples <path>', 'An additional private examples folder.', null)

    .option(
        '-m, --with-module <path>',
        'Enable Example Module generation. Pass in path otherwise the file is generated in the example folder.',
        parsePath,
        'true',
    )
    .action((dir, cmd) => {
        const rootPath = dir; // required so we are safe to expect that value
        if (fs.existsSync(rootPath) === false) {
            console.error(chalk.red(`Given path '${rootPath}' doesn't exist!`));
            process.exit(1);
        }

        const sourceFiles = cmd.sourceFiles || path.join(rootPath, 'src');
        const documentationFiles = cmd.documentation || path.join(rootPath, 'documentation');

        let guideFiles;

        // if a config with guide paths is available
        if (cmd.config) {
            if (fs.existsSync(cmd.config) === false) {
                console.error(chalk.red(`Given path for a config file '${cmd.config}' doesn't exist!`));
                process.exit(1);
            }

            const rawdata = fs.readFileSync(cmd.config);
            const guideConfig = JSON.parse(rawdata);
            // TODO check if guides exists
            guideFiles = guideConfig.guides;

            // resolve relative guide file paths against the current directory
            guideFiles = guideFiles.map(filePath => path.resolve(path.dirname(cmd.config), filePath));
        } else {
            guideFiles = cmd.guides || path.join(documentationFiles, 'guides');
        }

        console.log(guideFiles);

        const exampleFiles = cmd.examples || path.join(documentationFiles, 'examples');
        const destination = cmd.output || path.join(documentationFiles, 'generated');
        let moduleFileLocation = null;

        if (cmd.withModule) {
            moduleFileLocation = typeof cmd.withModule === 'string' ? cmd.withModule : destination;
        }

        // include the parent folder when displaying the relative path.
        // this way we can repeat the folder name of the librayr which is the given source root
        const generateDisplayPath = pathValue => path.relative(path.resolve(rootPath, '../'), pathValue);

        // REMOVE, it is unused, or print it out? :)
        const processingMessage = [
            chalk.blue('Processing Files:'),
            chalk.blue(`Library Root: ${rootPath}`),
            // chalk.blue(`Guides: ${generateDisplayPath(guideFiles)}`),
            chalk.blue(`Source Files: ${generateDisplayPath(sourceFiles)}`),
            chalk.blue(`Example Files: ${generateDisplayPath(exampleFiles)}`),
            chalk.blue(`Destination: ${generateDisplayPath(destination)}`),
        ];

        if (moduleFileLocation) {
            processingMessage.push(chalk.blue(`Example Module: ${generateDisplayPath(moduleFileLocation)}`));
        } else {
            processingMessage.push(chalk.red(`Skipping Example Module`));
        }

        const { chokidarObservable, watcher } = rxWatcher(sourceFiles, {
            // ignore folders we are not interested, especially ignore the folder we put our generated files
            // or this will end in an endless loop.
            ignored: [/node_modules|\.git/, destination],
            persistent: true,
        });

        const watchObservable = chokidarObservable.pipe(
            filter((data: RxWatchData) => data.event !== 'add'),
            auditTime(500),
            cmd.watch ? tap(() => console.log(chalk.blue('\nFiles changed, update.'))) : take(1),
        );

        const manifest = path.join(destination, 'manifest.json');
        const guidesOutputFile = path.join(destination, 'guides.json');

        watchObservable
            .pipe(
                switchMap(_ =>
                    // Chokidar is not completing while watching
                    // So we need to switch to another observable
                    // as we will collect (toArray) and therefore wait for completion
                    // of the observable.
                    concat(
                        dgeni.run(sourceFiles, path.join(destination, 'api')),
                        overview.run(sourceFiles, path.join(destination, 'overview'), {
                            ignorePrivateExamples: !cmd.privateExamples,
                        }),
                        examples.run(exampleFiles, {
                            serviceOutputPath: destination,
                            outputExampleSources: path.join(destination, 'examples'),
                            additionalSourcePath: cmd.privateExamples,
                        }),
                        guides.run(guideFiles, path.join(destination, 'guides'), guidesOutputFile),
                    ).pipe(toArray(), processManifestData(manifest)),
                ),
            )
            .subscribe(
                () => {},
                () => {},
                () => {
                    console.log(chalk.green('Documentation Build completed'));
                    buildSearchIndex({ manifest, guides: guidesOutputFile });
                    watcher.close();
                },
            );
    });

program.command('api <dir>').action((dir, cmd) => {
    console.log('dir', dir);
    dgeni.run(dir, path.join('dist/api-docs', 'api')).toPromise();
});

program.command('test-building <dir>').action((dir, cmd) => {
    const rootPath = path.resolve(dir);

    if (fs.existsSync(rootPath) === false) {
        console.error(chalk.red(`Given path '${rootPath}' doesn't exist!`));
        process.exit(1);
    }

    console.log('test building');
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// man cli examples here: https://github.com/facebook/react-native/tree/master/local-cli
