import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxTimefieldModule } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * @title Timefield with timepicker
 */
@Component({
  selector: 'timefield-with-timepicker-example',
  templateUrl: './timefield-with-timepicker-example.html',
  styleUrls: ['./timefield-with-timepicker-example.css'],
  imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule],
})
export class TimefieldWithTimepickerExampleComponent {}
