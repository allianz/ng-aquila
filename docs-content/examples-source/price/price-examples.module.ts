import { NgModule } from '@angular/core';
import { NxPriceModule } from '@allianz/ng-aquila/price';

import { PriceBasicExampleComponent } from './price-basic/price-basic-example';
import { PriceLocaleExampleComponent } from './price-locale/price-locale-example';
import { PriceInverseExampleComponent } from './price-inverse/price-inverse-example';
import { PricePrefixSuffixExampleComponent } from './price-prefix-suffix/price-prefix-suffix-example';
import { PriceSizesExampleComponent } from './price-sizes/price-sizes-example';

const EXAMPLES = [
  PriceBasicExampleComponent,
  PriceLocaleExampleComponent,
  PriceSizesExampleComponent,
  PriceInverseExampleComponent,
  PricePrefixSuffixExampleComponent,
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
    };
  }
}
