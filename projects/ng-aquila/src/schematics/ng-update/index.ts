import { createMigrationSchematicRule, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import { Rule, SchematicContext } from '@angular-devkit/schematics';

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
};

export default function (): Rule {
    return createMigrationSchematicRule(TargetVersion.V17, [], upgradeData, onMigrationComplete);
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailures: boolean) {
    context.logger.info('');
    context.logger.info(`  ✓  Updated @aposin/ng-aquila to ${targetVersion}`);
    context.logger.info('');

    if (hasFailures) {
        context.logger.warn(
            '  ⚠  Some issues were detected but could not be fixed automatically. Please check the output above and fix these issues manually.',
        );
    }
}
