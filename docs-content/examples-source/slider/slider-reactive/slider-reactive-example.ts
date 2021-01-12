import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Slider Reactive Form Example
 */
@Component({
  selector: 'slider-reactive-example',
  templateUrl: './slider-reactive-example.html',
  styleUrls: ['./slider-reactive-example.css']
})
export class SliderReactiveExampleComponent {

  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      sliderTestReactive: [10, Validators.required]
    });
  }
}
