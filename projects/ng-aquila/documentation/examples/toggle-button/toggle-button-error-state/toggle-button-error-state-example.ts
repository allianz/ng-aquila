import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';
import { form, FormField, validate } from '@angular/forms/signals';

/**
 * @title Toggle Button Error State Example
 */
@Component({
  selector: 'toggle-button-error-state-example',
  templateUrl: './toggle-button-error-state-example.html',
  imports: [
    FormField,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
    NxErrorComponent,
  ],
})
export class ToggleButtonErrorStateExampleComponent {
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  model = signal({ interval: 'quarterly' });
  paymentForm = form(this.model, (path) => {
    validate(path.interval, ({ value }) =>
      value() === 'quarterly' ? { kind: 'unavailable' } : undefined,
    );
  });

  constructor() {
    // Only to show the error state right away, a form usually gets there by the user leaving the
    // group or by `submit()`.
    this.paymentForm.interval().markAsTouched();
  }
}
