import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxPopoverComponent } from './popover.component';
import { NxPopoverContentDirective } from './popover-content';
import { NxPopoverIntl } from './popover-intl';
import { NX_POPOVER_SCROLL_STRATEGY_PROVIDER, NxPopoverTriggerDirective } from './popover-trigger.directive';

@NgModule({
    imports: [CommonModule, OverlayModule, NxIconModule],
    declarations: [NxPopoverTriggerDirective, NxPopoverComponent, NxPopoverContentDirective],
    exports: [NxPopoverTriggerDirective, NxPopoverComponent, NxPopoverContentDirective],
    providers: [NxPopoverIntl, NX_POPOVER_SCROLL_STRATEGY_PROVIDER],
})
export class NxPopoverModule {}
