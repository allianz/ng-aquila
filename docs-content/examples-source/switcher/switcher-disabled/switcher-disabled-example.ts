import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** @title Switcher Disabled Reactive Form */
@Component({
  selector: 'switcher-disabled-example',
  templateUrl: './switcher-disabled-example.html',
  styleUrls: ['./switcher-disabled-example.css']
})

export class SwitcherDisabledExampleComponent {

  checked: boolean = true;
  templateModel: boolean = false;
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.testForm.disable();
  }

  createForm() {
    this.testForm = this.fb.group({
      switcherDisabledReactive: [ false, Validators.requiredTrue ]
    });
  }

  switchStatusClick() {
    if (this.testForm.disabled) {
      this.testForm.enable();
    } else {
      this.testForm.disable();
    }
  }

}
