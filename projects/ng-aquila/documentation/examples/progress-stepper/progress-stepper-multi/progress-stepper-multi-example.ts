import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMultiStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator multi example
 */
@Component({
  selector: 'progress-stepper-multi-example',
  templateUrl: './progress-stepper-multi-example.html',
  styleUrls: ['./progress-stepper-multi-example.css'],
  imports: [
    NxMultiStepperComponent,
    NxStepComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperMultiExampleComponent {
  testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
}
