import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxSwipebarModule } from '@allianz/ng-aquila/swipebar';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { NxExpandableTableDirective } from './expandable/expandable-table.directive';
import { NxExpandableTableCellComponent } from './expandable/expandable-table-cell.component';
import { NxExpandableTableRowComponent } from './expandable/expandable-table-row.component';
import { NxToggleButtonComponent } from './expandable/toggle-button.component';
import { NxHeaderCellDirective } from './header-cell.directive';
import { NxHeaderResizeDirective } from './resizing/header-resize.directive';
import { NxTableCellClipDirective } from './resizing/table-cell-clip.directive';
import { NxSortDirective } from './sort-header/sort.directive';
import { NxSortHeaderComponent } from './sort-header/sort-header.component';
import { NxSortHeaderIntl } from './sort-header/sort-header-intl';
import { NxTableComponent } from './table.component';
import { NxTableCellComponent } from './table-cell.component';
import { NxTableRowComponent } from './table-row.component';

const EXPORTED_DECLARED_ELEMENTS = [
  NxHeaderCellDirective,
  NxTableComponent,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
  NxToggleButtonComponent,
  NxExpandableTableDirective,
  NxExpandableTableRowComponent,
  NxExpandableTableCellComponent,
  NxSortHeaderComponent,
  NxSortDirective,
  NxHeaderResizeDirective,
  NxTableCellClipDirective,
];

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
export function NX_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl: NxSortHeaderIntl) {
  return parentIntl || new NxSortHeaderIntl();
}

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
export const NX_SORT_HEADER_INTL_PROVIDER = {
  provide: NxSortHeaderIntl,
  deps: [[new Optional(), new SkipSelf(), NxSortHeaderIntl]],
  useFactory: NX_SORT_HEADER_INTL_PROVIDER_FACTORY,
};

@NgModule({
  exports: [...EXPORTED_DECLARED_ELEMENTS, NxSwipebarModule],
  imports: [
    CommonModule,
    NxIconModule,
    NxCopytextModule,
    NxSwipebarModule,
    ...EXPORTED_DECLARED_ELEMENTS,
  ],
  providers: [],
})
export class NxTableModule {}
