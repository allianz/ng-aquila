import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';

/**
 * @title Datepicker with today button example
 */
@Component({
  selector: 'datefield-today-button-example',
  templateUrl: './datefield-today-button-example.html',
  styleUrls: ['./datefield-today-button-example.css'],
  imports: [
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    FormsModule,
    NxFormfieldHintDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldTodayButtonExampleComponent {
  currentDate: Moment | null = null;
}
