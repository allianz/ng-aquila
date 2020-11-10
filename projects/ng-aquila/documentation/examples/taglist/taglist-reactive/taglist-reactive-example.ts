import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * @title Tag Reactive Example
 */
@Component({
  selector: 'nx-taglist-reactive-example',
  templateUrl: './taglist-reactive-example.html'
})
export class TaglistReactiveExampleComponent {
  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      tagsTestReactive: [ [ 'Apples', 'Oranges' ], Validators.required ]
    });
  }
}
