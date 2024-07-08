import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxSingleStepperComponent,
    NxStepComponent,
    NxStepperNextDirective,
    NxStepperPreviousDirective,
} from '@aposin/ng-aquila/progress-stepper';

/**
 * @title Progress Indicator example
 */
@Component({
    selector: 'progress-stepper-example',
    templateUrl: './progress-stepper-example.html',
    styleUrls: ['./progress-stepper-example.css'],
    standalone: true,
    imports: [
        NxSingleStepperComponent,
        NxStepComponent,
        NxButtonComponent,
        NxStepperPreviousDirective,
        NxStepperNextDirective,
    ],
})
export class ProgressStepperExampleComponent {}
