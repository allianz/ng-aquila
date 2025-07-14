import { NxTableModule } from '@allianz/ng-aquila/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HiddenClassesExampleComponent } from './hidden-classes/hidden-classes-example';
import { MarginSizesExampleComponent } from './margin-sizes/margin-sizes-example';
import { MarginUsageExampleComponent } from './margin-usage/margin-usage-example';

const EXAMPLES = [
  MarginSizesExampleComponent,
  MarginUsageExampleComponent,
  HiddenClassesExampleComponent,
];

@NgModule({
  imports: [CommonModule, NxTableModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class LayoutExamplesModule {
  static components() {
    return {
      'margin-sizes': MarginSizesExampleComponent,
      'hidden-classes': HiddenClassesExampleComponent,
      'margin-usage': MarginUsageExampleComponent,
    };
  }
}
