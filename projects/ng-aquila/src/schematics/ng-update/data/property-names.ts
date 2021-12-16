import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
    [TargetVersion.V11]: [
        {
            pr: 'https://github.com/angular/components/pull/20449',
            changes: [
                {
                    replace: 'getPopupConnectionElementRef',
                    replaceWith: 'getConnectedOverlayOrigin',
                    limitedTo: { classes: ['NxDatefieldDirective'] },
                },
            ],
        },
    ],
};
