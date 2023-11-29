import { getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { apply, chain, MergeStrategy, mergeWith, move, noop, Rule, SchematicsException, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addRootImport, readWorkspace, updateWorkspace } from '@schematics/angular/utility';
import { buildDefaultPath } from '@schematics/angular/utility/workspace';
import * as chalk from 'chalk';

import { isAngularApplicationProject } from '../utils/utils';
import { Schema } from './schema';

export default function (options: Schema): Rule {
    return (tree, context) => {
        context.addTask(new NodePackageInstallTask());
        return chain([
            options?.starter ? addStarterApp(options) : noop(),
            options?.type === 'b2b' ? addExpertModule(options) : noop(),
            options.noTheme ? noop() : addAposinTheme(options),
            addCdkStyles(options),
        ]);
    };
}

function addExpertModule(options: Schema): Rule {
    return addRootImport(options.project, ({ code, external }) => code`${external('NxExpertModule', '@aposin/ng-aquila/config')}`);
}

function addStarterApp(options: Schema): Rule {
    return async (tree, context) => {
        const workspace = await readWorkspace(tree);
        const project = getProjectFromWorkspace(workspace, options.project);
        const projectRoot = project.sourceRoot || '.';
        const projectAppPath = buildDefaultPath(project);

        if (!isAngularApplicationProject(project)) {
            throw new SchematicsException('Project is not an application or is using an unsupported builder');
        }

        const mainBuffer = tree.read(`${projectRoot}/main.ts`);
        if (!mainBuffer) {
            throw new SchematicsException('Incompatible project: cannot find main.ts');
        }
        if (!mainBuffer.toString().includes('AppModule')) {
            throw new SchematicsException('Incompatible project: main.ts does not bootstrapp AppModule');
        }

        const indexBuffer = tree.read(`${projectRoot}/index.html`);
        if (!indexBuffer) {
            throw new SchematicsException('Incompatible project: cannot find index.html');
        }
        if (!indexBuffer.toString().includes('<app-root')) {
            throw new SchematicsException('Incompatible project: index.html does not include <app-root> element');
        }

        const moduleBuffer = tree.read(`${projectAppPath}/app.module.ts`);
        if (!moduleBuffer) {
            throw new SchematicsException(`Incompatible project: ${projectAppPath}/app.module.ts does not exist`);
        }
        if (!moduleBuffer.toString().includes('AppComponent')) {
            throw new SchematicsException(`Incompatible project: ${projectAppPath}/app.module.ts does not import AppComponent`);
        }

        return chain([mergeWith(apply(url('./files'), [move(projectAppPath)]), MergeStrategy.Overwrite), rewriteCopyrightYear()]);
    };

    function rewriteCopyrightYear(): Rule {
        return async (tree, context) => {
            const currentYear = new Date().getFullYear();
            const copyrightTemplate = 'Copyright ALLIANZ';
            const copyrightStamp = `Copyright Allianz ${currentYear}`;

            const workspace = await readWorkspace(tree);
            const project = getProjectFromWorkspace(workspace, options.project);
            const projectAppPath = buildDefaultPath(project);

            [`${projectAppPath}/app.module.ts`, `${projectAppPath}/app.component.ts`, `${projectAppPath}/app.component.html`].forEach(file => {
                let fileContent = tree.read(file)!.toString('utf-8');
                fileContent = fileContent.replace(copyrightTemplate, copyrightStamp);
                tree.overwrite(file, fileContent);
            });
        };
    }
}

function addAposinTheme(options: Schema): Rule {
    const themeToAdd = options.type === 'b2b' ? 'expert.css' : 'aposin.css';

    return chain([
        addAposinStyles(options, `css/normalize.css`),
        addAposinStyles(options, `css/utilities.css`),
        addAposinStyles(options, `themes/${themeToAdd}`),
    ]);
}

function addAposinStyles(options: Schema, path: string): Rule {
    return updateWorkspace(workspace => {
        const project = getProjectFromWorkspace(workspace, options.project);
        const buildOptions = getProjectTargetOptions(project, 'build');
        let styles = buildOptions.styles as unknown[] | undefined;
        const imagePath = `node_modules/@aposin/ng-aquila/${path}`;

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
            console.warn(chalk.red(`Could not read the default style file within the project (${chalk.italic(styleFilePath)})`));
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
