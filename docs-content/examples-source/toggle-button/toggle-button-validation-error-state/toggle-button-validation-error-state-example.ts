import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';

/**
 * @title Toggle Button Validation Error State Example
 */
@Component({
  selector: 'toggle-button-validation-error-state-example',
  templateUrl: './toggle-button-validation-error-state-example.html',
  styleUrls: ['./toggle-button-validation-error-state-example.css'],
  imports: [
    FormField,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
    NxErrorComponent,
    NxButtonComponent,
  ],
})
export class ToggleButtonValidationErrorStateExampleComponent {
  model = signal({ interval: '' });
  paymentForm = form(this.model, (path) => {
    required(path.interval);
  });

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.paymentForm, () => Promise.resolve());
  }
}
