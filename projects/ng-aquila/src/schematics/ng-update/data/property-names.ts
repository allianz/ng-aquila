import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
    [TargetVersion.V16]: [
        { pr: '', changes: [{ replace: 'ignoreItemTrunctation', replaceWith: 'ignoreItemTruncation', limitedTo: { classes: ['NxDropdownComponent'] } }] },
    ],
};
