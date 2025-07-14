import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/** @title Add custom form elements to the table */
@Component({
  selector: 'comparison-table-form-elements-example',
  templateUrl: './comparison-table-form-elements-example.html',
  styleUrls: ['./comparison-table-form-elements-example.css'],
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxIconComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class ComparisonTableFormElementsExampleComponent {}
