import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatemaskComponent,
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
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    FormsModule,
    NxDatemaskComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxErrorComponent,
    NxDatepickerToggleComponent,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
    NxSwitcherComponent,
  ],
})
export class DatemaskDisabledExampleComponent {
  disabledAttribute = true;
  customDate: any = null;
}
