/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ProjectDefinition } from '@schematics/angular/utility';

const ALLOWED_BUILDERS = [
    '@angular-devkit/build-angular:browser',
    '@angular-builders/custom-webpack:browser',
    '@angular-devkit/build-angular:application',
    '@angular-devkit/build-angular:browser-esbuild',
];

export function isAngularApplicationProject(project: ProjectDefinition): boolean {
    if (project.extensions.projectType !== 'application') {
        return false;
    }

    const builder = project.targets?.get('build')?.builder.toString();
    if (builder && ALLOWED_BUILDERS.includes(builder)) {
        return true;
    }
    return false;
}
