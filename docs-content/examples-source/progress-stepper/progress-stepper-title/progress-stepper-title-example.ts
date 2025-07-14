import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxSingleStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator title example
 */
@Component({
  selector: 'progress-stepper-title-example',
  templateUrl: './progress-stepper-title-example.html',
  styleUrls: ['./progress-stepper-title-example.css'],
  imports: [
    NxSingleStepperComponent,
    NxLabelComponent,
    NxStepComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperTitleExampleComponent {
  testStepsData = ['Lorem', 'Ipsum', 'Dolar'];
}
