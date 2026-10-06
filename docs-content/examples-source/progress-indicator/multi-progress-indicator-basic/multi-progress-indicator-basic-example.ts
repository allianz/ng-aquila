import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';

/**
 * @title Multi Progress Indicator basic example
 */
@Component({
  selector: 'multi-progress-indicator-basic-example',
  templateUrl: './multi-progress-indicator-basic-example.html',
  imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent],
})
export class MultiProgressIndicatorBasicExampleComponent {}
