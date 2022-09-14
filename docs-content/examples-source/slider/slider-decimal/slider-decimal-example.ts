import { Component } from '@angular/core';

/**
 * @title Slider Decimal Example
 */
@Component({
    selector: 'slider-decimal-example',
    templateUrl: './slider-decimal-example.html',
    styleUrls: ['./slider-decimal-example.css'],
})
export class SliderDecimalExampleComponent {
    step = 0.1;
    floatSliderDemoValue = 1;
}
