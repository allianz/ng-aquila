import { Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableRowDirective,
    NxComparisonTableRowType,
    NxComparisonTableSelectButton,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
} from '@aposin/ng-aquila/comparison-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

interface ContentCell {
    type: NxComparisonTableRowType;
    description?: string;
    cells: string[];
}
interface ToggleSection {
    type: 'toggleSection';
    header: string;
    content: ContentCell[];
}
type TableData = (ContentCell | ToggleSection)[];

/** @title Dynamically filled table */
@Component({
    selector: 'comparison-table-dynamic-example',
    templateUrl: './comparison-table-dynamic-example.html',
    styleUrls: ['./comparison-table-dynamic-example.css'],
    imports: [
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
        NxPlainButtonComponent,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
        NxToggleSectionDirective,
        NxToggleSectionHeaderComponent,
    ],
})
export class ComparisonTableDynamicExampleComponent {
    data: TableData = [
        {
            type: 'header',
            cells: ['This is a header cell', 'This is a header cell'],
        },
        {
            type: 'content',
            description: 'This is a description cell',
            cells: ['This is a cell', 'This is a cell'],
        },
        {
            type: 'toggleSection',
            header: 'Toggle Section',
            content: [
                {
                    type: 'content',
                    description: 'This is a description cell',
                    cells: ['This is a cell', 'This is a cell'],
                },
                {
                    type: 'content',
                    description: 'This is a description cell',
                    cells: ['This is a cell', 'This is a cell'],
                },
            ],
        },
        {
            type: 'footer',
            cells: ['This is a footer cell', 'This is a footer cell'],
        },
    ];
}
