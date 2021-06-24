import { chain, noop, Rule, Tree, SchematicContext, apply, mergeWith, url, MergeStrategy, SchematicsException, move, applyTemplates } from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions
} from '@angular/cdk/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as chalk from 'chalk';
import { buildDefaultPath, getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { Schema } from './schema';
import { JsonArray, template } from '@angular-devkit/core';
import { isAngularApplicationProject } from '../utils/utils';

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    return chain([
      options && options.type && options.type === 'b2b' ? addExpertModule(options) : noop(),
      options && options.starter ? addStarterApp(options) : noop(),
      addAposinTheme(options),
      addCdkStyles(options),
      addCdkA11yStyles(options),
      addPonyfillToPolyfills(options)
    ]);
  };
}

function addExpertModule(options: Schema) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    addModuleImportToRootModule(host, 'NxExpertModule',
      '@aposin/ng-aquila/config', project);
  };
}

function addStarterApp(options: Schema) {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const projectRoot = project.sourceRoot || '.';
    const projectAppPath = buildDefaultPath(project);

    if (!isAngularApplicationProject(project)) {
      throw new SchematicsException('Project is not an application or is using an unsupported builder');
    }

    const mainBuffer = host.read(`${projectRoot}/main.ts`);
    if (!mainBuffer) {
      throw new SchematicsException('Incompatible Starter project: cannot find main.ts');
    }
    if (!mainBuffer.toString().includes('AppModule')) {
      throw new SchematicsException('Incompatible Starter project: main.ts is not bootstrapping AppModule');
    }

    const indexBuffer = host.read(`${projectRoot}/index.html`);
    if (!indexBuffer) {
      throw new SchematicsException('Incompatible Starter project: cannot find index.html');
    }
    if (!indexBuffer.toString().includes('<app-root')) {
      throw new SchematicsException('Incompatible Starter project: index.html does not include <app-root> element');
    }

    const moduleBuffer = host.read(`${projectAppPath}/app.module.ts`);
    if (!moduleBuffer) {
      throw new SchematicsException(`Incompatible Starter project: ${projectAppPath}/app.module.ts does not exist`);
    }
    if (!moduleBuffer.toString().includes('AppComponent')) {
      throw new SchematicsException(`Incompatible Starter project: ${projectAppPath}/app.module.ts does not import AppComponent`);
    }

    return mergeWith(
      apply(url('./files'), [
        move(projectAppPath)
      ]),
      MergeStrategy.Overwrite
    );
  };
}

function addAposinTheme(options: Schema) {
  return async (host: Tree) => {
    if (options.noTheme) {
      return;
    }

    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const newFilePath = 'node_modules/@aposin/ng-aquila/css/normalize.css';

    const buildOptions = getProjectTargetOptions(project, 'build');
    let styles = buildOptions.styles as JsonArray;
    if (!styles) {
      styles = [newFilePath];
    } else if (!styles.includes(newFilePath)) {
      styles.push(newFilePath);
    }

    const themeToAdd = options.type === 'b2b' ? 'expert.css' : 'aposin.css';
    styles.push(`node_modules/@aposin/ng-aquila/themes/${themeToAdd}`);

    return updateWorkspace(workspace);
  };
}

function addCdkStyles(options: Schema) {
  return addStyles(options, 'overlay-prebuilt.css', '@import "@angular/cdk/overlay-prebuilt.css";');
}

function addCdkA11yStyles(options: Schema) {
  return addStyles(options, 'a11y-prebuilt.css', '@import "@angular/cdk/a11y-prebuilt.css";');
}

function addStyles(options: Schema, path: string, importString: string) {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
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
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const buildOptions = getProjectTargetOptions(project, 'build');

    if (!buildOptions.polyfills) {
      throw new Error(`Could not find polyfills.ts in ${project.sourceRoot}`);
    }

    const polyfillsTs = buildOptions.polyfills as string;
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
