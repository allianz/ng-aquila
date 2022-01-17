import { Component, Injectable } from '@angular/core';
import { NxDatepickerIntl } from '@aposin/ng-aquila/datefield';
import { Moment } from 'moment';

@Injectable()
export class MyIntl extends NxDatepickerIntl {
    calendarLabel = 'My Calendar'; /** used by screen readers */
    openCalendarLabel = 'Open my calendar'; /** used by screen readers */
    prevMonthLabel = 'My previous month'; /** used by screen readers */
    nextMonthLabel = 'My next month'; /** used by screen readers */
    prevYearLabel = 'My previous year'; /** used by screen readers */
    nextYearLabel = 'My next year'; /** used by screen readers */
    prevMultiYearLabel = 'My previous 20 years'; /** used by screen readers */
    nextMultiYearLabel = 'My next 20 years'; /** used by screen readers */
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
})
export class DatefieldLocalizeTextsExampleComponent {
    currentDate: Moment | null = null;
}
