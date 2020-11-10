import { Component } from '@angular/core';

/**
* @title Slider Example
*/
@Component({
  selector: 'nx-slider-basic-example',
  templateUrl: './slider-basic-example.html'
})
export class SliderBasicExampleComponent {
  sliderDemoValue: number = 42;
  step: number = 0.1;
}
