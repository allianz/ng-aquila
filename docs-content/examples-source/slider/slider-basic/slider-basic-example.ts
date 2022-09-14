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
    sliderDemoValue = 42;
    step = 0.1;
}
