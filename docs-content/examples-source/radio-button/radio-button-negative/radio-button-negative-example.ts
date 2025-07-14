import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/**
 * @title Negative Styling Example
 */
@Component({
  selector: 'radio-button-negative-example',
  templateUrl: './radio-button-negative-example.html',
  styleUrls: ['./radio-button-negative-example.css'],
  imports: [NxRadioGroupComponent, NxRadioComponent],
})
export class RadioButtonNegativeExampleComponent {}
