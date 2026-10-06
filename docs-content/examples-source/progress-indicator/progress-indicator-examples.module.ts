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
import { SingleProgressIndicatorBasicExampleComponent } from './single-progress-indicator-basic/single-progress-indicator-basic-example';
import { SingleProgressIndicatorCustomLabelExampleComponent } from './single-progress-indicator-custom-label/single-progress-indicator-custom-label-example';
import { SingleProgressIndicatorLocalizeExampleComponent } from './single-progress-indicator-localize/single-progress-indicator-localize-example';
import { SingleProgressIndicatorPositiveExampleComponent } from './single-progress-indicator-positive/single-progress-indicator-positive-example';
import { SingleProgressIndicatorWithContentExampleComponent } from './single-progress-indicator-with-content/single-progress-indicator-with-content-example';
import { SingleProgressIndicatorWithEndLabelExampleComponent } from './single-progress-indicator-with-end-label/single-progress-indicator-with-end-label-example';

const EXAMPLES = [
  SingleProgressIndicatorBasicExampleComponent,
  SingleProgressIndicatorCustomLabelExampleComponent,
  SingleProgressIndicatorWithEndLabelExampleComponent,
  SingleProgressIndicatorWithContentExampleComponent,
  SingleProgressIndicatorPositiveExampleComponent,
  SingleProgressIndicatorLocalizeExampleComponent,
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
      'single-progress-indicator-basic':
        SingleProgressIndicatorBasicExampleComponent,
      'single-progress-indicator-custom-label':
        SingleProgressIndicatorCustomLabelExampleComponent,
      'single-progress-indicator-with-end-label':
        SingleProgressIndicatorWithEndLabelExampleComponent,
      'single-progress-indicator-with-content':
        SingleProgressIndicatorWithContentExampleComponent,
      'single-progress-indicator-positive':
        SingleProgressIndicatorPositiveExampleComponent,
      'single-progress-indicator-localize':
        SingleProgressIndicatorLocalizeExampleComponent,
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
