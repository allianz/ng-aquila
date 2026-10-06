import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { Component } from '@angular/core';

/** @title Disabled and hidden columns example */
@Component({
  selector: 'comparison-table-columns-example',
  templateUrl: './comparison-table-columns-example.html',
  styleUrls: ['./comparison-table-columns-example.css'],
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxHeadlineComponent,
    NxPriceComponent,
    NxCheckboxComponent,
    NxIconButtonComponent,
    NxIconComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
  ],
})
export class ComparisonTableColumnsExampleComponent {
  readonly productTitles = ['Product One', 'Product Two', 'Product Three'];

  selectedColumnIndex = 1;

  hiddenIndexes: number[] = [];

  isHidden = (index: number) => this.hiddenIndexes.includes(index);

  toggleHiddenIndex(index: number) {
    // Hiding the selected column would submit a selection the user cannot see.
    if (index === this.selectedColumnIndex) {
      return;
    }

    this.hiddenIndexes = this.isHidden(index)
      ? this.hiddenIndexes.filter((value) => value !== index)
      : [...this.hiddenIndexes, index];
  }
}
