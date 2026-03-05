import { NxBreadcrumbModule } from '@allianz/ng-aquila/breadcrumb';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxSmallStageModule } from '@allianz/ng-aquila/small-stage';
import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SmallStageExampleComponent } from './small-stage/small-stage-example';
import { SmallStageContentVariationExampleComponent } from './small-stage-content-variation/small-stage-content-variation-example';
import { SmallStageDefaultExampleComponent } from './small-stage-default/small-stage-default-example';
import { SmallStageExpertContentNarrowExampleComponent } from './small-stage-expert-content-narrow/small-stage-expert-content-narrow-example';
import { SmallStageExpertDefaultExampleComponent } from './small-stage-expert-default/small-stage-expert-default-example';
import { SmallStageHeaderExampleComponent } from './small-stage-header/small-stage-header-example';
import { SmallStageImageExampleComponent } from './small-stage-image/small-stage-image-example';
import { SmallStageWithBackgroundExampleComponent } from './small-stage-w-bg/small-stage-w-bg-example';
import { SmallStageFunctionalGridExampleComponent } from './small-stage-functional-grid/small-stage-functional-grid-example';
import { SmallStageStyleExampleComponent } from './small-stage-style/small-stage-style-example';

const EXAMPLES = [
  SmallStageExampleComponent,
  SmallStageContentVariationExampleComponent,
  SmallStageDefaultExampleComponent,
  SmallStageExpertContentNarrowExampleComponent,
  SmallStageWithBackgroundExampleComponent,
  SmallStageExpertDefaultExampleComponent,
  SmallStageHeaderExampleComponent,
  SmallStageImageExampleComponent,
  SmallStageFunctionalGridExampleComponent,
  SmallStageStyleExampleComponent,
];

@NgModule({
  imports: [
    NxSmallStageModule,
    NxBreadcrumbModule,
    ExamplesSharedModule,
    NxLinkModule,
    NxIconModule,
    NgOptimizedImage,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class SmallExamplesModule {
  static components() {
    return {
      'small-stage': SmallStageExampleComponent,
      'small-stage-style': SmallStageStyleExampleComponent,
      'small-stage-header': SmallStageHeaderExampleComponent,
      'small-stage-image': SmallStageImageExampleComponent,
      'small-stage-functional-grid': SmallStageFunctionalGridExampleComponent,
      'small-stage-default': SmallStageDefaultExampleComponent,
      'small-stage-content-variation':
        SmallStageContentVariationExampleComponent,
      'small-stage-w-bg': SmallStageWithBackgroundExampleComponent,
      'small-stage-expert-default': SmallStageExpertDefaultExampleComponent,
      'small-stage-expert-content-narrow':
        SmallStageExpertContentNarrowExampleComponent,
    };
  }
}
