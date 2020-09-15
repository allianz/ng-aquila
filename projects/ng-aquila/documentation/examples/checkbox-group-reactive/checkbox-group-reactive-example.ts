import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
* @title Checkbox group reactive example
*/
@Component({
  templateUrl: './checkbox-group-reactive-example.html'
})

export class CheckboxGroupReactiveExampleComponent {
  public myFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myFormGroup = this.fb.group({
      'terms': []
    });
  }
}
