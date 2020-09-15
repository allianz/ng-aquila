import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/**
* @title IBAN mask example
*/
@Component({
  templateUrl: './iban-mask-example.html'
})
export class IbanMaskComponent {
  validatedMaskForm: FormGroup = new FormGroup({
    maskInput: new FormControl('', {}),
  });
}
