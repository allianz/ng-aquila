import { NxInfoIconModule } from '@allianz/ng-aquila/info-icon';
import { NgModule } from '@angular/core';

import { InfoIconExampleComponent } from './info-icon/info-icon-example';
import { InfoIconInlineExampleComponent } from './info-icon-inline/info-icon-inline-example';
import { InfoIconModalExampleComponent } from './info-icon-modal/info-icon-modal-example';

const EXAMPLES = [
  InfoIconExampleComponent,
  InfoIconInlineExampleComponent,
  InfoIconModalExampleComponent,
];

@NgModule({
  imports: [NxInfoIconModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class InfoIconExamplesModule {
  static components() {
    return {
      'info-icon': InfoIconExampleComponent,
      'info-icon-inline': InfoIconInlineExampleComponent,
      'info-icon-modal': InfoIconModalExampleComponent,
    };
  }
}
