import { Component } from '@angular/core';

/**
 * @title Slider Example
 */
@Component({
    selector: 'slider-basic-example',
    templateUrl: './slider-basic-example.html',
    styleUrls: ['./slider-basic-example.css'],
})
export class SliderBasicExampleComponent {
    sliderDemoValue: number = 42;
    step: number = 0.1;
}
