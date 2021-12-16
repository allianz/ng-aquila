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
})
export class SliderTextualExampleComponent {
    fruitPreferenceFormatter: Function = (value: FruitPreferenceType) => {
        switch (value) {
            case FruitPreferenceType.NEVER:
                return 'never';
            case FruitPreferenceType.RARELY:
                return 'rarely';
            case FruitPreferenceType.SOMETIMES:
                return 'sometimes';
            case FruitPreferenceType.OFTEN:
                return 'often';
            case FruitPreferenceType.ALWAYS:
                return 'always';
        }
    };
    minFruitPreferenceFormatter: Function = () => `never`;
    maxFruitPreferenceFormatter: Function = () => `always`;
}
