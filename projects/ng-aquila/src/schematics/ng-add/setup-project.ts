import { chain, noop, Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions
} from '@angular/cdk/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as Chalk from 'chalk';
import { getWorkspace } from '@schematics/angular/utility/config';
import { Schema } from './schema';
import { parseJsonAst } from '@angular-devkit/core';
import { isJsonAstObject } from '../utils/utils';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    return chain([
      options && options.type && options.type === 'b2b' ? addExpertModule(options) : noop(),
      addAposinTheme(options),
      addCdkStyles(options),
      addCdkA11yStyles(options),
      addPonyfillToPolyfills(options),
      addAquilaScripts(options)
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

function addAquilaScripts(options: Schema) {
  return addScripts(options, 'what-input', 'node_modules/what-input/dist/what-input.js');
}

function addScripts(options: Schema, scriptName: string, scriptPath: string) {
  return (host: Tree) => {
    try {
      const angularJson = 'angular.json';
      if (!host.exists(angularJson)) {
        throw new Error(`Could not find ${angularJson}`);
      }
      const angularJsonFile = host.read(angularJson);
      if (!angularJsonFile) {
        throw new Error(`Failed to read ${angularJson} content`);
      }
      const jsonAst = parseJsonAst(angularJsonFile.toString());
      if (!isJsonAstObject(jsonAst)) {
        throw new Error(`Failed to parse JSON for ${angularJson}`);
      }
      const workspace = getWorkspace(host);
      const project = getProjectFromWorkspace(workspace, options.project);
      const buildOptions = getProjectTargetOptions(project, 'build');
      if (!buildOptions.scripts) {
        buildOptions.scripts = [scriptPath];
      } else {
        const existingScripts = buildOptions.scripts.map((s: any) => typeof s === 'string' ? s : s.input);
        for (const path of existingScripts.entries()) {
          // If the given asset is already specified in the scripts, we don't need to do anything.
          if (path === scriptPath) {
            return;
          }
        }
        buildOptions.scripts.push(scriptPath);
      }
      host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
    } catch (e) {
      console.warn(Chalk.default.red(`Failed to add the script "${scriptName}" to scripts array of "angular.json" file.`));
    }
    return host;
  };
}

function addStyles(options: Schema, path: string, importString: string) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(Chalk.default.red(`Could not find the default style file for this project.`));
      console.warn(Chalk.default.red(`Please import '${path}' file in your CSS.`));
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(Chalk.default.red(`Could not read the default style file within the project ` +
        `(${Chalk.default.italic(styleFilePath)})`));
      console.warn(Chalk.default.red(`Please import '${path}' file in your CSS.`));
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
