import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Non-sticky Header example */
@Component({
  selector: 'comparison-table-example-non-sticky-header',
  templateUrl: './comparison-table-non-sticky-header-example.html',
  styleUrls: ['./comparison-table-non-sticky-header-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
  ],
})
export class ComparisonTableNonStickyHeaderExampleComponent {}
