import { NxProgressbarModule } from '@allianz/ng-aquila/progressbar';
import { NgModule } from '@angular/core';

import { ProgressbarExampleComponent } from './progressbar/progressbar-example';
import { ProgressbarBasicExampleComponent } from './progressbar-basic/progressbar-basic-example';
import { ProgressbarCustomRangeExampleComponent } from './progressbar-custom-range/progressbar-custom-range-example';
import { ProgressbarPositiveExampleComponent } from './progressbar-positive/progressbar-positive-example';
import { ProgressbarTransparentExampleComponent } from './progressbar-transparent/progressbar-transparent-example';

const EXAMPLES = [
  ProgressbarExampleComponent,
  ProgressbarBasicExampleComponent,
  ProgressbarCustomRangeExampleComponent,
];

@NgModule({
  imports: [NxProgressbarModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class ProgressbarExamplesModule {
  static components() {
    return {
      progressbar: ProgressbarExampleComponent,
      'progressbar-basic': ProgressbarBasicExampleComponent,
      'progressbar-custom-range': ProgressbarCustomRangeExampleComponent,
      'progressbar-positive': ProgressbarPositiveExampleComponent,
      'progressbar-transparent': ProgressbarTransparentExampleComponent,
    };
  }
}
