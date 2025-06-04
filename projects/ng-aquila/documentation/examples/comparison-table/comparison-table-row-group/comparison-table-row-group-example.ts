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

/** @title Row group example */
@Component({
    selector: 'comparison-table-row-group-example',
    templateUrl: './comparison-table-row-group-example.html',
    styleUrls: ['./comparison-table-row-group-example.css'],
    imports: [
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableRowGroupDirective,
        NxComparisonTableDescriptionCell,
        NxIconComponent,
    ],
})
export class ComparisonTableRowGroupExampleComponent {}
