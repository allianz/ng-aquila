import { TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import { SchematicContext } from '@angular-devkit/schematics';

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

const customMigrations: any[] = [];

// export function updateToV15(): Rule {
//     return createMigrationSchematicRule(TargetVersion.V15, customMigrations, upgradeData, onMigrationComplete);
// }

/** Migration schematic on-complete callback. */
function onMigrationComplete(context: SchematicContext, targetVersion: TargetVersion, hasFailure: boolean): void {
    context.logger.info('');
    context.logger.info(`  ✓  Updated @allianz/ng-aquila to ${targetVersion}`);
    context.logger.info('');

    if (hasFailure) {
        context.logger.warn('  ⚠  Some issues were detected but could not be fixed automatically.');
        context.logger.warn('  ⚠  Please check the output above and fix these issues manually.');
    }
}
