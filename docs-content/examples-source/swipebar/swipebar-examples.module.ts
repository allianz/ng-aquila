import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxSwipebarModule } from '@allianz/ng-aquila/swipebar';
import { NgModule } from '@angular/core';

import { SwipebarExampleComponent } from './swipebar/swipebar-example';

const EXAMPLES = [SwipebarExampleComponent];

@NgModule({
  imports: [NxSwipebarModule, NxCopytextModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class SwipebarExamplesModule {
  static components() {
    return {
      swipebar: SwipebarExampleComponent,
    };
  }
}
