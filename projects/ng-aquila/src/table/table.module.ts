import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxSwipebarModule } from '@aposin/ng-aquila/swipebar';

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

@NgModule({
    declarations: EXPORTED_DECLARED_ELEMENTS,
    exports: [...EXPORTED_DECLARED_ELEMENTS, NxSwipebarModule],
    imports: [CommonModule, NxIconModule, NxCopytextModule, NxSwipebarModule],
    providers: [NxSortHeaderIntl],
})
export class NxTableModule {}
