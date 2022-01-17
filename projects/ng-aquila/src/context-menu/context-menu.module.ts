import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxContextMenuContentDirective } from './context-menu-content.directive';
import { NxContextMenuItemComponent } from './context-menu-item.component';
import { NxContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { NxContextMenuComponent } from './context-menu.component';

const EXPORTED_MODULES = [NxContextMenuComponent, NxContextMenuContentDirective, NxContextMenuItemComponent, NxContextMenuTriggerDirective];

@NgModule({
    imports: [CommonModule, OverlayModule, NxIconModule],
    exports: EXPORTED_MODULES,
    declarations: EXPORTED_MODULES,
})
export class NxContextMenuModule {}
