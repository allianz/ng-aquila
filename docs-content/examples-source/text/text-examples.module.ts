import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxTextModule } from '@allianz/ng-aquila/text';
import { NgModule } from '@angular/core';

import { AccentColorBasicExampleComponent } from './accent-color-basic/accent-color-basic-example';
import { AccentColorIntegrationExampleComponent } from './accent-color-integration/accent-color-integration-example';
import { AccentColorNegativeExampleComponent } from './accent-color-negative/accent-color-negative-example';

const EXAMPLES = [
  AccentColorBasicExampleComponent,
  AccentColorNegativeExampleComponent,
  AccentColorIntegrationExampleComponent,
];

@NgModule({
  imports: [NxHeadlineModule, NxTextModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class TextExamplesModule {
  static components() {
    return {
      'accent-color-basic': AccentColorBasicExampleComponent,
      'accent-color-negative': AccentColorNegativeExampleComponent,
      'accent-color-integration': AccentColorIntegrationExampleComponent,
    };
  }
}
