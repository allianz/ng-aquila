import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Slider Reactive Form Example
 */
@Component({
  selector: 'slider-reactive-example',
  templateUrl: './slider-reactive-example.html',
  styleUrls: ['./slider-reactive-example.css'],
  imports: [
    NxErrorComponent,
    NxButtonComponent,
    NxLabelComponent,
    FormsModule,
    ReactiveFormsModule,
    NxSliderComponent,
    JsonPipe,
  ],
})
export class SliderReactiveExampleComponent {
  readonly testForm = this.fb.group({
    sliderTestReactive: [10, [Validators.required, Validators.min(40)]],
  });

  constructor(private readonly fb: FormBuilder) {}
}
