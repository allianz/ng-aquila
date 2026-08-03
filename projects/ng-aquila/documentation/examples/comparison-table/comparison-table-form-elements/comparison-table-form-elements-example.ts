import { NxErrorComponent } from '@allianz/ng-aquila/base';
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
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
} from '@allianz/ng-aquila/popover';
import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
    NxErrorComponent,
    NxSignalButtonComponent,
    NxPopoverTitleDirective,
    NxPopoverMainContentDirective,
    NxHeadlineComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    ReactiveFormsModule,
  ],
})
export class ComparisonTableFormElementsExampleComponent {
  coverageAmountControl = new FormControl<string | null>(
    null,
    Validators.required,
  );

  constructor() {
    // Mark as touched so the inline error state is visible on load.
    this.coverageAmountControl.markAsTouched();
  }
}
