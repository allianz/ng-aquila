import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** @title Switcher Reactive Form */
@Component({
  templateUrl: './switcher-reactive-form-example.html'
})

export class SwitcherReactiveFormExampleComponent {

  testForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      switcherTestReactive: [ false, Validators.requiredTrue ]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
  }
}
