import { Component } from '@angular/core';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Negative Styling Example
 */
@Component({
    selector: 'radio-button-negative-example',
    templateUrl: './radio-button-negative-example.html',
    styleUrls: ['./radio-button-negative-example.css'],
    standalone: true,
    imports: [NxRadioGroupComponent, NxRadioComponent],
})
export class RadioButtonNegativeExampleComponent {}
