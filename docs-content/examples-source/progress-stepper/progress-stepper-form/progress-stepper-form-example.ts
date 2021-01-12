import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
* @title Progress Indicator multi manual step completion example
*/
@Component({
  selector: 'progress-stepper-form-example',
  templateUrl: './progress-stepper-form-example.html',
  styleUrls: ['./progress-stepper-form-example.css']
})
export class ProgressStepperFormExampleComponent {
  lastStepCompleted = false;
  manualCompletionForm = this._formBuilder.group({'name': ['', Validators.required]});

  constructor(private _formBuilder: FormBuilder) {}

  completeLastStep() {
    this.lastStepCompleted = true;
  }
}
