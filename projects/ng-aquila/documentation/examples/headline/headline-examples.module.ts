import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';

import { NgModule } from '@angular/core';
import { HeadlineFontWeightsExampleComponent } from './headline-font-weights/headline-font-weights-example';
import { HeadlineLinksExampleComponent } from './headline-links/headline-links-example';
import { HeadlineNegativeExampleComponent } from './headline-negative/headline-negative-example';
import { HeadlineSizesExampleComponent } from './headline-sizes/headline-sizes-example';

const EXAMPLES = [
    HeadlineFontWeightsExampleComponent,
    HeadlineLinksExampleComponent,
    HeadlineNegativeExampleComponent,
    HeadlineSizesExampleComponent,
];

@NgModule({
    imports: [NxHeadlineModule, NxLinkModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class HeadlineExamplesModule {
    static components() {
        return {
            'headline-font-weights': HeadlineFontWeightsExampleComponent,
            'headline-links': HeadlineLinksExampleComponent,
            'headline-negative': HeadlineNegativeExampleComponent,
            'headline-sizes': HeadlineSizesExampleComponent,
        };
    }
}
