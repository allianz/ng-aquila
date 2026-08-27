import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

/**
 * @title Toggle Button Signal Forms Example
 */
@Component({
  selector: 'toggle-button-signal-forms-example',
  templateUrl: './toggle-button-signal-forms-example.html',
  imports: [
    FormField,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
    NxErrorComponent,
  ],
})
export class ToggleButtonSignalFormsExampleComponent {
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  model = signal({ interval: '' });
  paymentForm = form(this.model, (path) => {
    required(path.interval);
  });
}
