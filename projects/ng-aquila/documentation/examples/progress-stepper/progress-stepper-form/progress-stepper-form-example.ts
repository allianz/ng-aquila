import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxMultiStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Progress Indicator multi manual step completion example
 */
@Component({
  selector: 'progress-stepper-form-example',
  templateUrl: './progress-stepper-form-example.html',
  styleUrls: ['./progress-stepper-form-example.css'],
  imports: [
    NxMultiStepperComponent,
    NxStepComponent,
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperFormExampleComponent {
  lastStepCompleted = false;

  readonly manualCompletionForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}

  completeLastStep() {
    this.lastStepCompleted = true;
  }
}
