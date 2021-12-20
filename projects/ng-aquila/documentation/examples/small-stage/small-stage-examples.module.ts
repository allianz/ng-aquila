import { NxSmallStageModule } from '@aposin/ng-aquila/small-stage';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';

import { NgModule } from '@angular/core';
import { SmallStageContentVariationExampleComponent } from './small-stage-content-variation/small-stage-content-variation-example';
import { SmallStageDefaultExampleComponent } from './small-stage-default/small-stage-default-example';
import { SmallStageExpertContentNarrowExampleComponent } from './small-stage-expert-content-narrow/small-stage-expert-content-narrow-example';
import { SmallStageWithBackgroundExampleComponent } from './small-stage-w-bg/small-stage-w-bg-example';
import { SmallStageExpertDefaultExampleComponent } from './small-stage-expert-default/small-stage-expert-default-example';
import { ExamplesSharedModule } from '../examples-shared.module';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxIconModule } from '@aposin/ng-aquila/icon';

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
