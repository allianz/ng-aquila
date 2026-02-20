import { NgModule } from '@angular/core';

import { EyebrowExampleComponent } from './eyebrow/eyebrow-example';
import { EyebrowHeadlineExampleComponent } from './eyebrow-headline/eyebrow-headline-example';

const EXAMPLES = [EyebrowExampleComponent, EyebrowHeadlineExampleComponent];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class EyebrowExamplesModule {
  static components() {
    return {
      eyebrow: EyebrowExampleComponent,
      'eyebrow-headline': EyebrowHeadlineExampleComponent,
    };
  }
}
