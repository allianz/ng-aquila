import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxDateRangeComponent,
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
import moment from 'moment';

/**
 * @title Date range format example
 */
@Component({
    selector: 'datefield-range-example',
    templateUrl: './datefield-range-format-example.html',
    styleUrls: ['./datefield-range-format-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        FormsModule,
        ReactiveFormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxDateRangeComponent,
        CommonModule,
        NxFormfieldHintDirective,
    ],
})
export class DatefieldRangeFormatExampleComponent {
    dateRange = {
        start: moment([2020, 2, 3]),
        end: moment([2020, 2, 3]),
    };

    formWithPicker = new FormBuilder().group({
        range: [this.dateRange],
    });
}
