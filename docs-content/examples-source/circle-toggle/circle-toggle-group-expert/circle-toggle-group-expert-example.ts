import { Component } from '@angular/core';

/**
 * @title Circle toggle group expert default example
 */
@Component({
    selector: 'circle-toggle-group-expert-example',
    templateUrl: './circle-toggle-group-expert-example.html',
    styleUrls: ['./circle-toggle-group-expert-example.css'],
})
export class CircleToggleGroupExpertExampleComponent {
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
