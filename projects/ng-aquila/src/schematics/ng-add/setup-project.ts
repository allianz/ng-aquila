import { chain, noop, Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions
} from '@angular/cdk/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as chalk from 'chalk';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    return chain([
      options && options.type && options.type === 'b2b' ? addExpertModule(options) : noop(),
      addAposinTheme(options),
      addCdkStyles(options),
      addCdkA11yStyles(options),
      addPonyfillToPolyfills(options)
    ]);
  };
}

function addExpertModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    addModuleImportToRootModule(host, 'NxExpertModule',
      '@aposin/ng-aquila/config', project);
    return host;
  };
}

function addAposinTheme(options: Schema) {
  return (host: Tree) => {
    if (options.noTheme) {
      return host;
    }

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const newFilePath = 'node_modules/@aposin/ng-aquila/css/normalize.css';

    const buildOptions = getProjectTargetOptions(project, 'build');
    if (!buildOptions.styles) {
      buildOptions.styles = [newFilePath];
    } else if (!buildOptions.styles.includes(newFilePath)) {
      buildOptions.styles.push(newFilePath);
    }

    const themeToAdd = options.type === 'b2b' ? 'expert.css' : 'aposin.css';
    buildOptions.styles.push(`node_modules/@aposin/ng-aquila/themes/${themeToAdd}`);

    host.overwrite('angular.json', JSON.stringify(workspace, null, 2));

    return host;
  };
}

function addCdkStyles(options: Schema) {
  return addStyles(options, 'overlay-prebuilt.css', '@import "@angular/cdk/overlay-prebuilt.css";');
}

function addCdkA11yStyles(options: Schema) {
  return addStyles(options, 'a11y-prebuilt.css', '@import "@angular/cdk/a11y-prebuilt.css";');
}

function addStyles(options: Schema, path: string, importString: string) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(chalk.red(`Could not find the default style file for this project.`));
      console.warn(chalk.red(`Please import '${path}' file in your CSS.`));
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(chalk.red(`Could not read the default style file within the project ` +
        `(${chalk.italic(styleFilePath)})`));
      console.warn(chalk.red(`Please import '${path}' file in your CSS.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = '\n' +
      `${importString}`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}

export function addPonyfillToPolyfills(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const buildOptions = getProjectTargetOptions(project, 'build');

    if (!buildOptions.polyfills) {
      throw new Error(`Could not find polyfills.ts in ${project.sourceRoot}`);
    }

    const polyfillsTs = buildOptions.polyfills;
    const polyfillsFile = host.read(polyfillsTs);

    if (!polyfillsFile) {
      throw new Error(`Failed to read ${polyfillsTs} content`);
    }

    const tsContent = polyfillsFile.toString();
    const insertion = '\n' + `import cssVars from 'css-vars-ponyfill';` + '\n' + 'cssVars({ watch: true, onlyLegacy: true, shadowDOM: true});' + '\n';

    if (tsContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(polyfillsTs);

    recorder.insertRight(tsContent.length, insertion);
    host.commitUpdate(recorder);
  };
}
