import { Component } from '@angular/core';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableRowDirective,
    NxComparisonTableSelectButton,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
} from '@aposin/ng-aquila/comparison-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/** @title Toggle section example */
@Component({
    selector: 'comparison-table-with-toggle-sections-example',
    templateUrl: './comparison-table-with-toggle-sections-example.html',
    styleUrls: ['./comparison-table-with-toggle-sections-example.css'],
    imports: [
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
        NxIconComponent,
        NxToggleSectionDirective,
        NxToggleSectionHeaderComponent,
    ],
})
export class ComparisonTableWithToggleSectionsExampleComponent {}
