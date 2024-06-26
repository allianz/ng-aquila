import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import {
    NxTimefieldModule,
    TIMEFIELD_DEFAULT_OPTIONS,
} from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield with timepicker enabled globally
 */
@Component({
    selector: 'nx-timefield-with-timepicker-global-example',
    templateUrl: './timefield-with-timepicker-global-example.html',
    styleUrls: ['./timefield-with-timepicker-global-example.css'],
    standalone: true,
    imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule],
    providers: [
        {
            provide: TIMEFIELD_DEFAULT_OPTIONS,
            useValue: { withTimepicker: true },
        },
    ],
})
export class TimefieldWithTimepickerGlobalExampleComponent {}
