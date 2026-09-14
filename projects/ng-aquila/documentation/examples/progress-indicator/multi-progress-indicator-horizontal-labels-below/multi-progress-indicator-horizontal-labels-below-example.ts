import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multi Progress Indicator horizontal-labels-below layout example
 */
@Component({
  selector: 'multi-progress-indicator-horizontal-labels-below-example',
  templateUrl:
    './multi-progress-indicator-horizontal-labels-below-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
export class MultiProgressIndicatorHorizontalLabelsBelowExampleComponent {}
