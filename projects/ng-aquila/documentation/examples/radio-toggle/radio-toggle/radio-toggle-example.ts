import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component } from '@angular/core';

/**
 * @title Toggle Button Example
 */
@Component({
  selector: 'radio-toggle-example',
  templateUrl: './radio-toggle-example.html',
  styleUrls: ['./radio-toggle-example.css'],
  imports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
})
export class RadioToggleExampleComponent {}
