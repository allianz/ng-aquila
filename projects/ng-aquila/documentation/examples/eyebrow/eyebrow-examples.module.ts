import { NgModule } from '@angular/core';

import { EyebrowExampleComponent } from './eyebrow/eyebrow-example';
import { EyebrowColorSchemeExampleComponent } from './eyebrow-color-scheme/eyebrow-color-scheme-example';
import { EyebrowHeadlineExampleComponent } from './eyebrow-headline/eyebrow-headline-example';

const EXAMPLES = [
  EyebrowExampleComponent,
  EyebrowHeadlineExampleComponent,
  EyebrowColorSchemeExampleComponent,
];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class EyebrowExamplesModule {
  static components() {
    return {
      eyebrow: EyebrowExampleComponent,
      'eyebrow-headline': EyebrowHeadlineExampleComponent,
      'eyebrow-color-scheme': EyebrowColorSchemeExampleComponent,
    };
  }
}
