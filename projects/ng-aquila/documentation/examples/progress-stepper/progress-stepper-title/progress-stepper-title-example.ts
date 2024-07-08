import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxSingleStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator title example
 */
@Component({
    selector: 'progress-stepper-title-example',
    templateUrl: './progress-stepper-title-example.html',
    styleUrls: ['./progress-stepper-title-example.css'],
    standalone: true,
    imports: [
        NxSingleStepperComponent,
        NxLabelComponent,
        NgFor,
        NxStepComponent,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
    ],
})
export class ProgressStepperTitleExampleComponent {
    testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
}
