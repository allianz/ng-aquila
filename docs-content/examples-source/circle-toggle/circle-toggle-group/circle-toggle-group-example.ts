import { Component } from '@angular/core';

/**
 * @title Circle Toggle group example
 */
@Component({
    selector: 'circle-toggle-group-example',
    templateUrl: './circle-toggle-group-example.html',
    styleUrls: ['./circle-toggle-group-example.css'],
})
export class CircleToggleGroupExampleComponent {
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
}
