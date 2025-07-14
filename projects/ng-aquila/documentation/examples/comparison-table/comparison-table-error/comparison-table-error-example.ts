import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'comparison-table-error-example',
  templateUrl: './comparison-table-error-example.html',
  styleUrls: ['./comparison-table-error-example.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
