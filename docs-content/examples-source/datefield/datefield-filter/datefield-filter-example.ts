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
 * @title Date filter example
 */
@Component({
  selector: 'datefield-filter-example',
  templateUrl: './datefield-filter-example.html',
  styleUrls: ['./datefield-filter-example.css'],
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
export class DatefieldFilterExampleComponent {
  onlyDaysWith6 = (date: Moment | null) => date?.date() === 6;
}
