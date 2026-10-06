import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Inverse Example
 */
@Component({
  selector: 'slider-inverse-example',
  templateUrl: './slider-inverse-example.html',
  styleUrls: ['./slider-inverse-example.css'],
  imports: [NxLabelComponent, NxSliderComponent],
})
export class SliderInverseExampleComponent {}
