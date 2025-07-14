import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Reactive Example
 */
@Component({
  selector: 'radio-button-reactive-example',
  templateUrl: './radio-button-reactive-example.html',
  styleUrls: ['./radio-button-reactive-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxRadioGroupComponent,
    NxLabelComponent,
    NxRadioComponent,
    JsonPipe,
  ],
})
export class RadioButtonReactiveExampleComponent {
  readonly testForm = this.fb.group({
    radioTestReactive: ['oranges', Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
