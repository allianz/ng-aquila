import { Component } from '@angular/core';
import * as moment from 'moment';
import { NX_DATE_FORMATS } from '@aposin/ng-aquila/datefield';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/**
* @title Custom date formats injection token
*/
@Component({
  templateUrl: './datefield-format-injection-example.html',
  providers: [
    {provide: NX_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class DatefieldFormatInjectionExampleComponent {
  inputString = moment();
}
