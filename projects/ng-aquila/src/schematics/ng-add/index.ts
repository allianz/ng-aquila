/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Rule } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { addPackageToPackageJson } from './package-config';
import { Schema } from './schema';
import { aquilaVersion } from './version-names';

export default function (options: Schema): Rule {
    return (tree, context) => {
        addPackageToPackageJson(tree, '@aposin/ng-aquila', `^${aquilaVersion}`);
        // the angular cli just adds `@aposin/ng-aquila` to the package.json but it is not installed
        // yet so we run the install first before we install the peer dependencies
        const installTaskId = context.addTask(new NodePackageInstallTask());
        context.addTask(new RunSchematicTask('ng-add-peer-dependencies', options), [installTaskId]);
    };
}
