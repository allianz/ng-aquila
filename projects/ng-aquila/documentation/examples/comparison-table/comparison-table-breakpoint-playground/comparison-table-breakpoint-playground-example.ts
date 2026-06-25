import {
  NxComparisonTableBreakpoint,
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableIntersectionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
  NxComparisonTableViewType,
  NxToggleSectionDirective,
  NxToggleSectionHeaderComponent,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

/** @title Breakpoint playground example */
@Component({
  selector: 'comparison-table-breakpoint-playground-example',
  templateUrl: './comparison-table-breakpoint-playground-example.html',
  styleUrls: ['./comparison-table-breakpoint-playground-example.css'],
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
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class ComparisonTableBreakpointPlaygroundExampleComponent {
  readonly columns = signal(3);
  readonly viewType = signal<NxComparisonTableViewType>('tablet');

  readonly columnsOptions = [1, 2, 3, 4, 5];
  readonly viewTypeOptions: NxComparisonTableViewType[] = ['tablet', 'desktop'];

  // A single breakpoint at minWidth: 0 always wins regardless of the container
  // width, so the table layout is driven purely by the dropdowns below instead
  // of the container size. This isolates the columns and viewType settings so
  // you can see exactly how each one affects the layout.
  readonly comparisonTableBreakpoints = computed<NxComparisonTableBreakpoint[]>(
    () => [{ minWidth: 0, viewType: this.viewType(), columns: this.columns() }],
  );
}
