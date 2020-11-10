import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
* @title Progress Indicator reactive form with separate form per step
*/
@Component({
  templateUrl: './progress-stepper-reactivemulti-example.html',
  styleUrls: ['./progress-stepper-reactivemulti-example.css']
})
export class ProgressStepperReactivemultiExampleComponent {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.stepOneForm = this._formBuilder.group({ name: '' });
    this.stepTwoForm = this._formBuilder.group({ age: '' });
  }
}
