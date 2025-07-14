import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
  selector: 'checkbox-reactive-example',
  templateUrl: './checkbox-reactive-example.html',
  styleUrls: ['./checkbox-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxCheckboxComponent,
    JsonPipe,
    NxErrorComponent,
    CommonModule,
  ],
})
export class CheckboxReactiveExampleComponent {
  readonly testForm = this.fb.group({
    checkboxTestReactive: [false, Validators.requiredTrue],
  });

  constructor(private readonly fb: FormBuilder) {}
}
