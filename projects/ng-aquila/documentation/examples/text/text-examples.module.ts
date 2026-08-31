import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxTextModule } from '@allianz/ng-aquila/text';
import { NgModule } from '@angular/core';

import { AccentColorBasicExampleComponent } from './accent-color-basic/accent-color-basic-example';
import { AccentColorIntegrationExampleComponent } from './accent-color-integration/accent-color-integration-example';
import { AccentColorNegativeExampleComponent } from './accent-color-negative/accent-color-negative-example';
import { BodyTextColorSchemeExampleComponent } from './body-text-color-scheme/body-text-color-scheme-example';
import { BodyTextSizesExampleComponent } from './body-text-sizes/body-text-sizes-example';
import { BodyTextTypeExampleComponent } from './body-text-type/body-text-type-example';
import { UtilityTextAttentionExampleComponent } from './utility-text-attention/utility-text-attention-example';
import { UtilityTextColorSchemeExampleComponent } from './utility-text-color-scheme/utility-text-color-scheme-example';
import { UtilityTextSizesExampleComponent } from './utility-text-sizes/utility-text-sizes-example';

const EXAMPLES = [
  AccentColorBasicExampleComponent,
  AccentColorNegativeExampleComponent,
  AccentColorIntegrationExampleComponent,
  BodyTextSizesExampleComponent,
  BodyTextTypeExampleComponent,
  BodyTextColorSchemeExampleComponent,
  UtilityTextSizesExampleComponent,
  UtilityTextAttentionExampleComponent,
  UtilityTextColorSchemeExampleComponent,
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
      'body-text-sizes': BodyTextSizesExampleComponent,
      'body-text-type': BodyTextTypeExampleComponent,
      'body-text-color-scheme': BodyTextColorSchemeExampleComponent,
      'utility-text-sizes': UtilityTextSizesExampleComponent,
      'utility-text-attention': UtilityTextAttentionExampleComponent,
      'utility-text-color-scheme': UtilityTextColorSchemeExampleComponent,
    };
  }
}
