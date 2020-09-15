import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
* @title Reactive disabled example
*/
@Component({
  templateUrl: './circle-toggle-reactive-disabled-example.html'
})
export class CircleToggleReactiveDisabledExampleComponent {

  testForm = this.formBuilder.group({
    reactiveToggle: ['', Validators.required]
  });

  sampleValues = [{value: 'A', icon: 'product-heart', hint: 'Hint A', label: 'Label A', selected: false},
    {value: 'B', icon: 'product-bed', hint: 'Hint B', label: 'Label B', selected: true},
    {value: 'C', icon: 'product-bike', hint: 'Hint C', label: 'Label C', selected: false},
  ];

  constructor(private formBuilder: FormBuilder) {
    this.testForm.disable();
  }

  switchStatusClick() {
    if (this.testForm.disabled) {
      this.testForm.enable();
    } else {
      this.testForm.disable();
    }
  }

}
