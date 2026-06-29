import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
  NxDateRangeComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment';

/**
 * @title Date range pinned date example
 */
@Component({
  selector: 'datefield-range-validation-pinned-example',
  templateUrl: './datefield-range-validation-pinned-example.html',
  styleUrls: ['./datefield-range-validation-pinned-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    FormsModule,
    ReactiveFormsModule,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxDateRangeComponent,
    CommonModule,
    NxFormfieldHintDirective,
  ],
})
export class DatefieldRangeValidationPinnedExampleComponent {
  minStartDate = moment([2020, 3, 5]);
  maxStartDate = moment([2020, 3, 5]);
  minEndDate = moment([2020, 4, 20]);
  maxEndDate = moment([2020, 4, 20]);

  formWithPicker = new FormBuilder().group({
    range: [{ start: this.minStartDate.clone(), end: this.minEndDate.clone() }],
  });
}
