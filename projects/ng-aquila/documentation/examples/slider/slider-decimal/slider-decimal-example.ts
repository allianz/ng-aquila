import { Component } from '@angular/core';

/**
* @title Slider Decimal Example
*/
@Component({
  selector: 'nx-slider-decimal-example',
  templateUrl: './slider-decimal-example.html'
})
export class SliderDecimalExampleComponent {
  step: number = 0.1;
  floatSliderDemoValue: number = 1;
}
