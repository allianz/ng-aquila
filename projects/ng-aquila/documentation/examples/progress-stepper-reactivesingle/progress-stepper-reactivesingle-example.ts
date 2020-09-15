import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

/**
* @title Progress Indicator reactive form with single form example
*/
@Component({
  templateUrl: './progress-stepper-reactivesingle-example.html',
  styleUrls: ['./progress-stepper-reactivesingle-example.css']
})
export class ProgressStepperReactivesingleExampleComponent {
  testForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.testForm = this._formBuilder.group({
      personalDetails: new FormGroup({
        name: new FormControl('', {
          validators: Validators.required
        }),
        age: new FormControl('', {
          validators: Validators.required
        })
      }),
      address: new FormGroup({
        street: new FormControl('', {
          validators: Validators.required
        }),
        postalCode: new FormControl('', {
          validators: Validators.required
        })
      })
    });
  }

}
