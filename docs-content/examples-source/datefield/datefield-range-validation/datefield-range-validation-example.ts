import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    ValidatorFn,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    DateRange,
    NxDatepickerComponent as NxDatepickerComponent_1,
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
import moment, { Moment } from 'moment';

function notSameMonthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value || !control.value.start || !control.value.end) {
            // will be handled by nx-date-range-component itself
            return null;
        }

        const dateRange = control.value as DateRange<Moment>;

        if (
            dateRange.start?.month() === dateRange.end?.month() &&
            dateRange.start?.year() === dateRange.end?.year()
        ) {
            return { customSameMonthValidationError: true };
        }

        return null;
    };
}

/**
 * @title Date range example
 */
@Component({
    selector: 'datefield-range-validation-example',
    templateUrl: './datefield-range-validation-example.html',
    styleUrls: ['./datefield-range-validation-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        FormsModule,
        ReactiveFormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent_1,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxDateRangeComponent,
        CommonModule,
        NxFormfieldHintDirective,
    ],
})
export class DatefieldRangeValidationExampleComponent {
    dateRange = {
        start: moment([2020, 2, 5]),
        end: moment([2020, 5, 1]),
    };

    formWithPicker = new FormBuilder().group({
        range: [this.dateRange, notSameMonthValidator()],
    });

    minDate = moment([2020, 3, 1]);
    maxDate = moment([2020, 4, 1]);

    dateFilterWithFirstDay = (date: Moment | null) => date?.date() === 1;
}
