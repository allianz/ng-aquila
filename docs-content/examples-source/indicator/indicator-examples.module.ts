import { NxIndicatorModule } from '@allianz/ng-aquila/indicator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IndicatorExampleComponent } from './indicator/indicator-example';
import { IndicatorPositionsExampleComponent } from './indicator-positions/indicator-positions-example';
import { IndicatorSizesExampleComponent } from './indicator-sizes/indicator-sizes-example';
import { IndicatorTypesExampleComponent } from './indicator-types/indicator-types-example';

const EXAMPLES = [
  IndicatorExampleComponent,
  IndicatorPositionsExampleComponent,
  IndicatorSizesExampleComponent,
  IndicatorTypesExampleComponent,
];

@NgModule({
  imports: [NxIndicatorModule, CommonModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class IndicatorExamplesModule {
  static components() {
    return {
      indicator: IndicatorExampleComponent,
      'indicator-positions': IndicatorPositionsExampleComponent,
      'indicator-sizes': IndicatorSizesExampleComponent,
      'indicator-types': IndicatorTypesExampleComponent,
    };
  }
}
