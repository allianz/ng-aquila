import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
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
import { NxInputDirective } from '@aposin/ng-aquila/input';
import moment from 'moment';

/**
 * @title Example of setting min and max values
 */
@Component({
    selector: 'datefield-min-max-example',
    templateUrl: './datefield-min-max-example.html',
    styleUrls: ['./datefield-min-max-example.css'],
    imports: [
        NxFormfieldComponent,
        FormsModule,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldMinMaxExampleComponent {
    minDate = moment([2010, 1, 1]);
    maxDate = moment([2020, 1, 1]);
}
