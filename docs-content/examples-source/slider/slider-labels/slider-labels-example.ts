import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider hidden Min/Max Labels Example
 */
@Component({
  selector: 'slider-labels-example',
  templateUrl: './slider-labels-example.html',
  styleUrls: ['./slider-labels-example.css'],
  imports: [NxLabelComponent, NxSliderComponent],
})
export class SliderLabelsExampleComponent {}
