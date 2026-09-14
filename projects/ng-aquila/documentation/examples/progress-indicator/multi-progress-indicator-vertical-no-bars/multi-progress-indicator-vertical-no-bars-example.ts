import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multi Progress Indicator vertical-no-bars layout example
 */
@Component({
  selector: 'multi-progress-indicator-vertical-no-bars-example',
  templateUrl: './multi-progress-indicator-vertical-no-bars-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
export class MultiProgressIndicatorVerticalNoBarsExampleComponent {}
