import { NxDividerModule } from '@allianz/ng-aquila/divider';
import { NgModule } from '@angular/core';

import { DividerExampleComponent } from './divider/divider-example';

const EXAMPLES = [DividerExampleComponent];

@NgModule({
  imports: [NxDividerModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class DividerExamplesModule {
  static components() {
    return {
      divider: DividerExampleComponent,
    };
  }
}
