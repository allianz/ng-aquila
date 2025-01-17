import { Component } from '@angular/core';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableRowDirective,
    NxComparisonTableRowGroupDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/** @title Expert: Use full row for Expandable area */
@Component({
    selector: 'comparison-table-expandable-area-example',
    templateUrl: './comparison-table-expandable-area-example.html',
    styleUrls: ['./comparison-table-expandable-area-example.css'],
    imports: [
        NxSwipebarComponent,
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableRowGroupDirective,
        NxComparisonTableDescriptionCell,
        NxIconComponent,
    ],
})
export class ComparisonTableExpandableAreaExampleComponent {}
