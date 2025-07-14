import { NxErrorModule } from '@allianz/ng-aquila/base';
import {
  NxTimefieldModule,
  TIMEFIELD_DEFAULT_OPTIONS,
} from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * @title Timefield with timepicker enabled globally
 */
@Component({
  selector: 'timefield-with-timepicker-global-example',
  templateUrl: './timefield-with-timepicker-global-example.html',
  styleUrls: ['./timefield-with-timepicker-global-example.css'],
  imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule],
  providers: [
    {
      provide: TIMEFIELD_DEFAULT_OPTIONS,
      useValue: { withTimepicker: true },
    },
  ],
})
export class TimefieldWithTimepickerGlobalExampleComponent {}
