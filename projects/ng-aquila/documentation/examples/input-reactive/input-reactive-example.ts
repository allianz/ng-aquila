import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
* @title Reactive example
*/
@Component({
  templateUrl: './input-reactive-example.html'
})
export class InputReactiveExampleComponent {

  public testForm: FormGroup = new FormGroup({
    textfield: new FormControl('', {
      validators: Validators.required
    })
  });

}
