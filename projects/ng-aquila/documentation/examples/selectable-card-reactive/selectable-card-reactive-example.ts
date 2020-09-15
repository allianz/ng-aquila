import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
* @title Selectable cards reactive example
*/
@Component({
  templateUrl: './selectable-card-reactive-example.html'
})
export class SelectableCardReactiveExampleComponent {
  public testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      selectableCardTestReactive: [false, Validators.requiredTrue]
    });
  }
}
