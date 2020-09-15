import { RunSchematicTask, NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';
import { Tree, Rule, SchematicContext } from '@angular-devkit/schematics';
import { installAllPeerDependencies } from './version-names';

// this should run after the initial ng-add schematic so that the
// ng-aquila package is already installed
export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // most important here is the installation of the CDK
    // the ng-add-setup-project is importing from the CDK so we need to install it
    // first
    installAllPeerDependencies(host);

    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
