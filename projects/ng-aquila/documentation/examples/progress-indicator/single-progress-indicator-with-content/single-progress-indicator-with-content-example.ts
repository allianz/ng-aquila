import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxSingleProgressIndicatorComponent } from '@allianz/ng-aquila/progress-indicator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, computed, inject, signal } from '@angular/core';

const STEPS = [
  { label: 'Address', content: 'Please enter your address.' },
  { label: 'Personal details', content: 'Please enter your personal details.' },
  { label: 'Claim details', content: 'Please describe your claim.' },
  {
    label: 'Summary',
    content: 'Please review your claim before submitting it.',
  },
];

/**
 * @title Single Progress Indicator with step content example
 */
@Component({
  selector: 'single-progress-indicator-with-content-example',
  templateUrl: './single-progress-indicator-with-content-example.html',
  imports: [NxSingleProgressIndicatorComponent, NxButtonComponent],
})
export class SingleProgressIndicatorWithContentExampleComponent {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  protected readonly stepCount = STEPS.length;

  protected readonly activeStep = signal(1);

  protected readonly currentStep = computed(() => STEPS[this.activeStep() - 1]);

  protected previous(): void {
    this._goToStep(Math.max(1, this.activeStep() - 1));
  }

  protected next(): void {
    this._goToStep(Math.min(this.stepCount, this.activeStep() + 1));
  }

  // Needed because the steps change in place: there is no navigation to announce the change for us.
  private _goToStep(step: number): void {
    this.activeStep.set(step);
    this._liveAnnouncer.announce(
      `Now on Step ${step}: ${STEPS[step - 1].label}`,
    );
  }
}
