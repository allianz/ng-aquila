import {
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions,
} from '@angular/cdk/schematics';
import { chain, noop, Rule } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addRootImport, readWorkspace, updateWorkspace } from '@schematics/angular/utility';
import chalk from 'chalk';

import { Schema } from './schema';

export default function (options: Schema): Rule {
  return (tree, context) => {
    context.addTask(new NodePackageInstallTask());
    return chain([
      options?.type === 'b2b' ? addExpertModule(options) : noop(),
      options.noTheme ? noop() : addAquilaTheme(options),
      addCdkStyles(options),
    ]);
  };
}

function addExpertModule(options: Schema): Rule {
  return addRootImport(
    options.project,
    ({ code, external }) => code`${external('NxExpertModule', '@allianz/ng-aquila/config')}`,
  );
}

function addAquilaTheme(options: Schema): Rule {
  const themeToAdd = options.type === 'b2b' ? 'expert.css' : 'aquila.css';

  return chain([
    addAquilaStyles(options, `css/normalize.css`),
    addAquilaStyles(options, `css/utilities.css`),
    addAquilaStyles(options, `themes/${themeToAdd}`),
  ]);
}

function addAquilaStyles(options: Schema, path: string): Rule {
  return updateWorkspace((workspace) => {
    const project = getProjectFromWorkspace(workspace, options.project);
    const buildOptions = getProjectTargetOptions(project, 'build');
    let styles = buildOptions.styles as unknown[] | undefined;
    const imagePath = `node_modules/@allianz/ng-aquila/${path}`;

    if (!styles) {
      styles = [imagePath];
    } else if (!styles.includes(imagePath)) {
      styles.push(imagePath);
    }
  });
}

function addCdkStyles(options: Schema): Rule {
  return chain([
    addStyles(options, 'overlay-prebuilt.css', '@import "@angular/cdk/overlay-prebuilt.css";'),
    addStyles(options, 'a11y-prebuilt.css', '@import "@angular/cdk/a11y-prebuilt.css";'),
  ]);
}

function addStyles(options: Schema, path: string, importString: string): Rule {
  return async (tree, context) => {
    const workspace = await readWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(chalk.red(`Could not find the default style file for this project.`));
      console.warn(chalk.red(`Please import '${path}' file in your CSS.`));
      return;
    }

    const buffer = tree.read(styleFilePath);

    if (!buffer) {
      console.warn(
        chalk.red(
          `Could not read the default style file within the project (${chalk.italic(styleFilePath)})`,
        ),
      );
      console.warn(chalk.red(`Please import '${path}' file in your CSS.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = `\n${importString}`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = tree.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    tree.commitUpdate(recorder);
  };
}
