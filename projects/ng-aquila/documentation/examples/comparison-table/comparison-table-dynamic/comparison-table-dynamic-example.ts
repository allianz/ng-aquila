import {
  NxButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTableRowDirective,
  NxComparisonTableRowType,
  NxComparisonTableSelectButton,
  NxToggleSectionDirective,
  NxToggleSectionHeaderComponent,
} from '@allianz/ng-aquila/comparison-table';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

interface ContentCell {
  type: NxComparisonTableRowType;
  description?: string;
  cells: string[];
}
interface ToggleSection {
  type: 'toggleSection';
  header: string;
  content: ContentCell[];
}
type TableData = (ContentCell | ToggleSection)[];

/** @title Dynamically filled table */
@Component({
  selector: 'comparison-table-dynamic-example',
  templateUrl: './comparison-table-dynamic-example.html',
  styleUrls: ['./comparison-table-dynamic-example.css'],
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxHeadlineComponent,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
    NxPriceComponent,
    NxSpinnerComponent,
    NxButtonComponent,
  ],
})
export class ComparisonTableDynamicExampleComponent implements OnInit {
  loading = true;

  prices = [105.99, 110.99];

  data: TableData = [
    {
      type: 'header',
      cells: ['This is a header cell', 'This is a header cell'],
    },
    {
      type: 'content',
      description: 'This is a description cell',
      cells: ['This is a cell', 'This is a cell'],
    },
    {
      type: 'toggleSection',
      header: 'Toggle Section',
      content: [
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
        {
          type: 'content',
          description: 'This is a description cell',
          cells: ['This is a cell', 'This is a cell'],
        },
      ],
    },
    {
      type: 'footer',
      cells: ['This is a footer cell', 'This is a footer cell'],
    },
  ];

  private readonly _cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this._cdr.markForCheck();
    }, 2000);
  }
}
