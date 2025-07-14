import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
  NxFormfieldLabelDirective,
} from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Custom formfield label example
 */
@Component({
  selector: 'formfield-custom-label-example',
  templateUrl: './formfield-custom-label-example.html',
  styleUrls: ['./formfield-custom-label-example.css'],
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxIconComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
  ],
})
export class FormfieldCustomLabelExampleComponent {
  suffix = '(suffix)';

  addOptionalSuffix() {
    this.suffix = this.suffix === '' ? '(suffix)' : '';
  }
}
