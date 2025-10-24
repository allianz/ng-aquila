import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxTableModule } from '@allianz/ng-aquila/table';
import { NgModule } from '@angular/core';

import { HeadlineAttentionTextExampleComponent } from './headline-attention-text/headline-attention-text-example';
import { HeadlineFontWeightsExampleComponent } from './headline-font-weights/headline-font-weights-example';
import { HeadlineLinksExampleComponent } from './headline-links/headline-links-example';
import { HeadlineNegativeExampleComponent } from './headline-negative/headline-negative-example';
import { HeadlineSizesA1ExampleComponent } from './headline-sizes-a1/headline-sizes-a1-example';
import { HeadlineSizesDeprecatedExampleComponent } from './headline-sizes-deprecated/headline-sizes-deprecated-example';
import { HeadlineSizesMappingExampleComponent } from './headline-sizes-mapping/headline-sizes-mapping-example';
import { HeadlineTypeExampleComponent } from './headline-type/headline-type-example';

const EXAMPLES = [
  HeadlineFontWeightsExampleComponent,
  HeadlineLinksExampleComponent,
  HeadlineNegativeExampleComponent,
  HeadlineSizesDeprecatedExampleComponent,
  HeadlineSizesA1ExampleComponent,
  HeadlineSizesMappingExampleComponent,
  HeadlineAttentionTextExampleComponent,
];

@NgModule({
  imports: [NxHeadlineModule, NxLinkModule, NxTableModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class HeadlineExamplesModule {
  static components() {
    return {
      'headline-font-weights': HeadlineFontWeightsExampleComponent,
      'headline-links': HeadlineLinksExampleComponent,
      'headline-negative': HeadlineNegativeExampleComponent,
      'headline-sizes-deprecated': HeadlineSizesDeprecatedExampleComponent,
      'headline-sizes-a1': HeadlineSizesA1ExampleComponent,
      'headline-sizes-mapping': HeadlineSizesMappingExampleComponent,
      'headline-type': HeadlineTypeExampleComponent,
      'headline-attention-text': HeadlineAttentionTextExampleComponent,
    };
  }
}
