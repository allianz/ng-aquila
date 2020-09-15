import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
* @title Validation example
*/
@Component({
  templateUrl: './mask-validation-example.html'
})
export class MaskValidationComponent {
  validatedMaskForm: FormGroup = new FormGroup({
    maskInput: new FormControl('', {}),
  });

  unvalidatedMaskForm: FormGroup = new FormGroup({
    maskInput2: new FormControl('', {}),
  });
}
