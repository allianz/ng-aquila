import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';

/**
 * @title Template Driven Form Example
 */
@Component({
    selector: 'radio-toggle-form-example',
    templateUrl: './radio-toggle-form-example.html',
    styleUrls: ['./radio-toggle-form-example.css'],
    imports: [
        FormsModule,
        NxRadioToggleComponent,
        NxRadioToggleButtonComponent,
    ],
})
export class RadioToggleFormExampleComponent {
    testSelect = 'B';
}
