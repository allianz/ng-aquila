import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * @title Rating Reactive Example
 */
@Component({
  selector: 'nx-rating-reactive-example',
  templateUrl: './rating-reactive-example.html'
})
export class RatingReactiveExampleComponent {
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      rating: [1]
    });
  }
}
