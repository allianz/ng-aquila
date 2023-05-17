import { PropertyNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const propertyNames: VersionChanges<PropertyNameUpgradeData> = {
    [TargetVersion.V16]: [
        { pr: '', changes: [{ replace: 'ignoreItemTrunctation', replaceWith: 'ignoreItemTruncation', limitedTo: { classes: ['NxDropdownComponent'] } }] },
        { pr: '', changes: [{ replace: 'nxPlayButtonAriaLabel', replaceWith: 'playButtonAriaLabel', limitedTo: { classes: ['NxVideoComponent'] } }] },
        { pr: '', changes: [{ replace: 'nxRowJustify', replaceWith: 'rowJustify', limitedTo: { classes: ['NxRowComponent'] } }] },
        { pr: '', changes: [{ replace: 'nxRowAlignContent', replaceWith: 'rowAlignContent', limitedTo: { classes: ['NxRowComponent'] } }] },
        { pr: '', changes: [{ replace: 'nxRowAlignItems', replaceWith: 'rowAlignItems', limitedTo: { classes: ['NxRowComponent'] } }] },
        { pr: '', changes: [{ replace: 'nxRowWrap', replaceWith: 'rowWrap', limitedTo: { classes: ['NxRowComponent'] } }] },
        { pr: '', changes: [{ replace: 'labelProp', replaceWith: 'labelProperty', limitedTo: { classes: ['NxTaglistComponent'] } }] },
        {
            pr: '',
            changes: [
                { replace: 'nxGoPrev', replaceWith: 'goPrev', limitedTo: { classes: ['NxPaginationComponent'] } },
                { replace: 'nxGoNext', replaceWith: 'goNext', limitedTo: { classes: ['NxPaginationComponent'] } },
                { replace: 'nxGoPage', replaceWith: 'goPage', limitedTo: { classes: ['NxPaginationComponent'] } },
            ],
        },
    ],
};
