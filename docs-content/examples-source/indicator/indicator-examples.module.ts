import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';

import { NgModule } from '@angular/core';
import { IndicatorExampleComponent } from './indicator/indicator-example';
import { CommonModule } from '@angular/common';

const EXAMPLES = [
  IndicatorExampleComponent
];

 @NgModule({
  imports: [
    NxIndicatorModule,
    CommonModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class IndicatorExamplesModule {
  static components() {
    return {
      'indicator': IndicatorExampleComponent
    };
  }
}
