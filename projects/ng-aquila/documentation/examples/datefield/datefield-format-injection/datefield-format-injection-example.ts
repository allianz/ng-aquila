import { Component } from '@angular/core';
import { NX_DATE_FORMATS } from '@aposin/ng-aquila/datefield';
import moment from 'moment';

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
    selector: 'datefield-format-injection-example',
    templateUrl: './datefield-format-injection-example.html',
    styleUrls: ['./datefield-format-injection-example.css'],
    providers: [{ provide: NX_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class DatefieldFormatInjectionExampleComponent {
    inputString = moment();
}
