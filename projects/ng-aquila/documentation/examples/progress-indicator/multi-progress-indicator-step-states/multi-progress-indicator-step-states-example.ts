import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Multi Progress Indicator step states example
 */
@Component({
  selector: 'multi-progress-indicator-step-states-example',
  templateUrl: './multi-progress-indicator-step-states-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxTooltipDirective,
  ],
})
export class MultiProgressIndicatorStepStatesExampleComponent {}
