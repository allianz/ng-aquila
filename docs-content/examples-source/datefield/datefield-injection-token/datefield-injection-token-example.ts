import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  DATEPICKER_DEFAULT_OPTIONS,
  DatepickerDefaultOptions,
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

const datepickerExpertOptions: DatepickerDefaultOptions = {
  toggleIconTabindex: -1,
};

/**
 * @title Datepicker injection token
 */
@Component({
  selector: 'datefield-injection-token-example',
  templateUrl: './datefield-injection-token-example.html',
  styleUrls: ['./datefield-injection-token-example.css'],
  providers: [
    {
      provide: DATEPICKER_DEFAULT_OPTIONS,
      useValue: datepickerExpertOptions,
    },
  ],
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
export class DatefieldInjectionTokenExampleComponent {
  date1: Moment | null = null;
}
