import { CommonModule } from '@angular/common';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { NgModule } from '@angular/core';
import { MarginSizesExampleComponent } from './margin-sizes/margin-sizes-example';
import { MarginUsageExampleComponent } from './margin-usage/margin-usage-example';

const EXAMPLES = [
  MarginSizesExampleComponent,
  MarginUsageExampleComponent
];

 @NgModule({
  imports: [CommonModule, NxTableModule],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class MarginExamplesModule {
  static components() {
    return {
      'margin-sizes': MarginSizesExampleComponent,
      'margin-usage': MarginUsageExampleComponent,
    };
  }
}
