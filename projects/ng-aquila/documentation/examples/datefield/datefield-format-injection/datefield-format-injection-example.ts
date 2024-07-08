import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NX_DATE_FORMATS,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
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
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
    ],
})
export class DatefieldFormatInjectionExampleComponent {
    inputString = moment();
}
