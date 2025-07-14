import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxDatefieldModule } from '@allianz/ng-aquila/datefield';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';
import { NxPaginationModule } from '@allianz/ng-aquila/pagination';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { NxSwitcherModule } from '@allianz/ng-aquila/switcher';
import { NxTableModule } from '@allianz/ng-aquila/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamplesSharedModule } from '../examples-shared.module';
import { TableExampleComponent } from './table/table-example';
import { TableColumnHidingExampleComponent } from './table-column-hiding/table-column-hiding-example';
import { TableColumnReorderExampleComponent } from './table-column-reorder/table-column-reorder-example';
import { TableColumnResizeExampleComponent } from './table-column-resize/table-column-resize-example';
import { TableCondensedExampleComponent } from './table-condensed/table-condensed-example';
import { TableExpandableExampleComponent } from './table-expandable/table-expandable-example';
import { TableFilterSortPaginateExampleComponent } from './table-filter-sort-paginate/table-filter-sort-paginate-example';
import { TableFormElementsExampleComponent } from './table-form-elements/table-form-elements-example';
import { TableSelectingExampleComponent } from './table-selecting/table-selecting-example';
import { TableSingleSelectExampleComponent } from './table-single-select/table-single-select-example';
import { TableSortingExampleComponent } from './table-sorting/table-sorting-example';
import { TableStickyColumnExampleComponent } from './table-sticky-column/table-sticky-column-example';
import { TableStickyHeaderExampleComponent } from './table-sticky-header/table-sticky-header-example';
import { TableZebraExampleComponent } from './table-zebra/table-zebra-example';

const EXAMPLES = [
  TableColumnResizeExampleComponent,
  TableColumnReorderExampleComponent,
  TableExampleComponent,
  TableCondensedExampleComponent,
  TableExpandableExampleComponent,
  TableFilterSortPaginateExampleComponent,
  TableSelectingExampleComponent,
  TableSingleSelectExampleComponent,
  TableSortingExampleComponent,
  TableZebraExampleComponent,
  TableFormElementsExampleComponent,
  TableStickyColumnExampleComponent,
  TableStickyHeaderExampleComponent,
  TableColumnHidingExampleComponent,
];

@NgModule({
  imports: [
    NxTableModule,
    NxSwitcherModule,
    NxCheckboxModule,
    NxContextMenuModule,
    NxPaginationModule,
    NxDropdownModule,
    NxDatefieldModule,
    NxMomentDateModule,
    NxInputModule,
    NxBadgeModule,
    NxLinkModule,
    NxRadioModule,
    NxIconModule,
    NxRadioToggleModule,
    ExamplesSharedModule,
    RouterModule,
    DragDropModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class TableExamplesModule {
  static components() {
    return {
      'table-column-resize': TableColumnResizeExampleComponent,
      'table-column-reorder': TableColumnReorderExampleComponent,
      table: TableExampleComponent,
      'table-condensed': TableCondensedExampleComponent,
      'table-expandable': TableExpandableExampleComponent,
      'table-filter-sort-paginate': TableFilterSortPaginateExampleComponent,
      'table-selecting': TableSelectingExampleComponent,
      'table-single-select': TableSingleSelectExampleComponent,
      'table-sorting': TableSortingExampleComponent,
      'table-zebra': TableZebraExampleComponent,
      'table-form-elements': TableFormElementsExampleComponent,
      'table-sticky-column': TableStickyColumnExampleComponent,
      'table-sticky-header': TableStickyHeaderExampleComponent,
      'table-column-hiding': TableColumnHidingExampleComponent,
    };
  }
}
