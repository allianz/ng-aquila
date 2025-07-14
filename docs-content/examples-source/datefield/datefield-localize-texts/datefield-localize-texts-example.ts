import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerIntl,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';

@Injectable()
export class MyIntl extends NxDatepickerIntl {
  calendarLabel = 'My Calendar';
  openCalendarLabel = 'Open my calendar';
  prevMonthLabel = 'My previous month';
  nextMonthLabel = 'My next month';
  prevYearLabel = 'My previous year';
  nextYearLabel = 'My next year';
  prevMultiYearLabel = 'My previous 20 years';
  nextMultiYearLabel = 'My next 20 years';
  switchToMonthViewLabel = 'Choose a special date';
  switchToMultiYearViewLabel = 'Choose button';
}

/**
 * @title Localizing labels and messages example
 */
@Component({
  selector: 'datefield-localize-texts-example',
  templateUrl: './datefield-localize-texts-example.html',
  styleUrls: ['./datefield-localize-texts-example.css'],
  providers: [{ provide: NxDatepickerIntl, useClass: MyIntl }],
  imports: [
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    FormsModule,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldLocalizeTextsExampleComponent {
  currentDate: Moment | null = null;
}
