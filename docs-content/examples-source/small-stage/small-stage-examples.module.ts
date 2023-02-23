import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxSmallStageModule } from '@aposin/ng-aquila/small-stage';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SmallStageContentVariationExampleComponent } from './small-stage-content-variation/small-stage-content-variation-example';
import { SmallStageDefaultExampleComponent } from './small-stage-default/small-stage-default-example';
import { SmallStageExpertContentNarrowExampleComponent } from './small-stage-expert-content-narrow/small-stage-expert-content-narrow-example';
import { SmallStageExpertDefaultExampleComponent } from './small-stage-expert-default/small-stage-expert-default-example';
import { SmallStageWithBackgroundExampleComponent } from './small-stage-w-bg/small-stage-w-bg-example';

const EXAMPLES = [
    SmallStageContentVariationExampleComponent,
    SmallStageDefaultExampleComponent,
    SmallStageExpertContentNarrowExampleComponent,
    SmallStageWithBackgroundExampleComponent,
    SmallStageExpertDefaultExampleComponent,
];

@NgModule({
    imports: [
        NxSmallStageModule,
        NxBreadcrumbModule,
        ExamplesSharedModule,
        NxLinkModule,
        NxIconModule,
        NgOptimizedImage,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SmallExamplesModule {
    static components() {
        return {
            'small-stage-default': SmallStageDefaultExampleComponent,
            'small-stage-content-variation':
                SmallStageContentVariationExampleComponent,
            'small-stage-w-bg': SmallStageWithBackgroundExampleComponent,
            'small-stage-expert-default':
                SmallStageExpertDefaultExampleComponent,
            'small-stage-expert-content-narrow':
                SmallStageExpertContentNarrowExampleComponent,
        };
    }
}
