import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [{ replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-dropdown'] } }],
        },
    ],
};
