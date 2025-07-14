import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxDynamicTableModule } from '@allianz/ng-aquila/dynamic-table';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';

import { PopoverClickOutsideExampleComponent } from './popover-click-outside/popover-click-outside-example';
import { PopoverCustomExampleComponent } from './popover-custom/popover-custom-example';
import { PopoverGuidedTourExampleComponent } from './popover-guided-tour/popover-guided-tour-example';
import { PopoverHoverExampleComponent } from './popover-hover/popover-hover-example';
import { PopoverI18nExampleComponent } from './popover-i18n/popover-i18n-example';
import { PopoverLazyloadExampleComponent } from './popover-lazyload/popover-lazyload-example';
import { PopoverModalExampleComponent } from './popover-modal/popover-modal-example';
import { PopoverPositioningExampleComponent } from './popover-positioning/popover-positioning-example';
import { PopoverScrollExampleComponent } from './popover-scroll/popover-scroll-example';
import { PopoverScrollStrategyProviderExampleComponent } from './popover-scroll-strategy-provider/popover-scroll-strategy-provider-example';
import { PopoverScrollableExampleComponent } from './popover-scrollable/popover-scrollable-example';
import { PopoverSlotExampleComponent } from './popover-slot/popover-slot-example';
import { PopoverTableExampleComponent } from './popover-table/popover-table-example';
import { PopoverTriggerExampleComponent } from './popover-trigger/popover-trigger-example';
import { PopoverWidthExampleComponent } from './popover-width/popover-width-example';
import { PopoverWithoutArrowExampleComponent } from './popover-without-arrow/popover-without-arrow-example';

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
  PopoverTriggerExampleComponent,
  PopoverI18nExampleComponent,
  PopoverScrollStrategyProviderExampleComponent,
  PopoverSlotExampleComponent,
  PopoverWithoutArrowExampleComponent,
  PopoverGuidedTourExampleComponent,
  PopoverWidthExampleComponent,
];

@NgModule({
  imports: [
    NxPopoverModule,
    NxButtonModule,
    NxIconModule,
    NxDynamicTableModule,
    CdkScrollableModule,
    NxHeadlineModule,
    NxLinkModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
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
      'popover-i18n': PopoverI18nExampleComponent,
      'popover-scroll-strategy-provider':
        PopoverScrollStrategyProviderExampleComponent,
      'popover-slot': PopoverSlotExampleComponent,
      'popover-without-arrow': PopoverWithoutArrowExampleComponent,
      'popover-guided-tour': PopoverGuidedTourExampleComponent,
      'popover-width': PopoverWidthExampleComponent,
    };
  }
}
