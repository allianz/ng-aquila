import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NgModule } from '@angular/core';

import { CopytextA1ExampleComponent } from './copytext-a1/copytext-a1-example';
import { CopytextNegativeExampleComponent } from './copytext-negative/copytext-negative-example';
import { CopytextSizesExampleComponent } from './copytext-sizes/copytext-sizes-example';

const EXAMPLES = [
  CopytextNegativeExampleComponent,
  CopytextSizesExampleComponent,
];

@NgModule({
  imports: [NxCopytextModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class CopytextExamplesModule {
  static components() {
    return {
      'copytext-negative': CopytextNegativeExampleComponent,
      'copytext-sizes': CopytextSizesExampleComponent,
      'copytext-a1': CopytextA1ExampleComponent,
    };
  }
}
