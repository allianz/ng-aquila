import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldHintDirective,
  NxFormfieldPrefixDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Appearance example
 */
@Component({
  selector: 'formfield-appearance-example',
  templateUrl: './formfield-appearance-example.html',
  styleUrls: ['./formfield-appearance-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldPrefixDirective,
    NxIconComponent,
    NxFormfieldAppendixDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDatefieldDirective,
    FormsModule,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxIconButtonComponent,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
  ],
})
export class FormfieldAppearanceExampleComponent {
  currentDate: Date | null = null;

  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;

  count = 0;

  onInput() {
    this.count = this.input.value.length;
  }
}
