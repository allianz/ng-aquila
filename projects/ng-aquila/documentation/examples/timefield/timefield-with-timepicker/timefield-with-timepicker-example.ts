import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxTimefieldModule } from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield with timepicker
 */
@Component({
    selector: 'nx-timefield-with-timepicker-example',
    templateUrl: './timefield-with-timepicker-example.html',
    styleUrls: ['./timefield-with-timepicker-example.css'],
    standalone: true,
    imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule],
})
export class TimefieldWithTimepickerExampleComponent {}
