import { NxProgressbarModule } from '@allianz/ng-aquila/progressbar';
import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Optional,
} from '@angular/core';

import { NxProgressStepperDirective } from '../progress-stepper.component';

@Component({
  selector: 'nx-single-stepper',
  templateUrl: './single-step.component.html',
  styleUrls: ['../progress-stepper.component.scss', './single-step.component.scss'],
  providers: [
    { provide: NxProgressStepperDirective, useExisting: NxSingleStepperComponent },
    { provide: CdkStepper, useExisting: NxProgressStepperDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxProgressbarModule, NgTemplateOutlet],
})
export class NxSingleStepperComponent extends NxProgressStepperDirective {
  /** Sets the label on the right showing the next step. */
  @Input('nextLabel') set rightLabel(v) {
    this._rightLabel = v;
  }
  get rightLabel(): string {
    return this._rightLabel;
  }
  private _rightLabel = 'Next step:';

  /** Overrides the `aria-label` of the nx-progressbar. Defaults to "Progress" */
  @Input() progressbarAriaLabel: string | undefined = 'Progress';

  /** Sets the `aria-labelledby` of the nx-progressbar */
  @Input('progressbarAriaLabeledBy') progressbarAriaLabeledBy: string | undefined;

  /** @docs-private */
  get progress() {
    return (this.selectedIndex + 1) / this.count;
  }

  /** @docs-private */
  get currentLabel() {
    const step = this.currentStep;
    const label = step!.stepLabel || step!.label;

    return `
    ${this.currentStepLabel} ${this.selectedIndex + 1}/${this.count}: ${label}
    `;
  }

  /** @docs-private */
  get nextLabel() {
    const step = this.nextStep;

    if (step) {
      const label = step.stepLabel || step.label;

      return `
        ${this.rightLabel} ${label}
      `;
    }

    return null;
  }

  constructor(
    _cdr: ChangeDetectorRef,
    @Optional() _dir: Directionality | null,
    _el: ElementRef<HTMLElement>,
  ) {
    super(_cdr, _dir, _el);
  }
}
