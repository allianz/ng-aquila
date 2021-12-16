import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxMenuComponent } from './menu.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxMenuLinkDirective } from './menu-link.directive';
import { NxMenuItemDirective } from './menu-item.directive';
import { NxMenuButtonComponent, NxMenuButtonIconDirective } from './menu-button.component';

const EXPORTED_MODULES = [NxMenuComponent, NxMenuLinkDirective, NxMenuItemDirective, NxMenuButtonComponent, NxMenuButtonIconDirective];

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class NxMenuModule {}
