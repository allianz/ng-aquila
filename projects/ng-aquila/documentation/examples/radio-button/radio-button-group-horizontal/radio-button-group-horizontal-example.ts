import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/** @title Radio Button Group Horizontal Example */
@Component({
    selector: 'radio-button-group-horizontal-example',
    templateUrl: './radio-button-group-horizontal-example.html',
    styleUrls: ['./radio-button-group-horizontal-example.css'],
    imports: [
        NxRadioGroupComponent,
        NxLabelComponent,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxRadioComponent,
    ],
})
export class RadioButtonGroupHorizontalExampleComponent {}
