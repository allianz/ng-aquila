import { NxProgressbarModule } from '@allianz/ng-aquila/progressbar';
import { clamp } from '@allianz/ng-aquila/utils';
import { CdkStepper } from '@angular/cdk/stepper';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
  numberAttribute,
} from '@angular/core';

import { NxProgressStepperDirective } from '../progress-stepper.component';
import { NxProgressStepperIntl } from '../progress-stepper-intl';

@Component({
  selector: 'nx-progress-stepper',
  templateUrl: 'progress.component.html',
  styleUrls: ['../progress-stepper.component.scss', './progress.component.scss'],
  providers: [
    { provide: NxProgressStepperDirective, useExisting: NxProgressStepperComponent },
    { provide: CdkStepper, useExisting: NxProgressStepperDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxProgressbarModule, NgTemplateOutlet],
})
export class NxProgressStepperComponent extends NxProgressStepperDirective {
  private readonly _intl = inject(NxProgressStepperIntl);

  /** Overrides the `aria-label` of the nx-progressbar. Defaults to "Progress" */
  readonly progressbarAriaLabel = input<string | undefined>('Progress');

  /** Sets the `aria-labelledby` of the nx-progressbar */
  readonly progressbarAriaLabeledBy = input<string>();

  /** Sets the current value/progress of the progress bar. */
  @Input({ transform: numberAttribute }) set progress(value: number) {
    this._progress = clamp(value || 0);
  }
  get progress(): number {
    return this._progress;
  }
  private _progress = 0;

  // Same condition as the `--inactive` class in the template.
  protected _stateLabel(index: number): string {
    if (index === this.selectedIndex) {
      return this._intl.currentLabel();
    }
    return this.steps.get(index)?.completed
      ? this._intl.completedLabel()
      : this._intl.notCompletedLabel();
  }
}
