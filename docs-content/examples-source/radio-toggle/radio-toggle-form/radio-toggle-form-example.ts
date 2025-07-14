import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template Driven Form Example
 */
@Component({
  selector: 'radio-toggle-form-example',
  templateUrl: './radio-toggle-form-example.html',
  styleUrls: ['./radio-toggle-form-example.css'],
  imports: [FormsModule, NxRadioToggleComponent, NxRadioToggleButtonComponent],
})
export class RadioToggleFormExampleComponent {
  testSelect = 'B';
}
