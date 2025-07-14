import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

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
