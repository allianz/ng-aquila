import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxMenuComponent } from './menu.component';
import { NxMenuButtonComponent, NxMenuButtonIconDirective } from './menu-button.component';
import { NxMenuItemDirective } from './menu-item.directive';
import { NxMenuLinkDirective } from './menu-link.directive';

const EXPORTED_MODULES = [
  NxMenuComponent,
  NxMenuLinkDirective,
  NxMenuItemDirective,
  NxMenuButtonComponent,
  NxMenuButtonIconDirective,
];

@NgModule({
  imports: [CommonModule, NxIconModule, ...EXPORTED_MODULES],
  exports: EXPORTED_MODULES,
})
export class NxMenuModule {}
