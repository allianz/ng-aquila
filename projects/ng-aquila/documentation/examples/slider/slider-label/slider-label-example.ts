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
    euroSliderDemoValue = 0;
    euroValueFormatter = (value: string | number) =>
        `${Number(value).toFixed(2)} €`;
    minEuroFormatter = (value: number) => `min. ${value} €`;
    maxEuroFormatter = (value: number) => `max. ${value} €`;
}
