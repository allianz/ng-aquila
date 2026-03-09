import { NgModule } from '@angular/core';

import { VirtualScrollBasicExampleComponent } from './virtual-scroll-basic/virtual-scroll-basic-example';
import { VirtualScrollEventsExampleComponent } from './virtual-scroll-events/virtual-scroll-events-example';
import { VirtualScrollNavigationExampleComponent } from './virtual-scroll-navigation/virtual-scroll-navigation-example';
import { VirtualScrollTemplateExampleComponent } from './virtual-scroll-template/virtual-scroll-template-example';

const EXAMPLES = [
  VirtualScrollBasicExampleComponent,
  VirtualScrollTemplateExampleComponent,
  VirtualScrollEventsExampleComponent,
  VirtualScrollNavigationExampleComponent,
];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class VirtualScrollExamplesModule {
  static components() {
    return {
      'virtual-scroll-basic': VirtualScrollBasicExampleComponent,
      'virtual-scroll-template': VirtualScrollTemplateExampleComponent,
      'virtual-scroll-events': VirtualScrollEventsExampleComponent,
      'virtual-scroll-navigation': VirtualScrollNavigationExampleComponent,
    };
  }
}
