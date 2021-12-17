import { Component } from '@angular/core';

/**
 * @title Slider Label Example
 */
@Component({
    selector: 'slider-label-example',
    templateUrl: './slider-label-example.html',
    styleUrls: ['./slider-label-example.css'],
})
export class SliderLabelExampleComponent {
    euroSliderDemoValue: number = 0;
    euroValueFormatter: Function = (value: string | number) =>
        `${Number(value).toFixed(2)} €`;
    minEuroFormatter: Function = (value: number) => `min. ${value} €`;
    maxEuroFormatter: Function = (value: number) => `max. ${value} €`;
}
