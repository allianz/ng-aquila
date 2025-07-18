import {
  NxButtonComponent,
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
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

/** @title Basic example */
@Component({
  selector: 'comparison-table-example',
  templateUrl: './comparison-table-example.html',
  styleUrls: ['./comparison-table-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxSpinnerComponent,
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxButtonComponent,
  ],
})
export class ComparisonTableExampleComponent implements OnInit {
  loading = true;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

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
