import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
* @title Validation example
*/
@Component({
  templateUrl: './mask-validation-example.html'
})
export class MaskValidationExampleComponent {
  validatedMaskForm: FormGroup = new FormGroup({
    maskInput: new FormControl('', {}),
  });

  unvalidatedMaskForm: FormGroup = new FormGroup({
    maskInput2: new FormControl('', {}),
  });
}
