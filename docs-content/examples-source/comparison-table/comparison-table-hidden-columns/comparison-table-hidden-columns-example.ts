import {
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/** @title Hidden Columns */
@Component({
  selector: 'nx-comparison-table-hidden-columns-example',
  templateUrl: './comparison-table-hidden-columns-example.html',
  styleUrls: ['./comparison-table-hidden-columns-example.css'],
  imports: [
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
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
        (value) => value !== index,
      );
    }
  }

  selectedIndexChange(selectedColumnIndex: number) {
    this.selectedColumnIndex = selectedColumnIndex;
  }
}
