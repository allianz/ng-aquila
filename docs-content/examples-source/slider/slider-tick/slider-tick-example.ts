import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Slider Tick Example
 */
@Component({
  selector: 'slider-tick-example',
  templateUrl: './slider-tick-example.html',
  styleUrls: ['./slider-tick-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxSliderComponent,
  ],
})
export class SliderTickExampleComponent {
  sliderDemoValue = 40;
  step = 8;
  interval = 1;
  min = 0;
  max = 100;
  longTicksString = '16,32,48,64,80,96';
  longTicks: number[] = [16, 32, 48, 64, 80, 96];

  toArray() {
    this.longTicks = this.longTicksString
      .split(',')
      .reduce((acc: number[], v) => {
        const val = parseInt(v, 10);
        if (!isNaN(val)) {
          acc.push(val);
        }

        return acc;
      }, []);
  }
}
