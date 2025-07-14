import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxProgressStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator step completion example
 */
@Component({
  selector: 'progress-stepper-step-example',
  templateUrl: './progress-stepper-step-example.html',
  styleUrls: ['./progress-stepper-step-example.css'],
  imports: [
    NxProgressStepperComponent,
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
