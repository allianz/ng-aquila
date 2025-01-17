import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V19]: [
        {
            pr: '',
            changes: [{ replace: 'readonly', replaceWith: 'inputFieldReadonly', limitedTo: { elements: ['nx-number-stepper'] } }],
        },
    ],
};
