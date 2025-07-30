import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatemaskComponent,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
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
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';

/**
 * @title Basic date field example
 */
@Component({
  selector: 'datemask-format-example',
  templateUrl: './datemask-format-example.html',
  styleUrls: ['./datemask-format-example.css'],
  imports: [
    NxFormfieldComponent,
    FormsModule,
    NxDatemaskComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxErrorComponent,
    NxMessageComponent,
    NxDatepickerToggleComponent,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class DatemaskFormatExampleComponent {
  date = moment([2020, 2, 5]);
  format = 'DD.MM.YYYY';
}
