import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component } from '@angular/core';

/**
 * @title Custom Example
 */
@Component({
  selector: 'radio-toggle-custom-example',
  templateUrl: './radio-toggle-custom-example.html',
  styleUrls: ['./radio-toggle-custom-example.css'],
  imports: [
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
    NxIconComponent,
  ],
})
export class RadioToggleCustomExampleComponent {}
