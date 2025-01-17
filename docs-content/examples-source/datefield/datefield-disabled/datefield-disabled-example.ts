import { Component } from '@angular/core';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Disabled example
 */
@Component({
    selector: 'datefield-disabled-example',
    templateUrl: './datefield-disabled-example.html',
    styleUrls: ['./datefield-disabled-example.css'],
    imports: [
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
    ],
})
export class DatefieldDisabledExampleComponent {}
