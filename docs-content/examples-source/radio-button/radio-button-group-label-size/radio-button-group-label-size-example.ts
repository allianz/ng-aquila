import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Radio button group label size Example
 */
@Component({
    selector: 'radio-button-group-label-size-example',
    templateUrl: './radio-button-group-label-size-example.html',
    styleUrls: ['./radio-button-group-label-size-example.css'],
    imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonGroupLabelSizeExampleComponent {}
