import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Slider Decimal Example
 */
@Component({
  selector: 'slider-decimal-example',
  templateUrl: './slider-decimal-example.html',
  styleUrls: ['./slider-decimal-example.css'],
  imports: [
    NxSliderComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
  ],
})
export class SliderDecimalExampleComponent {
  step = 0.1;
  floatSliderDemoValue = 1;
}
