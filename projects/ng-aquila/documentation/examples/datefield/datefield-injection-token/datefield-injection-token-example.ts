import { Component } from '@angular/core';
import {
    DATEPICKER_DEFAULT_OPTIONS,
    DatepickerDefaultOptions,
} from '@aposin/ng-aquila/datefield';
import { Moment } from 'moment';

const datepickerExpertOptions: DatepickerDefaultOptions = {
    toggleIconTabindex: -1,
};

/**
 * @title Datepicker injection token
 */
@Component({
    selector: 'datefield-injection-token-example',
    templateUrl: './datefield-injection-token-example.html',
    styleUrls: ['./datefield-injection-token-example.css'],
    providers: [
        {
            provide: DATEPICKER_DEFAULT_OPTIONS,
            useValue: datepickerExpertOptions,
        },
    ],
})
export class DatefieldInjectionTokenExampleComponent {
    date1: Moment | null = null;
}
