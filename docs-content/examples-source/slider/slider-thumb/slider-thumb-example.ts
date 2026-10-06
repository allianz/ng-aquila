import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider Thumb Example
 */
@Component({
  selector: 'slider-thumb-example',
  templateUrl: './slider-thumb-example.html',
  styleUrls: ['./slider-thumb-example.css'],
  imports: [NxLabelComponent, NxSliderComponent],
})
export class SliderThumbExampleComponent {}
