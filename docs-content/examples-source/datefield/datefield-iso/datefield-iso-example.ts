import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxDatefieldDirective } from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Use strings as inputs
 */
@Component({
  selector: 'datefield-iso-example',
  templateUrl: './datefield-iso-example.html',
  styleUrls: ['./datefield-iso-example.css'],
  imports: [
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    FormsModule,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldIsoExampleComponent {
  inputString = '2020-01-01';
}
