import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multi Progress Indicator vertical layout example
 */
@Component({
  selector: 'multi-progress-indicator-vertical-example',
  templateUrl: './multi-progress-indicator-vertical-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
export class MultiProgressIndicatorVerticalExampleComponent {}
