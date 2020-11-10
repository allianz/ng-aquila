import { NxDynamicTableModule } from '@aposin/ng-aquila/dynamic-table';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { NgModule } from '@angular/core';
import { PopoverClickOutsideExampleComponent } from './popover-click-outside/popover-click-outside-example';
import { PopoverCustomExampleComponent } from './popover-custom/popover-custom-example';
import { PopoverHoverExampleComponent } from './popover-hover/popover-hover-example';
import { PopoverLazyloadExampleComponent } from './popover-lazyload/popover-lazyload-example';
import { PopoverModalExampleComponent } from './popover-modal/popover-modal-example';
import { PopoverPositioningExampleComponent } from './popover-positioning/popover-positioning-example';
import { PopoverScrollExampleComponent } from './popover-scroll/popover-scroll-example';
import { PopoverScrollableExampleComponent } from './popover-scrollable/popover-scrollable-example';
import { PopoverTableExampleComponent } from './popover-table/popover-table-example';
import { PopoverTriggerExampleComponent } from './popover-trigger/popover-trigger-example';

const EXAMPLES = [
  PopoverClickOutsideExampleComponent,
  PopoverCustomExampleComponent,
  PopoverHoverExampleComponent,
  PopoverLazyloadExampleComponent,
  PopoverModalExampleComponent,
  PopoverPositioningExampleComponent,
  PopoverScrollExampleComponent,
  PopoverScrollableExampleComponent,
  PopoverTableExampleComponent,
  PopoverTriggerExampleComponent
];

@NgModule({
  imports: [
    NxPopoverModule,
    NxButtonModule,
    NxIconModule,
    NxDynamicTableModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class PopoverExamplesModule {
  static components() {
    return {
      'popover-click-outside': PopoverClickOutsideExampleComponent,
      'popover-custom': PopoverCustomExampleComponent,
      'popover-hover': PopoverHoverExampleComponent,
      'popover-lazyload': PopoverLazyloadExampleComponent,
      'popover-modal': PopoverModalExampleComponent,
      'popover-positioning': PopoverPositioningExampleComponent,
      'popover-scroll': PopoverScrollExampleComponent,
      'popover-scrollable': PopoverScrollableExampleComponent,
      'popover-table': PopoverTableExampleComponent,
      'popover-trigger': PopoverTriggerExampleComponent,
    };
  }
}
