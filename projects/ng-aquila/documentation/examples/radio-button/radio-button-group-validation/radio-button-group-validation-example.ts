import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Radio button group validation Example
 */
@Component({
  selector: 'radio-button-group-validation-example',
  templateUrl: './radio-button-group-validation-example.html',
  styleUrls: ['./radio-button-group-validation-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxRadioGroupComponent,
    NxLabelComponent,
    NxErrorComponent,
    NxRadioComponent,
    NxButtonComponent,
  ],
})
export class RadioButtonGroupValidationExampleComponent {
  readonly testForm = this.fb.group({
    radioTestReactive: [null, Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
