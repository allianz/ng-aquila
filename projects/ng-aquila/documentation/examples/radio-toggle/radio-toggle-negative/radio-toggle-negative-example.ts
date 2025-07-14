import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component } from '@angular/core';

/**
 * @title Negative Styling Example
 */
@Component({
  selector: 'radio-toggle-negative-example',
  templateUrl: './radio-toggle-negative-example.html',
  styleUrls: ['./radio-toggle-negative-example.css'],
  imports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
})
export class RadioToggleNegativeExampleComponent {}
