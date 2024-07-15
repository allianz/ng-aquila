import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Group Examples
 */
@Component({
    selector: 'radio-button-group-example',
    templateUrl: './radio-button-group-example.html',
    styleUrls: ['./radio-button-group-example.css'],
    standalone: true,
    imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonGroupExampleComponent {}
