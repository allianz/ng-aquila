import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';

/**
 * @title Multi Progress Indicator vertical-no-labels layout example
 */
@Component({
  selector: 'multi-progress-indicator-vertical-no-labels-example',
  templateUrl: './multi-progress-indicator-vertical-no-labels-example.html',
  imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent],
})
export class MultiProgressIndicatorVerticalNoLabelsExampleComponent {}
