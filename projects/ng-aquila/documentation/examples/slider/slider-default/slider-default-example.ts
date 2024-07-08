import { Component } from '@angular/core';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Slider Default Example
 */
@Component({
    selector: 'slider-default-example',
    templateUrl: './slider-default-example.html',
    styleUrls: ['./slider-default-example.css'],
    standalone: true,
    imports: [NxSliderComponent],
})
export class SliderDefaultExampleComponent {
    sliderDemoValue = 42;
    step = 0.1;
}
