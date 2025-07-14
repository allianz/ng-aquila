import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxSingleStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator custom label example
 */
@Component({
  selector: 'progress-stepper-custom-example',
  templateUrl: './progress-stepper-custom-example.html',
  styleUrls: ['./progress-stepper-custom-example.css'],
  imports: [
    NxSingleStepperComponent,
    NxStepComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperCustomExampleComponent {
  testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
}
