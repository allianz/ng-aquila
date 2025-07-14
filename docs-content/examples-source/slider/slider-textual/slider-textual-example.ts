import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

enum FruitPreferenceType {
  NEVER,
  RARELY,
  SOMETIMES,
  OFTEN,
  ALWAYS,
}

/**
 * @title Slider Textual Example
 */
@Component({
  selector: 'slider-textual-example',
  templateUrl: './slider-textual-example.html',
  styleUrls: ['./slider-textual-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxSliderComponent,
  ],
})
export class SliderTextualExampleComponent {
  fruitPreferenceFormatter = (value: FruitPreferenceType) => {
    switch (value) {
      case FruitPreferenceType.NEVER:
        return 'I never prefer apples';
      case FruitPreferenceType.RARELY:
        return 'rarely';
      case FruitPreferenceType.SOMETIMES:
        return 'sometimes';
      case FruitPreferenceType.OFTEN:
        return 'often';
      case FruitPreferenceType.ALWAYS:
        return 'I always prefer apples';
    }
  };
  minFruitPreferenceFormatter = () => `never`;
  maxFruitPreferenceFormatter = () => `always`;
}
