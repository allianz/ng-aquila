import { Component } from '@angular/core';
import {
    NxIconButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTablePopularCell,
    NxComparisonTableRowDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/** @title Hidden Columns */
@Component({
    selector: 'nx-comparison-table-hidden-columns-example',
    templateUrl: './comparison-table-hidden-columns-example.html',
    styleUrls: ['./comparison-table-hidden-columns-example.css'],
    standalone: true,
    imports: [
        NxIconButtonComponent,
        NxContextMenuTriggerDirective,
        NxIconComponent,
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxSwipebarComponent,
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTablePopularCell,
        NxPlainButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
    ],
})
export class ComparisonTableHiddenColumnsExampleComponent {
    hiddenIndexes: number[] = [];

    selectedColumnIndex = 1;

    isHiddenIndex = (index: number) => this.hiddenIndexes.includes(index);

    toggleHiddenIndexes(index: number) {
        if (index === this.selectedColumnIndex) {
            return;
        }

        if (!this.hiddenIndexes.includes(index)) {
            this.hiddenIndexes.push(index);
        } else {
            this.hiddenIndexes = this.hiddenIndexes.filter(
                value => value !== index,
            );
        }
    }

    selectedIndexChange(selectedColumnIndex: number) {
        this.selectedColumnIndex = selectedColumnIndex;
    }
}
