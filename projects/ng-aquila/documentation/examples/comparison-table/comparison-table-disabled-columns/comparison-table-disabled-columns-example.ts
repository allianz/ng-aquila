import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableIntersectionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/** @title Disabled Columns example */
@Component({
  selector: 'comparison-table-disabled-columns-example',
  templateUrl: './comparison-table-disabled-columns-example.html',
  styleUrls: ['./comparison-table-disabled-columns-example.css'],
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableIntersectionCell,
    NxListComponent,
    NxListIconComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputDirective,
    NxCheckboxComponent,
  ],
})
export class ComparisonTableDisabledColumnsExampleComponent {
  disableColumn = true;
}
