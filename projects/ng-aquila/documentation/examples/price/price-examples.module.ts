import { NxPriceModule } from '@allianz/ng-aquila/price';
import { NgModule } from '@angular/core';

import { PriceAccentAttentionExampleComponent } from './price-accent-attention/price-accent-attention-example';
import { PriceBasicExampleComponent } from './price-basic/price-basic-example';
import { PriceContextExampleComponent } from './price-context/price-context-example';
import { PriceInfoIconExampleComponent } from './price-info-icon/price-info-icon-example';
import { PriceInverseExampleComponent } from './price-inverse/price-inverse-example';
import { PriceLocaleExampleComponent } from './price-locale/price-locale-example';
import { PricePrefixSuffixExampleComponent } from './price-prefix-suffix/price-prefix-suffix-example';
import { PriceSizesExampleComponent } from './price-sizes/price-sizes-example';
import { PriceSuperscriptExampleComponent } from './price-superscript/price-superscript-example';
import { PriceVerticalExampleComponent } from './price-vertical/price-vertical-example';

const EXAMPLES = [
  PriceBasicExampleComponent,
  PriceLocaleExampleComponent,
  PriceSizesExampleComponent,
  PriceInverseExampleComponent,
  PricePrefixSuffixExampleComponent,
  PriceSuperscriptExampleComponent,
  PriceVerticalExampleComponent,
  PriceInfoIconExampleComponent,
  PriceContextExampleComponent,
  PriceAccentAttentionExampleComponent,
];

@NgModule({
  imports: [NxPriceModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class PriceExamplesModule {
  static components() {
    return {
      'price-basic': PriceBasicExampleComponent,
      'price-locale': PriceLocaleExampleComponent,
      'price-sizes': PriceSizesExampleComponent,
      'price-inverse': PriceInverseExampleComponent,
      'price-prefix-suffix': PricePrefixSuffixExampleComponent,
      'price-superscript': PriceSuperscriptExampleComponent,
      'price-vertical': PriceVerticalExampleComponent,
      'price-info-icon': PriceInfoIconExampleComponent,
      'price-context': PriceContextExampleComponent,
      'price-accent-attention': PriceAccentAttentionExampleComponent,
    };
  }
}
