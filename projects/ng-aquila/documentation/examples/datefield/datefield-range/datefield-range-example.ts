import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatefieldDirective,
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
import { Component, contentChildren, viewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment from 'moment';

/**
 * @title Date range example
 */
@Component({
  selector: 'datefield-range-example',
  templateUrl: './datefield-range-example.html',
  styleUrls: ['./datefield-range-example.css'],
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
export class DatefieldRangeExampleComponent {
  dateDirectives = contentChildren(NxDatefieldDirective);
  dateRangeComponent = viewChild(NxDateRangeComponent);

  dateRange = {
    start: moment([2020, 2, 5]),
    end: moment([2020, 5, 1]),
  };
  dateRangeModel = {
    start: moment([2020, 2, 5]),
    end: moment([2020, 5, 1]),
  };

  dateRangeForm = new FormBuilder().group({
    range: [this.dateRangeModel, Validators.required],
  });

  formWithPicker = new FormBuilder().group({
    range: [this.dateRange, Validators.required],
  });
}
