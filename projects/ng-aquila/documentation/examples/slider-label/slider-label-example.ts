import { Component } from '@angular/core';

/**
* @title Slider Label Example
*/
@Component({
  selector: 'nx-slider-label-example',
  templateUrl: './slider-label-example.html'
})
export class SliderLabelExampleComponent {
  euroSliderDemoValue: number = 0;
  euroValueFormatter: Function = (value) => `${Number(value).toFixed(2)} €`;
  minEuroFormatter: Function = (value) => `min. ${value} €`;
  maxEuroFormatter: Function = (value) => `max. ${value} €`;

}
