import { Component } from '@angular/core';

/**
 * @title Margin sizes
 */
@Component({
    selector: 'margin-sizes-example',
    templateUrl: './margin-sizes-example.html',
    styleUrls: ['./margin-sizes-example.css'],
})
export class MarginSizesExampleComponent {
    marginSizes = {
        '0': 0,
        '3xs': 4,
        '2xs': 8,
        xs: 12,
        s: 16,
        m: 24,
        '2m': 32,
        '3m': 40,
        '4m': 48,
        l: 56,
        xl: 64,
        '2xl': 72,
        '3xl': 80,
        '4xl': 88,
        '5xl': 96,
    };

    returnZero() {
        return 0;
    }
}
