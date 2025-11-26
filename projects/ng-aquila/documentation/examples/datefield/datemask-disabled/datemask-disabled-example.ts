import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatemaskComponent,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Basic date field example
 */
@Component({
  selector: 'datemask-disabled-example',
  templateUrl: './datemask-disabled-example.html',
  styleUrls: ['./datemask-disabled-example.css'],
  imports: [
    NxFormfieldComponent,
    FormsModule,
    NxDatemaskComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxDatepickerToggleComponent,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
    NxSwitcherComponent,
  ],
})
export class DatemaskDisabledExampleComponent {
  disabledAttribute = true;
  customDate: any = null;
}
