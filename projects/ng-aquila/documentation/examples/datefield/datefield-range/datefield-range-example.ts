import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerComponent as NxDatepickerComponent_1,
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
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { Moment } from 'moment';

/**
 * @title Date range example
 */
@Component({
    selector: 'datefield-range-example',
    templateUrl: './datefield-range-example.html',
    styleUrls: ['./datefield-range-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxFormfieldHintDirective,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent_1,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldRangeExampleComponent {
    @ViewChild('endDatepicker', { static: true })
    endDatepicker!: NxDatepickerComponent<Moment>;

    startDate: Moment | null = null;
    endDate: Moment | null = null;

    updateEndDatepicker() {
        this.endDate = this.startDate;
        setTimeout(() => this.endDatepicker.open());
    }
}
