import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxProgressStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Progress Indicator step completion example
 */
@Component({
    selector: 'progress-stepper-step-example',
    templateUrl: './progress-stepper-step-example.html',
    styleUrls: ['./progress-stepper-step-example.css'],
    standalone: true,
    imports: [
        NxProgressStepperComponent,
        NgFor,
        NxStepComponent,
        NxSliderComponent,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
    ],
})
export class ProgressStepperStepExampleComponent {
    testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
    progress = 0.15;
}
