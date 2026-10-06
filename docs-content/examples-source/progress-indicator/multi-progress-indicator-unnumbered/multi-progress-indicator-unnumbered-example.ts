import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multi Progress Indicator unnumbered example
 */
@Component({
  selector: 'multi-progress-indicator-unnumbered-example',
  templateUrl: './multi-progress-indicator-unnumbered-example.html',
  imports: [
    NxMultiProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
export class MultiProgressIndicatorUnnumberedExampleComponent {}
