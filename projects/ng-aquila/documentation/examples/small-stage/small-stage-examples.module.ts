import { NxSmallStageModule } from '@aposin/ng-aquila/small-stage';

import { NgModule } from '@angular/core';
import { SmallStageContentVariationExampleComponent } from './small-stage-content-variation/small-stage-content-variation-example';
import { SmallStageDefaultExampleComponent } from './small-stage-default/small-stage-default-example';
import { SmallStageImageOffsetExampleComponent } from './small-stage-image-offset/small-stage-image-offset-example';
import { SmallStageTextNarrowExampleComponent } from './small-stage-text-narrow/small-stage-text-narrow-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  SmallStageContentVariationExampleComponent,
  SmallStageDefaultExampleComponent,
  SmallStageImageOffsetExampleComponent,
  SmallStageTextNarrowExampleComponent
];

 @NgModule({
  imports: [NxSmallStageModule, ExamplesSharedModule],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class SmallExamplesModule {
  static components() {
    return {
      'small-stage-content-variation': SmallStageContentVariationExampleComponent,
      'small-stage-default': SmallStageDefaultExampleComponent,
      'small-stage-image-offset': SmallStageImageOffsetExampleComponent,
      'small-stage-text-narrow': SmallStageTextNarrowExampleComponent,
    };
  }
}
