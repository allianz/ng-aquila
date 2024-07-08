import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
} from '@aposin/ng-aquila/circle-toggle';

/** @title Circle text example */
@Component({
    selector: 'circle-toggle-text-example',
    templateUrl: './circle-toggle-text-example.html',
    styleUrls: ['./circle-toggle-text-example.css'],
    standalone: true,
    imports: [NxCircleToggleGroupComponent, NgFor, NxCircleToggleComponent],
})
export class CircleToggleTextExampleComponent {
    sampleValues = [
        { value: 'A', circleText: 'Yes', selected: true },
        { value: 'B', circleText: 'No', selected: false },
    ];
}
