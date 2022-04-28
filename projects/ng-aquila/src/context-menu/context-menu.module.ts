import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxContextMenuComponent } from './context-menu.component';
import { NxContextMenuContentDirective } from './context-menu-content.directive';
import { NxContextMenuHeaderComponent } from './context-menu-header.component';
import { NxContextMenuItemComponent, NxContextMenuItemWrapComponent } from './context-menu-item.component';
import { NX_CONTEXT_MENU_SCROLL_STRATEGY_PROVIDER, NxContextMenuTriggerDirective } from './context-menu-trigger.directive';

const EXPORTED_MODULES = [
    NxContextMenuComponent,
    NxContextMenuContentDirective,
    NxContextMenuItemComponent,
    NxContextMenuItemWrapComponent,
    NxContextMenuTriggerDirective,
    NxContextMenuHeaderComponent,
];

@NgModule({
    imports: [CommonModule, OverlayModule, NxIconModule],
    exports: EXPORTED_MODULES,
    declarations: EXPORTED_MODULES,
    providers: [NX_CONTEXT_MENU_SCROLL_STRATEGY_PROVIDER],
})
export class NxContextMenuModule {}
