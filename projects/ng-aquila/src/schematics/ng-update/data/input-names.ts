import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [
                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxReadonly', replaceWith: 'readonly', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxIsMultiselect', replaceWith: 'isMultiSelect', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxRequired', replaceWith: 'required', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxIgnoreItemTrunctation', replaceWith: 'ignoreItemTruncation', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxShowFilter', replaceWith: 'showFilter', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxFilterPlaceholder', replaceWith: 'filterPlaceholder', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxOverlayLabel', replaceWith: 'overlayLabel', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxValueFormatter', replaceWith: 'valueFormatter', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxLabel', replaceWith: 'label', limitedTo: { elements: ['nx-dropdown-group'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-dropdown-item'] } },
            ],
        },
        {
            pr: '',
            changes: [
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-expansion-panel'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-accordion'] } },
                { replace: 'nxValueFormatter', replaceWith: 'valueFormatter', limitedTo: { elements: ['nx-autocomplete'] } },
                { replace: 'nxConvertTo', replaceWith: 'convertTo', limitedTo: { elements: ['nx-code-input'] } },
                { replace: 'nxData', replaceWith: 'data', limitedTo: { elements: ['nx-dynamic-table'] } },
                { replace: 'nxDisplayedColumns', replaceWith: 'displayedColumns', limitedTo: { elements: ['nx-dynamic-table'] } },
                { replace: 'nxColOffset', replaceWith: 'colOffset', limitedTo: { attributes: ['nxCol'] } },
                { replace: 'nxAlignSelf', replaceWith: 'alignSelf', limitedTo: { attributes: ['nxCol'] } },
                { replace: 'nxColOrder', replaceWith: 'colOrder', limitedTo: { attributes: ['nxCol'] } },

                { replace: 'nxRowJustify', replaceWith: 'rowJustify', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowAlignContent', replaceWith: 'rowAlignContent', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowAlignItems', replaceWith: 'rowAlignItems', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowWrap', replaceWith: 'rowWrap', limitedTo: { attributes: ['nxRow'] } },
            ],
        },
    ],
};
