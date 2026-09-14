import { NxProgressIndicatorModule } from '@allianz/ng-aquila/progress-indicator';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { MultiProgressIndicatorBasicExampleComponent } from './multi-progress-indicator-basic/multi-progress-indicator-basic-example';
import { MultiProgressIndicatorCurrentStepExampleComponent } from './multi-progress-indicator-current-step/multi-progress-indicator-current-step-example';
import { MultiProgressIndicatorHorizontalLabelsBelowExampleComponent } from './multi-progress-indicator-horizontal-labels-below/multi-progress-indicator-horizontal-labels-below-example';
import { MultiProgressIndicatorLocalizeExampleComponent } from './multi-progress-indicator-localize/multi-progress-indicator-localize-example';
import { MultiProgressIndicatorPositiveExampleComponent } from './multi-progress-indicator-positive/multi-progress-indicator-positive-example';
import { MultiProgressIndicatorStepStatesExampleComponent } from './multi-progress-indicator-step-states/multi-progress-indicator-step-states-example';
import { MultiProgressIndicatorUnnumberedExampleComponent } from './multi-progress-indicator-unnumbered/multi-progress-indicator-unnumbered-example';
import { MultiProgressIndicatorVerticalExampleComponent } from './multi-progress-indicator-vertical/multi-progress-indicator-vertical-example';
import { MultiProgressIndicatorVerticalNoBarsExampleComponent } from './multi-progress-indicator-vertical-no-bars/multi-progress-indicator-vertical-no-bars-example';
import { MultiProgressIndicatorVerticalNoLabelsExampleComponent } from './multi-progress-indicator-vertical-no-labels/multi-progress-indicator-vertical-no-labels-example';
import { MultiProgressIndicatorWithContentExampleComponent } from './multi-progress-indicator-with-content/multi-progress-indicator-with-content-example';

const EXAMPLES = [
  MultiProgressIndicatorBasicExampleComponent,
  MultiProgressIndicatorUnnumberedExampleComponent,
  MultiProgressIndicatorPositiveExampleComponent,
  MultiProgressIndicatorStepStatesExampleComponent,
  MultiProgressIndicatorCurrentStepExampleComponent,
  MultiProgressIndicatorWithContentExampleComponent,
  MultiProgressIndicatorHorizontalLabelsBelowExampleComponent,
  MultiProgressIndicatorVerticalExampleComponent,
  MultiProgressIndicatorVerticalNoLabelsExampleComponent,
  MultiProgressIndicatorVerticalNoBarsExampleComponent,
  MultiProgressIndicatorLocalizeExampleComponent,
];

@NgModule({
  imports: [NxProgressIndicatorModule, ExamplesSharedModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class ProgressIndicatorExamplesModule {
  static components() {
    return {
      'multi-progress-indicator-basic':
        MultiProgressIndicatorBasicExampleComponent,
      'multi-progress-indicator-unnumbered':
        MultiProgressIndicatorUnnumberedExampleComponent,
      'multi-progress-indicator-positive':
        MultiProgressIndicatorPositiveExampleComponent,
      'multi-progress-indicator-step-states':
        MultiProgressIndicatorStepStatesExampleComponent,
      'multi-progress-indicator-current-step':
        MultiProgressIndicatorCurrentStepExampleComponent,
      'multi-progress-indicator-with-content':
        MultiProgressIndicatorWithContentExampleComponent,
      'multi-progress-indicator-horizontal-labels-below':
        MultiProgressIndicatorHorizontalLabelsBelowExampleComponent,
      'multi-progress-indicator-vertical':
        MultiProgressIndicatorVerticalExampleComponent,
      'multi-progress-indicator-vertical-no-labels':
        MultiProgressIndicatorVerticalNoLabelsExampleComponent,
      'multi-progress-indicator-vertical-no-bars':
        MultiProgressIndicatorVerticalNoBarsExampleComponent,
      'multi-progress-indicator-localize':
        MultiProgressIndicatorLocalizeExampleComponent,
    };
  }
}
