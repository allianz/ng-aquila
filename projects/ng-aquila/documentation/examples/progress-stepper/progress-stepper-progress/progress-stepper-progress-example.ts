import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxProgressStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Progress Indicator linear progress example
 */
@Component({
  selector: 'progress-stepper-progress-example',
  templateUrl: './progress-stepper-progress-example.html',
  styleUrls: ['./progress-stepper-progress-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxProgressStepperComponent,
    NxStepComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
    JsonPipe,
  ],
})
export class ProgressStepperProgressExampleComponent {
  readonly formLinear = this.fb.group({
    personalDetails: new FormGroup({
      name: new FormControl('', {
        validators: Validators.required,
      }),
      age: new FormControl('', {
        validators: Validators.required,
      }),
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: Validators.required,
      }),
      postalCode: new FormControl('', {
        validators: Validators.required,
      }),
    }),
  });

  constructor(private readonly fb: FormBuilder) {}
}
