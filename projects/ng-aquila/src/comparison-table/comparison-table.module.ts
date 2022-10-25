import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableComponent } from './comparison-table.component';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';
import { NxComparisonTableDescriptionCell } from './description-cell/description-cell.component';
import { NxComparisonTableDesktopGroup } from './desktop-group/desktop-group.component';
import { NxComparisonTableFlexRow } from './flex-row/flex-row.component';
import { NxComparisonTableIntersectionCell } from './intersection-cell/intersection-cell.component';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { NxComparisonTableSelectButton } from './select-button/select-button.component';
import { NxToggleSectionDirective } from './toggle-section/toggle-section.directive';
import { NxToggleSectionHeaderComponent } from './toggle-section/toggle-section-header.component';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [
        NxComparisonTableComponent,
        NxComparisonTableCell,
        NxComparisonTableDescriptionCell,
        NxComparisonTableIntersectionCell,
        NxToggleSectionDirective,
        NxToggleSectionHeaderComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableSelectButton,
        NxComparisonTableFlexRow,
        NxComparisonTableRowGroupDirective,
        NxComparisonTableDesktopGroup,
        NxComparisonTablePopularCell,
    ],
    exports: [
        NxComparisonTableComponent,
        NxComparisonTableCell,
        NxComparisonTableDescriptionCell,
        NxComparisonTableIntersectionCell,
        NxToggleSectionDirective,
        NxToggleSectionHeaderComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableSelectButton,
        NxComparisonTableFlexRow,
        NxComparisonTableRowGroupDirective,
        NxComparisonTableDesktopGroup,
        NxComparisonTablePopularCell,
    ],
})
export class NxComparisonTableModule {}
