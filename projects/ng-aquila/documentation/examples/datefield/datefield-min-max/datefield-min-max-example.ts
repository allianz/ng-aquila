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
import moment from 'moment';

/**
 * @title Example of setting min and max values
 */
@Component({
  selector: 'datefield-min-max-example',
  templateUrl: './datefield-min-max-example.html',
  styleUrls: ['./datefield-min-max-example.css'],
  imports: [
    NxFormfieldComponent,
    FormsModule,
    NxDatefieldDirective,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldMinMaxExampleComponent {
  minDate = moment([2010, 1, 1]);
  maxDate = moment([2020, 1, 1]);
}
