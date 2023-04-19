import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Slider Reactive Form Example
 */
@Component({
    selector: 'slider-reactive-example',
    templateUrl: './slider-reactive-example.html',
    styleUrls: ['./slider-reactive-example.css'],
})
export class SliderReactiveExampleComponent {
    readonly testForm = this.fb.group({
        sliderTestReactive: [10, Validators.required],
    });

    constructor(private readonly fb: FormBuilder) {}
}
