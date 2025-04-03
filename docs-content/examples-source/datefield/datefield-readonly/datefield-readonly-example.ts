import { Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    DateRange,
    NxDateAdapter,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
    NxDateRangeComponent,
} from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSwitcherModule } from '@aposin/ng-aquila/switcher';
import { Moment } from 'moment';

/**
 * @title Datefield readonly example
 */
@Component({
    selector: 'datefield-readonly-example',
    templateUrl: './datefield-readonly-example.html',
    styleUrls: ['./datefield-readonly-example.css'],
    imports: [
        NxFormfieldComponent,
        NxDatepickerToggleComponent,
        NxDatepickerComponent,
        NxDatefieldDirective,
        FormsModule,
        NxInputModule,
        NxDateRangeComponent,
        NxSwitcherModule,
        NxDatepickerComponent,
        NxDatepickerToggleComponent,
        FormsModule,
    ],
})
export class DatefieldReadonlyExampleComponent {
    adapter = inject(NxDateAdapter);
    readOnlyAttribute = true;
    currentDate = this.adapter.today();
    dateRange: DateRange<Moment> = {
        start: this.adapter.today(),
        end: this.adapter.today(),
    };

    picker = viewChild.required<NxDatepickerComponent<Moment>>(
        NxDatepickerComponent,
    );
}
