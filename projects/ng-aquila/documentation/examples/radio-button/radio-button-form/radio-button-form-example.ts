import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Template Driven Examples
 */
@Component({
    selector: 'radio-button-form-example',
    templateUrl: './radio-button-form-example.html',
    styleUrls: ['./radio-button-form-example.css'],
    imports: [
        FormsModule,
        NxRadioGroupComponent,
        NxLabelComponent,
        NxRadioComponent,
    ],
})
export class RadioButtonFormExampleComponent {
    templateModel = 'apples';
}
