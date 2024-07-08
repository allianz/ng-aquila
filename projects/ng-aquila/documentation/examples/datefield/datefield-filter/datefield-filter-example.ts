import { NgIf } from '@angular/common';
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
import { Moment } from 'moment';

/**
 * @title Date filter example
 */
@Component({
    selector: 'datefield-filter-example',
    templateUrl: './datefield-filter-example.html',
    styleUrls: ['./datefield-filter-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        FormsModule,
        NxDatefieldDirective,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NgIf,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldFilterExampleComponent {
    onlyDaysWith6 = (date: Moment | null) => date?.date() === 6;
}
