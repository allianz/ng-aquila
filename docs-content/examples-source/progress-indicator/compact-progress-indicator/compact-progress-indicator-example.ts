import {
  NxCompactProgressIndicatorComponent,
  NxMultiProgressStepComponent,
  NxProgressIndicatorStepActionComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Compact Progress Indicator example
 */
@Component({
  selector: 'compact-progress-indicator-example',
  templateUrl: './compact-progress-indicator-example.html',
  imports: [
    NxCompactProgressIndicatorComponent,
    NxMultiProgressStepComponent,
    NxProgressIndicatorStepActionComponent,
    RouterLink,
  ],
})
export class CompactProgressIndicatorExampleComponent {
  currentStep = 4;
}
