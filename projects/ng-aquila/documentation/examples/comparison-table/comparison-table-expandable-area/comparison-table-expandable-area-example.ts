import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableFeature,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/** @title Expert: Use full row for Expandable area */
@Component({
  selector: 'comparison-table-expandable-area-example',
  templateUrl: './comparison-table-expandable-area-example.html',
  styleUrls: ['./comparison-table-expandable-area-example.css'],
  imports: [
    NxPriceComponent,
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableFeature,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableRowGroupDirective,
    NxComparisonTableDescriptionCell,
    NxHeadlineComponent,
  ],
})
export class ComparisonTableExpandableAreaExampleComponent {}
