import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
* @title Reactive Form Example
*/
@Component({
  selector: 'radio-toggle-reactive-example',
  templateUrl: './radio-toggle-reactive-example.html',
  styleUrls: ['./radio-toggle-reactive-example.css']
})
export class RadioToggleReactiveExampleComponent {

  data = ['A', 'B', 'C'];
  testForm: FormGroup;
  disabledToggleForm: FormGroup;
  isToggleDisabled: boolean = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.disabledToggleForm = this.fb.group({
      disabledToggle: [{ value: 'B', disabled: true}]
    });
  }

  createForm() {
    this.testForm = this.fb.group({
      testToggle: ['B', Validators.required]
    });
  }

  toggleDisabled() {
    this.isToggleDisabled = !this.isToggleDisabled;
    if (this.isToggleDisabled) {
      this.testForm.get('testToggle').disable();
    } else {
      this.testForm.get('testToggle').enable();
    }
  }

}
