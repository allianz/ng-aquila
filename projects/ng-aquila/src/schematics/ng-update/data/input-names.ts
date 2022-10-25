import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V11]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'label',
                    replaceWith: 'labelCollapsed',
                    limitedTo: { attributes: ['nxComparisonTableRowGroup'] },
                },
            ],
        },
    ],
};
