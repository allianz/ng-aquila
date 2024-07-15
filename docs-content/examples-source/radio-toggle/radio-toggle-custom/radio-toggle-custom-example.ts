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
    standalone: true,
    imports: [
        NxRadioToggleComponent,
        NxRadioToggleButtonComponent,
        NxIconComponent,
    ],
})
export class RadioToggleCustomExampleComponent {}
