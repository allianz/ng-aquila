import { NxIndicatorModule } from '@allianz/ng-aquila/indicator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IndicatorExampleComponent } from './indicator/indicator-example';

const EXAMPLES = [IndicatorExampleComponent];

@NgModule({
  imports: [NxIndicatorModule, CommonModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class IndicatorExamplesModule {
  static components() {
    return {
      indicator: IndicatorExampleComponent,
    };
  }
}
