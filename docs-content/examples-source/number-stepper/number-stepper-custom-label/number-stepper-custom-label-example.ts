import { Component } from '@angular/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Custom label example
 */
@Component({
    selector: 'number-stepper-custom-label-example',
    templateUrl: './number-stepper-custom-label-example.html',
    styleUrls: ['./number-stepper-custom-label-example.css'],
    standalone: true,
    imports: [
        NxNumberStepperComponent,
        NxIconComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
    ],
})
export class NumberStepperCustomLabelExampleComponent {}
