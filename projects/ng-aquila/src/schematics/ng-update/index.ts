import { MiscTemplateMigration } from './migrations/misc-template';
import {Rule, SchematicContext} from '@angular-devkit/schematics';
import {
  createMigrationSchematicRule,
  NullableDevkitMigration,
  TargetVersion,
  UpgradeData
} from '@angular/cdk/schematics';
import {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
} from './data';

/** Upgrade data that will be used for the Angular Material ng-update schematic. */
export const upgradeData: UpgradeData = {
  attributeSelectors,
  classNames,
  constructorChecks,
  cssSelectors,
  elementSelectors,
  inputNames,
  methodCallChecks,
  outputNames,
  propertyNames,
};

const customMigrations = [
  MiscTemplateMigration
];

/** Entry point for the migration schematics with target of Angular CDK 12.0.0 */
export function updateToV11(): Rule {
  return createMigrationSchematicRule(TargetVersion.V11, customMigrations, upgradeData, onMigrationComplete);
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion,
                             hasFailures: boolean) {
  context.logger.info('');
  context.logger.info(`  ✓  Updated @aposin/ng-aquila to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
        '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
        'output above and fix these issues manually.');
  }
}
