import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider Disabled Example
 */
@Component({
  selector: 'slider-disabled-example',
  templateUrl: './slider-disabled-example.html',
  styleUrls: ['./slider-disabled-example.css'],
  imports: [NxLabelComponent, NxSliderComponent],
})
export class SliderDisabledExampleComponent {}
