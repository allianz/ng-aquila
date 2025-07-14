import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxSingleStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator example
 */
@Component({
  selector: 'progress-stepper-example',
  templateUrl: './progress-stepper-example.html',
  styleUrls: ['./progress-stepper-example.css'],
  imports: [
    NxSingleStepperComponent,
    NxStepComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperExampleComponent {}
