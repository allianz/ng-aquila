import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
} from '@aposin/ng-aquila/circle-toggle';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'circle-toggle-negative-example',
    templateUrl: './circle-toggle-negative-example.html',
    styleUrls: ['./circle-toggle-negative-example.css'],
    standalone: true,
    imports: [
        NxCircleToggleGroupComponent,
        NgFor,
        NxCircleToggleComponent,
        NxButtonComponent,
    ],
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
