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
  NxFormfieldNoteDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Moment } from 'moment';

/**
 * @title Basic date field example
 */
@Component({
  selector: 'datefield-basic-example',
  templateUrl: './datefield-basic-example.html',
  styleUrls: ['./datefield-basic-example.css'],
  imports: [
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    FormsModule,
    NxFormfieldHintDirective,
    NxMessageComponent,
    NxFormfieldNoteDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldBasicExampleComponent {
  currentDate: Moment | null = null;
}
