import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'comparison-table-error-example',
  templateUrl: './comparison-table-error-example.html',
  styleUrls: ['./comparison-table-error-example.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxPriceComponent,
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxHeadlineComponent,
    NxComparisonTableCell,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxErrorComponent,
  ],
})
export class ComparisonTableErrorExampleComponent {
  constructor() {}
  control = new FormControl(null);

  select(v: any) {
    this.control.setValue(v);
  }
}
