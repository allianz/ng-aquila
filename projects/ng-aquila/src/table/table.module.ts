import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxExpandableTableCellComponent } from './expandable/expandable-table-cell.component';
import { NxExpandableTableRowComponent } from './expandable/expandable-table-row.component';
import { NxExpandableTableDirective } from './expandable/expandable-table.directive';
import { NxToggleButtonComponent } from './expandable/toggle-button.component';
import { NxHeaderCellDirective } from './header-cell.directive';
import { NxSortHeaderIntl } from './sort-header/sort-header-intl';
import { NxSortHeaderComponent } from './sort-header/sort-header.component';
import { NxSortDirective } from './sort-header/sort.directive';
import { NxSwipebarComponent } from './swipebar/swipebar.component';
import { NxTableCellComponent } from './table-cell.component';
import { NxTableRowComponent } from './table-row.component';
import { NxTableComponent } from './table.component';

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
    NxSwipebarComponent,
];

@NgModule({
    declarations: EXPORTED_DECLARED_ELEMENTS,
    exports: EXPORTED_DECLARED_ELEMENTS,
    imports: [CommonModule, NxIconModule, NxCopytextModule],
    providers: [NxSortHeaderIntl],
})
export class NxTableModule {}
