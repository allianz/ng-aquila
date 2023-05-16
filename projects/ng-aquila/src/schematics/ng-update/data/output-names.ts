import { OutputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const outputNames: VersionChanges<OutputNameUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [{ replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-dropdown'] } }],
        },
        {
            pr: '',
            changes: [{ replace: 'nxRowClick', replaceWith: 'rowClick', limitedTo: { elements: ['nx-dynamic-table'] } }],
        },
        {
            pr: '',
            changes: [
                {
                    replace: 'nxValueChange',
                    replaceWith: 'valueChange',
                    limitedTo: {
                        elements: ['nx-rating', 'nx-slider'],
                    },
                },
                { replace: 'nxValueChange', replaceWith: 'valueChange', limitedTo: { elements: ['nx-dropdown'] } },
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
