import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxContextMenuComponent } from './context-menu.component';
import { NxContextMenuContentDirective } from './context-menu-content.directive';
import { NxContextMenuHeaderComponent } from './context-menu-header.component';
import { NxContextMenuItemCheckboxDirective, NxContextMenuItemComponent, NxContextMenuItemWrapComponent } from './context-menu-item.component';
import { NxContextMenuTriggerDirective } from './context-menu-trigger.directive';

const EXPORTED_MODULES = [
    NxContextMenuComponent,
    NxContextMenuContentDirective,
    NxContextMenuItemComponent,
    NxContextMenuItemWrapComponent,
    NxContextMenuTriggerDirective,
    NxContextMenuHeaderComponent,
    NxContextMenuItemCheckboxDirective,
];

@NgModule({
    imports: [CommonModule, OverlayModule, NxIconModule, ...EXPORTED_MODULES],
    exports: EXPORTED_MODULES,
})
export class NxContextMenuModule {}
