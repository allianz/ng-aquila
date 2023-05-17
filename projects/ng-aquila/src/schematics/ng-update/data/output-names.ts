import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'nxClose',
                    replaceWith: 'onModalClose',
                    limitedTo: {
                        elements: ['nx-modal'],
                    },
                },
                { replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxRowClick', replaceWith: 'rowClick', limitedTo: { elements: ['nx-dynamic-table'] } },
                {
                    replace: 'nxValueChange',
                    replaceWith: 'valueChange',
                    limitedTo: {
                        elements: ['nx-rating', 'nx-slider'],
                    },
                },
                { replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxButtonClick', replaceWith: 'buttonClick', limitedTo: { elements: ['nx-page-search'] } },
                { replace: 'nxGoPrev', replaceWith: 'goPrev', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxGoNext', replaceWith: 'goNext', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxGoPage', replaceWith: 'goPage', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxGroupValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-radio-group'] } },
                { replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-radio'] } },
            ],
        },
        {
            pr: '',
            changes: [
                {
                    replace: 'nxTagsChange',
                    replaceWith: 'tagsChange',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: 'nxTagClick',
                    replaceWith: 'onTagClick',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
            ],
        },
    ],
};
