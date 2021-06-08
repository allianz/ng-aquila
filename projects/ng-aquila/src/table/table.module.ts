import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxTableCellComponent } from './table-cell.component';
import { NxHeaderCellDirective } from './header-cell.directive';
import { NxTableComponent } from './table.component';
import { NxTableRowComponent } from './table-row.component';
import { NxExpandableTableCellComponent } from './expandable/expandable-table-cell.component';
import { NxExpandableTableRowComponent } from './expandable/expandable-table-row.component';
import { NxToggleButtonComponent } from './expandable/toggle-button.component';
import { NxExpandableTableDirective } from './expandable/expandable-table.directive';
import { NxSortHeaderComponent } from './sort-header/sort-header.component';
import { NxSortDirective } from './sort-header/sort.directive';
import { NxSortHeaderIntl } from './sort-header/sort-header-intl';
import { NxSwipebarComponent } from './swipebar/swipebar.component';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';

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
  NxSwipebarComponent
];

@NgModule({
  declarations: EXPORTED_DECLARED_ELEMENTS,
  exports: EXPORTED_DECLARED_ELEMENTS,
  imports: [
    CommonModule,
    NxIconModule,
    NxCopytextModule
  ],
  providers: [ NxSortHeaderIntl ],
})
export class NxTableModule { }
