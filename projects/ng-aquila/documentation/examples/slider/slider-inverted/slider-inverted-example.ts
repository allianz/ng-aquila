import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider Inverted Example
 */
@Component({
  selector: 'slider-inverted-example',
  templateUrl: './slider-inverted-example.html',
  styleUrls: ['./slider-inverted-example.css'],
  imports: [NxLabelComponent, NxSliderComponent],
})
export class SliderInvertedExampleComponent {}
