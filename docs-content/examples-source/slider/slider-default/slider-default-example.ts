import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider Default Example
 */
@Component({
  selector: 'slider-default-example',
  templateUrl: './slider-default-example.html',
  styleUrls: ['./slider-default-example.css'],
  imports: [NxSliderComponent],
})
export class SliderDefaultExampleComponent {
  sliderDemoValue = 42;
  step = 0.1;
}
