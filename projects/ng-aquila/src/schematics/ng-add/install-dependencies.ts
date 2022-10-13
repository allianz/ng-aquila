import { Rule } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Schema } from './schema';
import { installAllPeerDependencies } from './version-names';

// this should run after the initial ng-add schematic so that the
// ng-aquila package is already installed
export default function (options: Schema): Rule {
    return (tree, context) => {
        // most important here is the installation of the CDK
        // the ng-add-setup-project is importing from the CDK so we need to install it
        // first
        installAllPeerDependencies(tree);

        const installTaskId = context.addTask(new NodePackageInstallTask());
        context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
