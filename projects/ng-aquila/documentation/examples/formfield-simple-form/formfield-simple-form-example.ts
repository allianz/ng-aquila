import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

/**
* @title Simple form example
*/
@Component({
  templateUrl: './formfield-simple-form-example.html'
})
export class FormfieldSimpleFormExampleComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormBuilder().group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      items: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}
