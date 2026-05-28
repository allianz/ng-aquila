import { NgModule } from '@angular/core';

import { SpinnerAriaAnnouncementExampleComponent } from './spinner-aria-announcement/spinner-aria-announcement-example';
import { SpinnerInverseExampleComponent } from './spinner-inverse/spinner-inverse-example';
import { SpinnerSizesExampleComponent } from './spinner-sizes/spinner-sizes-example';

const EXAMPLES = [
  SpinnerInverseExampleComponent,
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
      'spinner-inverse': SpinnerInverseExampleComponent,
      'spinner-sizes': SpinnerSizesExampleComponent,
      'spinner-aria-announcement': SpinnerAriaAnnouncementExampleComponent,
    };
  }
}
