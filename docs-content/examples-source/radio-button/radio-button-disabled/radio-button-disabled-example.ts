import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Disabled Example
 */
@Component({
    selector: 'radio-button-disabled-example',
    templateUrl: './radio-button-disabled-example.html',
    styleUrls: ['./radio-button-disabled-example.css'],
    standalone: true,
    imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonDisabledExampleComponent {}
