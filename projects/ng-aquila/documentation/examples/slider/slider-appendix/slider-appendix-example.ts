import { Component } from '@angular/core';

/**
 * @title Slider Appendix Example
 */
@Component({
    selector: 'slider-appendix-example',
    templateUrl: './slider-appendix-example.html',
    styleUrls: ['./slider-appendix-example.css'],
})
export class SliderAppendixExampleComponent {
    popoverMaxWidth = '400px';
    sliderDemoValue = 40;
    step = 8;
    interval = 1;
    min = 0;
    max = 100;
    longTicks: number[] = [16, 32, 48, 64, 80, 96];
}
