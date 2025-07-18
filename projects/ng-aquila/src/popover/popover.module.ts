import { NxIconModule } from '@allianz/ng-aquila/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxPopoverComponent } from './popover.component';
import { NxPopoverContentDirective } from './popover-content';
import { NxPopoverTriggerDirective } from './popover-trigger.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    NxIconModule,
    NxPopoverTriggerDirective,
    NxPopoverComponent,
    NxPopoverContentDirective,
  ],
  exports: [NxPopoverTriggerDirective, NxPopoverComponent, NxPopoverContentDirective],
  providers: [],
})
export class NxPopoverModule {}
