import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxTextModule } from '@allianz/ng-aquila/text';
import { NgModule } from '@angular/core';

import { AttentionColorBasicExampleComponent } from './attention-color-basic/attention-color-basic-example';
import { AttentionColorIntegrationExampleComponent } from './attention-color-integration/attention-color-integration-example';
import { AttentionColorNegativeExampleComponent } from './attention-color-negative/attention-color-negative-example';

const EXAMPLES = [
  AttentionColorBasicExampleComponent,
  AttentionColorNegativeExampleComponent,
  AttentionColorIntegrationExampleComponent,
];

@NgModule({
  imports: [NxHeadlineModule, NxTextModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class TextExamplesModule {
  static components() {
    return {
      'attention-color-basic': AttentionColorBasicExampleComponent,
      'attention-color-negative': AttentionColorNegativeExampleComponent,
      'attention-color-integration': AttentionColorIntegrationExampleComponent,
    };
  }
}
