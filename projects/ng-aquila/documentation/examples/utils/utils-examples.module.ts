import { NxTableModule } from '@allianz/ng-aquila/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UtilsTypeGuardsExampleComponent } from './utils-type-guards/utils-type-guards-example';

const EXAMPLES = [UtilsTypeGuardsExampleComponent];

@NgModule({
  imports: [CommonModule, NxTableModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class UtilsExamplesModule {
  static components() {
    return {
      'utils-type-guards': UtilsTypeGuardsExampleComponent,
    };
  }
}
