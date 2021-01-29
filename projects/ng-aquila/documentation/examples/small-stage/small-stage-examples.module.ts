import { NxSmallStageModule } from '@aposin/ng-aquila/small-stage';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';

import { NgModule } from '@angular/core';
import { SmallStageContentVariationExampleComponent } from './small-stage-content-variation/small-stage-content-variation-example';
import { SmallStageDefaultExampleComponent } from './small-stage-default/small-stage-default-example';
import { SmallStageImageOffsetExampleComponent } from './small-stage-expert-image-offset/small-stage-expert-image-offset-example';
import { SmallStageExpertContentNarrowExampleComponent } from './small-stage-expert-content-narrow/small-stage-expert-content-narrow-example';
import { SmallStageWithHeaderExampleComponent } from './small-stage-w-header/small-stage-w-header-example';
import { SmallStageWithBackgroundExampleComponent } from './small-stage-w-bg/small-stage-w-bg-example';
import { SmallStageExpertDefaultExampleComponent } from './small-stage-expert-default/small-stage-expert-default-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  SmallStageContentVariationExampleComponent,
  SmallStageDefaultExampleComponent,
  SmallStageImageOffsetExampleComponent,
  SmallStageExpertContentNarrowExampleComponent,
  SmallStageWithHeaderExampleComponent,
  SmallStageWithBackgroundExampleComponent,
  SmallStageExpertDefaultExampleComponent,
];

 @NgModule({
  imports: [NxSmallStageModule, NxBreadcrumbModule, ExamplesSharedModule],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class SmallExamplesModule {
  static components() {
    return {
      'small-stage-default': SmallStageDefaultExampleComponent,
      'small-stage-content-variation': SmallStageContentVariationExampleComponent,
      'small-stage-w-header': SmallStageWithHeaderExampleComponent,
      'small-stage-w-bg': SmallStageWithBackgroundExampleComponent,
      'small-stage-expert-default': SmallStageExpertDefaultExampleComponent,
      'small-stage-expert-image-offset': SmallStageImageOffsetExampleComponent,
      'small-stage-expert-content-narrow': SmallStageExpertContentNarrowExampleComponent,
    };
  }
}
