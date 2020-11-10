import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
* @title Reactive example
*/
@Component({
  templateUrl: './number-stepper-reactive-example.html'
})
export class NumberStepperReactiveExampleComponent {
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      stepperTestReactive: 3
    });
  }
}
