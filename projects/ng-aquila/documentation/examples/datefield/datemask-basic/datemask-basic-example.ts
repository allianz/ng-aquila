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
import { FormsModule } from '@angular/forms';
import moment from 'moment';

/**
 * @title Basic date field example
 */
@Component({
  selector: 'datemask-basic-example',
  templateUrl: './datemask-basic-example.html',
  styleUrls: ['./datemask-basic-example.css'],
  imports: [
    NxFormfieldComponent,
    CommonModule,
    FormsModule,
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
export class DatemaskBasicExampleComponent {
  submitForm($event: SubmitEvent) {}
  //   customDate = moment([2020, 2, 5]);
  customDate: any = null;
  customDateExpert = moment([2025, 11, 15]);
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
}
