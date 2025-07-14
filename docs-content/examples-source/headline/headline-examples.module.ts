import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxTableModule } from '@allianz/ng-aquila/table';
import { NgModule } from '@angular/core';

import { HeadlineFontWeightsExampleComponent } from './headline-font-weights/headline-font-weights-example';
import { HeadlineLinksExampleComponent } from './headline-links/headline-links-example';
import { HeadlineNegativeExampleComponent } from './headline-negative/headline-negative-example';
import { HeadlineSizesA1ExampleComponent } from './headline-sizes-a1/headline-sizes-a1-example';
import { HeadlineSizesDeprecatedExampleComponent } from './headline-sizes-deprecated/headline-sizes-deprecated-example';
import { HeadlineSizesMappingExampleComponent } from './headline-sizes-mapping/headline-sizes-mapping-example';

const EXAMPLES = [
  HeadlineFontWeightsExampleComponent,
  HeadlineLinksExampleComponent,
  HeadlineNegativeExampleComponent,
  HeadlineSizesDeprecatedExampleComponent,
  HeadlineSizesA1ExampleComponent,
  HeadlineSizesMappingExampleComponent,
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
    };
  }
}
