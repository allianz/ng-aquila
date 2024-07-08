import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
} from '@aposin/ng-aquila/circle-toggle';

/**
 * @title Disable responsive example
 */
@Component({
    selector: 'circle-toggle-responsive-example',
    templateUrl: './circle-toggle-responsive-example.html',
    styleUrls: ['./circle-toggle-responsive-example.css'],
    standalone: true,
    imports: [NxCircleToggleGroupComponent, NgFor, NxCircleToggleComponent],
})
export class CircleToggleResponsiveExampleComponent {
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

    logMessage(event: Event) {
        console.log(`toggle-circle changed to value: ` + event);
    }
}
