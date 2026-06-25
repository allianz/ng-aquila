import {
  DEFAULT_BREAKPOINTS,
  NxComparisonTableBreakpoint,
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableIntersectionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
  NxToggleSectionDirective,
  NxToggleSectionHeaderComponent,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxBreakpoints } from '@allianz/ng-aquila/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Overflow example */
@Component({
  selector: 'comparison-table-overflow-example',
  templateUrl: './comparison-table-overflow-example.html',
  styleUrls: ['./comparison-table-overflow-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableRowGroupDirective,
    NxComparisonTableCell,
    NxComparisonTableDescriptionCell,
    NxComparisonTableIntersectionCell,
    NxComparisonTableSelectButton,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
    NxIconComponent,
    FormsModule,
  ],
})
export class ComparisonTableOverflowExampleComponent {
  // filter out the default desktop setting and replace it to only show tablet view
  comparisonTableBreakpoints: NxComparisonTableBreakpoint[] = [
    ...DEFAULT_BREAKPOINTS.filter(
      (breakpoint) => breakpoint.minWidth < NxBreakpoints.BREAKPOINT_LARGE,
    ),
    {
      minWidth: NxBreakpoints.BREAKPOINT_LARGE,
      viewType: 'tablet',
      columns: 3,
    },
  ];
}
