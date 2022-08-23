import { Component } from '@angular/core';

/**
 * @title Slider Tick Example
 */
@Component({
    selector: 'slider-tick-example',
    templateUrl: './slider-tick-example.html',
    styleUrls: ['./slider-tick-example.css'],
})
export class SliderTickExampleComponent {
    sliderDemoValue = 40;
    step = 8;
    interval = 1;
    min = 0;
    max = 100;
}
