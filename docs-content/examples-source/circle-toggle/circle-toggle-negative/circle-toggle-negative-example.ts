import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'circle-toggle-negative-example',
    templateUrl: './circle-toggle-negative-example.html',
    styleUrls: ['./circle-toggle-negative-example.css'],
})
export class CircleToggleNegativeExampleComponent {
    negative = true;

    sampleValues = [
        {
            value: 'A',
            icon: 'product-heart',
            hint: 'Hint A',
            label: 'Label A',
            selected: false,
        },
        {
            value: 'B',
            icon: 'product-car',
            hint: 'Hint B',
            label: 'Label B',
            selected: true,
        },
        {
            value: 'C',
            icon: 'product-plane',
            hint: 'Hint C',
            label: 'Label C',
            selected: false,
        },
    ];

    changeStyle() {
        this.negative = !this.negative;
    }
}
