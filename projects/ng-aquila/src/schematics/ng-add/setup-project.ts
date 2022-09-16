import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { JsonArray } from '@angular-devkit/core';
import { apply, chain, MergeStrategy, mergeWith, move, noop, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { buildDefaultPath, getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import * as chalk from 'chalk';

import { isAngularApplicationProject } from '../utils/utils';
import { Schema } from './schema';

export default function (options: Schema): Rule {
    return async (host: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        return chain([
            options?.type === 'b2b' ? addExpertModule(options) : noop(),
            options?.starter ? addStarterApp(options) : noop(),
            addAposinTheme(options),
            addCdkStyles(options),
            addCdkA11yStyles(options),
        ]);
    };
}

function addExpertModule(options: Schema) {
    return async (host: Tree) => {
        const workspace = await getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);
        addModuleImportToRootModule(host, 'NxExpertModule', '@allianz/ng-aquila/config', project);
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

        return chain([mergeWith(apply(url('./files'), [move(projectAppPath)]), MergeStrategy.Overwrite), rewriteCopyrightYear()]);
    };

    function rewriteCopyrightYear() {
        return async (host: Tree, context: SchematicContext) => {
            const currentYear = new Date().getFullYear();
            const copyrightTemplate = 'Copyright ALLIANZ';
            const copyrightStamp = `Copyright ALLIANZ ${currentYear}`;

            const workspace = await getWorkspace(host);
            const project = getProjectFromWorkspace(workspace, options.project);
            const projectAppPath = buildDefaultPath(project);

            [`${projectAppPath}/app.module.ts`, `${projectAppPath}/app.component.ts`, `${projectAppPath}/app.component.html`].forEach(file => {
                let fileContent = host.read(file)!.toString('utf-8');
                fileContent = fileContent.replace(copyrightTemplate, copyrightStamp);
                host.overwrite(file, fileContent);
            });
        };
    }
}

function addAposinTheme(options: Schema) {
    return async (host: Tree) => {
        if (options.noTheme) {
            return;
        }

        const workspace = await getWorkspace(host);
        const project = getProjectFromWorkspace(workspace, options.project);
        const newFilePath = 'node_modules/@allianz/ng-aquila/css/normalize.css';

        const buildOptions = getProjectTargetOptions(project, 'build');
        let styles = buildOptions.styles as JsonArray;
        if (!styles) {
            styles = [newFilePath];
        } else if (!styles.includes(newFilePath)) {
            styles.push(newFilePath);
        }

        const themeToAdd = options.type === 'b2b' ? 'expert.css' : 'aposin.css';
        styles.push(`node_modules/@allianz/ng-aquila/themes/${themeToAdd}`);

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
            console.warn(chalk.red(`Could not read the default style file within the project (${chalk.italic(styleFilePath)})`));
            console.warn(chalk.red(`Please import '${path}' file in your CSS.`));
            return;
        }

        const htmlContent = buffer.toString();
        const insertion = `\n${importString}`;

        if (htmlContent.includes(insertion)) {
            return;
        }

        const recorder = host.beginUpdate(styleFilePath);

        recorder.insertLeft(htmlContent.length, insertion);
        host.commitUpdate(recorder);
    };
}
