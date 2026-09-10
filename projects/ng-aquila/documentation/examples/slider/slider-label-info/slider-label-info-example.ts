import {
  NxLabelComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Slider with label info icon
 */
@Component({
  selector: 'slider-label-info-example',
  templateUrl: './slider-label-info-example.html',
  styleUrls: ['./slider-label-info-example.css'],
  imports: [
    NxSliderComponent,
    NxLabelComponent,
    NxLabelInfoDirective,
    NxInfoIconComponent,
  ],
})
export class SliderLabelInfoExampleComponent {
  sliderDemoValue = 40;
}
