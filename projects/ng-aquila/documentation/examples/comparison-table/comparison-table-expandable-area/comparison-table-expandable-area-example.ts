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

/** @title Expert: Use full row for Expandable area */
@Component({
  selector: 'comparison-table-expandable-area-example',
  templateUrl: './comparison-table-expandable-area-example.html',
  styleUrls: ['./comparison-table-expandable-area-example.css'],
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
export class ComparisonTableExpandableAreaExampleComponent {}
