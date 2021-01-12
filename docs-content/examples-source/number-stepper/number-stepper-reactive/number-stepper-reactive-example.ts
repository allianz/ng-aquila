import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
* @title Reactive example
*/
@Component({
  selector: 'number-stepper-reactive-example',
  templateUrl: './number-stepper-reactive-example.html',
  styleUrls: ['./number-stepper-reactive-example.css']
})
export class NumberStepperReactiveExampleComponent {
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      stepperTestReactive: 3
    });
  }
}
