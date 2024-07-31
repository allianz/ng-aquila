import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    DATEPICKER_DEFAULT_OPTIONS,
    DatepickerDefaultOptions,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxInputDirective } from '@aposin/ng-aquila/input';
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
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldInjectionTokenExampleComponent {
    date1: Moment | null = null;
}
