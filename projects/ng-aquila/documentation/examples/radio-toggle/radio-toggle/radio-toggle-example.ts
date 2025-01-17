import { Component } from '@angular/core';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';

/**
 * @title Toggle Button Example
 */
@Component({
    selector: 'radio-toggle-example',
    templateUrl: './radio-toggle-example.html',
    styleUrls: ['./radio-toggle-example.css'],
    imports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
})
export class RadioToggleExampleComponent {}
