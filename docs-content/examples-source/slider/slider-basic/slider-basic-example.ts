import { Component } from '@angular/core';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Slider Example
 */
@Component({
    selector: 'slider-basic-example',
    templateUrl: './slider-basic-example.html',
    styleUrls: ['./slider-basic-example.css'],
    imports: [NxSliderComponent],
})
export class SliderBasicExampleComponent {
    sliderDemoValue = 42;
    step = 0.1;
}
