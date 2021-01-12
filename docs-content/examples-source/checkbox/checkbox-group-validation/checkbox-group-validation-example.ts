import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
* @title Checkbox group validation example
*/
@Component({
  selector: 'checkbox-group-validation-example',
  templateUrl: './checkbox-group-validation-example.html',
  styleUrls: ['./checkbox-group-validation-example.css']
})

export class CheckboxGroupValidationExampleComponent {
  public myFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = this.fb.group({
      'terms': [[], [Validators.required, this.validateCheckboxes]]
    });
  }

  private validateCheckboxes(formGroup: FormGroup) {
    if (formGroup.value.length <= 2) {
      return {
        min: false
      };
    } else {
      return null;
    }
  }
}
