import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

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
    standalone: true,
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
