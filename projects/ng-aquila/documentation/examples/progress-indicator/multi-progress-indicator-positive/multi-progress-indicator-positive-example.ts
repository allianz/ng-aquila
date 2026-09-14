import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';

/**
 * @title Multi Progress Indicator positive color scheme example
 */
@Component({
  selector: 'multi-progress-indicator-positive-example',
  templateUrl: './multi-progress-indicator-positive-example.html',
  imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent],
  styles: [
    `
      nx-multi-progress-indicator:first-child {
        margin-bottom: 32px;
      }
    `,
  ],
})
export class MultiProgressIndicatorPositiveExampleComponent {}
