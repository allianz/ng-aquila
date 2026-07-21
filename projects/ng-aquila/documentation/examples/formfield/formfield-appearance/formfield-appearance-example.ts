import {
  NxErrorComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
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
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
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
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDatefieldDirective,
    FormsModule,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxInfoIconComponent,
    NxLabelInfoDirective,
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
