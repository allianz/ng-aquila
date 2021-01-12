import { Component } from '@angular/core';

/**
* @title Slider Default Example
*/
@Component({
  selector: 'slider-default-example',
  templateUrl: './slider-default-example.html',
  styleUrls: ['./slider-default-example.css']
})
export class SliderDefaultExampleComponent {

  sliderDemoValue: number = 42;
  step: number = 0.1;
}
