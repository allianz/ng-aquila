import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';

const STEP_LABELS = [
  'Billing Address',
  'Shipping Address',
  'Review Order',
  'Payment',
];

/**
 * @title Multi Progress Indicator with step content example
 */
@Component({
  selector: 'multi-progress-indicator-with-content-example',
  templateUrl: './multi-progress-indicator-with-content-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    NxButtonComponent,
  ],
})
export class MultiProgressIndicatorWithContentExampleComponent {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  protected readonly stepCount = STEP_LABELS.length;

  protected readonly activeStep = signal(1);

  protected previous(): void {
    this._goToStep(Math.max(1, this.activeStep() - 1));
  }

  protected next(): void {
    this._goToStep(Math.min(this.stepCount, this.activeStep() + 1));
  }

  protected goToStep(step: number): void {
    this._goToStep(step);
  }

  // The "Previous"/"Next" buttons sit outside the indicator and clicking them never moves
  // focus into it, so a screen reader user gets no feedback that the step changed - announce
  // it explicitly instead. Also covers jumping to a step directly via its own action.
  private _goToStep(step: number): void {
    this.activeStep.set(step);
    this._liveAnnouncer.announce(
      `Now on Step ${step}: ${STEP_LABELS[step - 1]}`,
    );
  }
}
