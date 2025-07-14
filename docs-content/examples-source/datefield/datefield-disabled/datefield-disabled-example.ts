import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
  NxDateRangeComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Disabled example
 */
@Component({
  selector: 'datefield-disabled-example',
  templateUrl: './datefield-disabled-example.html',
  styleUrls: ['./datefield-disabled-example.css'],
  imports: [
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxDateRangeComponent,
    NxSwitcherComponent,
    FormsModule,
  ],
})
export class DatefieldDisabledExampleComponent {
  disabledAttribute = true;
}
