import { Component } from '@angular/core';
import { Moment } from 'moment';
import { DatepickerDefaultOptions, DATEPICKER_DEFAULT_OPTIONS } from '@aposin/ng-aquila/datefield';

const datepickerExpertOptions: DatepickerDefaultOptions = { toggleIconTabindex: -1 };

/**
* @title Datepicker injection token
*/
@Component({
  selector: 'datefield-injection-token-example',
  templateUrl: './datefield-injection-token-example.html',
  styleUrls: ['./datefield-injection-token-example.css'],
  providers: [
    { provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerExpertOptions }
  ]
})
export class DatefieldInjectionTokenExampleComponent {
  date1: Moment = null;
}
