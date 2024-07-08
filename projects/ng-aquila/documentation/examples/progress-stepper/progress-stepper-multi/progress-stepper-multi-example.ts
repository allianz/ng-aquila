import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxMultiStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator multi example
 */
@Component({
    selector: 'progress-stepper-multi-example',
    templateUrl: './progress-stepper-multi-example.html',
    styleUrls: ['./progress-stepper-multi-example.css'],
    standalone: true,
    imports: [
        NxMultiStepperComponent,
        NgFor,
        NxStepComponent,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
    ],
})
export class ProgressStepperMultiExampleComponent {
    testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
}
