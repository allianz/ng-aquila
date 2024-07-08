import { Component } from '@angular/core';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';

/**
 * @title Negative Styling Example
 */
@Component({
    selector: 'radio-toggle-negative-example',
    templateUrl: './radio-toggle-negative-example.html',
    styleUrls: ['./radio-toggle-negative-example.css'],
    standalone: true,
    imports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
})
export class RadioToggleNegativeExampleComponent {}
