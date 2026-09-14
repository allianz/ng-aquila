import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multi Progress Indicator currentStep example
 */
@Component({
  selector: 'multi-progress-indicator-current-step-example',
  templateUrl: './multi-progress-indicator-current-step-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    NxButtonComponent,
    RouterLink,
  ],
})
export class MultiProgressIndicatorCurrentStepExampleComponent {
  private readonly _stepCount = 5;

  protected readonly activeStep = signal(2);

  protected previous(): void {
    this.activeStep.update((step) => Math.max(1, step - 1));
  }

  protected next(): void {
    this.activeStep.update((step) => Math.min(this._stepCount, step + 1));
  }
}
