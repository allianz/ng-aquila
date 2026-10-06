import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Freeform header content example */
@Component({
  selector: 'comparison-table-header-legacy-example',
  templateUrl: './comparison-table-header-legacy-example.html',
  styleUrls: ['./comparison-table-header-legacy-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
  ],
})
export class ComparisonTableHeaderLegacyExampleComponent {}
