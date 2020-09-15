import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
* @title Reactive example
*/
@Component({
  templateUrl: './checkbox-reactive-example.html'
})

export class CheckboxReactiveExampleComponent {
  public testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      checkboxTestReactive: [false, Validators.requiredTrue]
    });
  }
}
