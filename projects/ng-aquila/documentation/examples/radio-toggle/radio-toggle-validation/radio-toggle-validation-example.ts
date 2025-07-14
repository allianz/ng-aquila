import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

/**
 * @title Validation Example
 */
@Component({
  selector: 'radio-toggle-validation-example',
  templateUrl: './radio-toggle-validation-example.html',
  styleUrls: ['./radio-toggle-validation-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
    NxButtonComponent,
    JsonPipe,
    NxErrorComponent,
    NxLabelComponent,
  ],
})
export class RadioToggleValidationExampleComponent {
  readonly data = ['A', 'B', 'C'];

  readonly testForm = this.fb.group({
    testToggle: ['', this.customValidation],
  });

  isSubmitted = false;

  constructor(private readonly fb: FormBuilder) {}

  private customValidation(formGroup: FormGroup) {
    return formGroup.value !== 'B' ? { valid: false } : null;
  }

  onsubmit() {
    this.isSubmitted = true;
  }
}
