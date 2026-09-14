import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTableIntersectionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
  NxToggleSectionDirective,
  NxToggleSectionHeaderComponent,
} from '@allianz/ng-aquila/comparison-table';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Structuring rows example */
@Component({
  selector: 'comparison-table-rows-example',
  templateUrl: './comparison-table-rows-example.html',
  styleUrls: ['./comparison-table-rows-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxComparisonTableIntersectionCell,
    NxComparisonTableRowGroupDirective,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
    NxHeadlineComponent,
    NxPriceComponent,
    NxIconComponent,
    NxListComponent,
    NxListIconComponent,
  ],
})
export class ComparisonTableRowsExampleComponent {}
