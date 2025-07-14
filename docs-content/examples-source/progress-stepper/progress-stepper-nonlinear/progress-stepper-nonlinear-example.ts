import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMultiStepperComponent,
  NxStepComponent,
  NxStepperNextDirective,
  NxStepperPreviousDirective,
} from '@allianz/ng-aquila/progress-stepper';
import { Component } from '@angular/core';

/**
 * @title Progress Indicator non linear step completion example
 */
@Component({
  selector: 'progress-stepper-nonlinear-example',
  templateUrl: './progress-stepper-nonlinear-example.html',
  styleUrls: ['./progress-stepper-nonlinear-example.css'],
  imports: [
    NxMultiStepperComponent,
    NxStepComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxStepperNextDirective,
  ],
})
export class ProgressStepperNonlinearExampleComponent {
  multiSteps = [
    {
      name: 'Lorem',
      completed: false,
    },
    {
      name: 'Ipsum',
      completed: false,
    },
    {
      name: 'Dolar',
      completed: false,
    },
  ];

  completeStep(i: number) {
    this.multiSteps[i].completed = !this.multiSteps[i].completed;
  }
}
