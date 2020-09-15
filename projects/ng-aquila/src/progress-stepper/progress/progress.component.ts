import { clamp } from '@aposin/ng-aquila/utils';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NxProgressStepperDirective } from '../progress-stepper.component';

@Component({
  selector: 'nx-progress-stepper',
  templateUrl: 'progress.component.html',
  styleUrls: ['../progress-stepper.component.scss', './progress.component.scss'],
  providers: [{provide: NxProgressStepperDirective, useExisting: NxProgressStepperComponent}],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxProgressStepperComponent extends NxProgressStepperDirective {

  /** Sets the current value/progress of the progress bar. */
  @Input()
  get progress(): number { return this._progress; }
  set progress(value: number) { this._progress = clamp(value || 0); }
  private _progress: number = 0;
}
