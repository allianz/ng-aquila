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
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';

/**
 * @title Datepicker toggle focus example
 */
@Component({
  selector: 'datefield-toggle-focus-example',
  templateUrl: './datefield-toggle-focus-example.html',
  styleUrls: ['./datefield-toggle-focus-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
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
export class DatefieldToggleFocusExampleComponent {
  date1: Moment | null = null;
  date2: Moment | null = null;
}
