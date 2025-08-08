import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatemaskComponent,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
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
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment from 'moment';

/**
 * @title Reactive Form datemask example
 */
@Component({
  selector: 'datemask-reactive-form-example',
  templateUrl: './datemask-reactive-form-example.html',
  styleUrls: ['./datemask-reactive-form-example.css'],
  imports: [
    NxFormfieldComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NxDatemaskComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxErrorComponent,
    NxMessageComponent,
    NxDatepickerToggleComponent,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
  ],
})
export class DatemaskReactiveFormExampleComponent {
  customDate: any = null;
  minDate = moment([2020, 2, 5]);
  maxDate = moment([2020, 2, 30]);
  dateFilter(date: moment.Moment | null): boolean {
    if (date === null) {
      return false;
    }

    // exclude weekends
    if (date.isoWeekday() < 6) {
      return true;
    }

    return false;
  }

  datemaskForm = new FormBuilder().group({
    date: [this.customDate, Validators.required],
  });
}
