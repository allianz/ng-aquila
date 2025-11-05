import {
  createMigrationSchematicRule,
  NullableDevkitMigration,
  TargetVersion,
  UpgradeData,
} from '@angular/cdk/schematics';
import { Rule, SchematicContext } from '@angular-devkit/schematics';

import { PackageImportMigration } from './custom-update-tool-migrations/package-import-migration';
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
  symbolRemoval,
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
  symbolRemoval,
  // material team introduced this for their design tokens/css variables
  // could be useful for us in the future as well but currently w e have no need
  cssTokens: {},
};

export const customMigrations: NullableDevkitMigration[] = [PackageImportMigration];

export default function (): Rule {
  return createMigrationSchematicRule(
    TargetVersion.V21,
    customMigrations,
    upgradeData,
    onMigrationComplete,
  );
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(
  context: SchematicContext,
  targetVersion: TargetVersion,
  hasFailures: boolean,
) {
  context.logger.info('');
  context.logger.info(`  ✓  Updated @allianz/ng-aquila to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the output above and fix these issues manually.',
    );
  }
}
