import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
* @title Checkbox group inheritance example
*/
@Component({
  selector: 'checkbox-group-inheritance-example',
  templateUrl: './checkbox-group-inheritance-example.html',
  styleUrls: ['./checkbox-group-inheritance-example.css']
})

export class CheckboxGroupInheritanceExampleComponent {
  public optionsForm: FormGroup;
  public myFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.myFormGroup = this.fb.group({
      'terms': [[]]
    });

    this.optionsForm = this.fb.group({
      isNegative: [false, null],
      isRequired: [false, null],
      isDisabled: [false, null],
      isLarge: [false, null],
      isLabelExpert: [false, null],
    });
  }

  toggleDisabled() {
    const checkboxGroup = this.myFormGroup.get('terms');
    if (checkboxGroup.disabled) {
      this.myFormGroup.get('terms').enable();
    } else {
      this.myFormGroup.get('terms').disable();
    }
  }

  toggleRequired() {
    const checkboxGroup = this.myFormGroup.get('terms');
    if (checkboxGroup.validator === Validators.required) {
      checkboxGroup.clearValidators();
    } else {
      checkboxGroup.setValidators(Validators.required);
    }
  }
}
