import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  DATEPICKER_DEFAULT_OPTIONS,
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  FORMFIELD_DEFAULT_OPTIONS,
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
} from '@allianz/ng-aquila/popover';
import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment from 'moment';

/**
 * @title Table with form elements
 */
@Component({
  selector: 'table-form-elements-example',
  templateUrl: './table-form-elements-example.html',
  styleUrls: ['./table-form-elements-example.css'],
  providers: [
    // Both provided with NxExpertModule
    {
      provide: FORMFIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', nxFloatLabel: 'always' },
    },
    {
      provide: DATEPICKER_DEFAULT_OPTIONS,
      useValue: { toggleIconTabindex: -1 },
    },
  ],
  imports: [
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    FormsModule,
    ReactiveFormsModule,
    NxTableCellComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxDatefieldDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
    NxErrorComponent,
    NxSignalButtonComponent,
    NxPopoverTitleDirective,
    NxPopoverMainContentDirective,
    NxHeadlineComponent,
    NxDatepickerComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxPlainButtonComponent,
    NxIconComponent,
  ],
})
export class TableFormElementsExampleComponent {
  formArray = new FormArray([
    new FormGroup({
      id: new FormControl('123456789', Validators.required),
      amount: new FormControl(250.0, [Validators.required, Validators.min(1)]),
      endingAt: new FormControl(moment([2021, 4, 1])),
      status: new FormControl('open'),
    }),
    new FormGroup({
      id: new FormControl('987654321', Validators.required),
      amount: new FormControl(1000.4, [Validators.required, Validators.min(1)]),
      endingAt: new FormControl(moment([2023, 2, 23])),
      status: new FormControl('processing'),
    }),
    // This row starts in an invalid state to demonstrate the inline error
    // signal button: the id is missing and the amount is below the minimum.
    new FormGroup({
      id: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(1)]),
      endingAt: new FormControl(moment([2019, 11, 31])),
      status: new FormControl('accepted'),
    }),
    new FormGroup({
      id: new FormControl('123456780', Validators.required),
      amount: new FormControl(501, [Validators.required, Validators.min(1)]),
      endingAt: new FormControl(moment([2018, 11, 31])),
      status: new FormControl('rejected'),
    }),
  ]);

  constructor() {
    // Mark existing controls as touched so the seeded errors are visible.
    this.formArray.markAllAsTouched();
  }

  addRow() {
    this.formArray.push(
      new FormGroup({
        id: new FormControl('', Validators.required),
        amount: new FormControl(0, [Validators.required, Validators.min(1)]),
        endingAt: new FormControl(moment('')),
        status: new FormControl(''),
      }),
    );
  }

  removeRow(index: number) {
    this.formArray.removeAt(index);
  }

  getFormGroup(i: number): FormGroup {
    return this.formArray.controls[i] as FormGroup;
  }

  getControl(i: number, name: string): FormControl {
    return this.getFormGroup(i).get(name) as FormControl;
  }
}
