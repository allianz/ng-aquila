import { NxProgressbarModule } from '@allianz/ng-aquila/progressbar';
import { clamp } from '@allianz/ng-aquila/utils';
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
  /** Overrides the `aria-label` of the nx-progressbar. Defaults to "Progress" */
  @Input() progressbarAriaLabel: string | undefined = 'Progress';

  /** Sets the `aria-labelledby` of the nx-progressbar */
  @Input() progressbarAriaLabeledBy: string | undefined;

  /** Sets the current value/progress of the progress bar. */
  @Input() set progress(value: number) {
    this._progress = clamp(value || 0);
  }
  get progress(): number {
    return this._progress;
  }
  private _progress = 0;

  constructor(
    _cdr: ChangeDetectorRef,
    @Optional() _dir: Directionality | null,
    _el: ElementRef<HTMLElement>,
  ) {
    super(_cdr, _dir, _el);
  }
}
