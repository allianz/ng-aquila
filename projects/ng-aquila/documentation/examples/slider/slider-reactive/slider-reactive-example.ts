import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Slider Reactive Form Example
 */
@Component({
    selector: 'slider-reactive-example',
    templateUrl: './slider-reactive-example.html',
    styleUrls: ['./slider-reactive-example.css'],
    imports: [FormsModule, ReactiveFormsModule, NxSliderComponent, JsonPipe],
})
export class SliderReactiveExampleComponent {
    readonly testForm = this.fb.group({
        sliderTestReactive: [10, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
