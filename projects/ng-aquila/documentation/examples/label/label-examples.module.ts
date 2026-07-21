import { NxLabelModule } from '@allianz/ng-aquila/base';
import { NgModule } from '@angular/core';

import { LabelExampleComponent } from './label/label-example';
import { LabelInfoIconExampleComponent } from './label-info-icon/label-info-icon-example';

const EXAMPLES = [LabelExampleComponent, LabelInfoIconExampleComponent];

@NgModule({
  imports: [NxLabelModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class LabelExamplesModule {
  static components() {
    return {
      label: LabelExampleComponent,
      'label-info-icon': LabelInfoIconExampleComponent,
    };
  }
}
