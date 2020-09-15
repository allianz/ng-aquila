import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

/**
* @title Disabled as part of disabled form example
*/
@Component({
  templateUrl: './number-stepper-disabled-implicit-example.html'
})
export class NumberStepperDisabledImplicitExampleComponent {

  fb = new FormGroup({
    amount: new FormControl({value: '', disabled: true})
  });
}
