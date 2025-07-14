import { NgModule } from '@angular/core';

import { SpinnerAriaAnnouncementExampleComponent } from './spinner-aria-announcement/spinner-aria-announcement-example';
import { SpinnerNegativeExampleComponent } from './spinner-negative/spinner-negative-example';
import { SpinnerSizesExampleComponent } from './spinner-sizes/spinner-sizes-example';

const EXAMPLES = [
  SpinnerNegativeExampleComponent,
  SpinnerSizesExampleComponent,
  SpinnerAriaAnnouncementExampleComponent,
];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class SpinnerExamplesModule {
  static components() {
    return {
      'spinner-negative': SpinnerNegativeExampleComponent,
      'spinner-sizes': SpinnerSizesExampleComponent,
      'spinner-aria-announcement': SpinnerAriaAnnouncementExampleComponent,
    };
  }
}
