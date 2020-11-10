import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
* @title Multiple errors example
*/
@Component({
  templateUrl: './formfield-multiple-errors-example.html'
})
export class FormfieldMultipleErrorsExampleComponent {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
