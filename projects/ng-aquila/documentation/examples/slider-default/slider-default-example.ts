import { Component } from '@angular/core';

/**
* @title Slider Default Example
*/
@Component({
  selector: 'nx-slider-default-example',
  templateUrl: './slider-default-example.html'
})
export class SliderDefaultExampleComponent {

  sliderDemoValue: number = 42;
  step: number = 0.1;
}
