import { Component } from '@angular/core';

/**
 * @title Progress Indicator step completion example
 */
@Component({
    selector: 'progress-stepper-step-example',
    templateUrl: './progress-stepper-step-example.html',
    styleUrls: ['./progress-stepper-step-example.css'],
})
export class ProgressStepperStepExampleComponent {
    testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
    progress = 0.15;
}
