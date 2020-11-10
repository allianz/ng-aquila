import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

/**
* @title Extended example
*/
@Component({
  templateUrl: './natural-language-form-extended-example.html'
})
export class NaturalLanguageFormExtendedExampleComponent {
  naturalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.naturalForm = this.fb.group({
      who: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      city: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      spots: new FormControl(
        '',
        [
          Validators.pattern('[0-9]*'),
          Validators.required
        ]
      )
      }
    );
  }

  validate() {
    Object.keys(this.naturalForm.controls).forEach(field => {
      const control = this.naturalForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
