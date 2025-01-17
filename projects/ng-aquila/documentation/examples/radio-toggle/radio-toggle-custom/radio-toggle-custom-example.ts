import { Component } from '@angular/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';

/**
 * @title Custom Example
 */
@Component({
    selector: 'radio-toggle-custom-example',
    templateUrl: './radio-toggle-custom-example.html',
    styleUrls: ['./radio-toggle-custom-example.css'],
    imports: [
        NxRadioToggleComponent,
        NxRadioToggleButtonComponent,
        NxIconComponent,
    ],
})
export class RadioToggleCustomExampleComponent {}
