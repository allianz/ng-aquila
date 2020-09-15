import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
* @title Reactive example
*/
@Component({
  templateUrl: './datefield-reactive-example.html'
})

export class DatefieldReactiveExampleComponent {
  public testForm: FormGroup = new FormGroup({
    date: new FormControl('', {
      validators: Validators.required
    })
  });
}
