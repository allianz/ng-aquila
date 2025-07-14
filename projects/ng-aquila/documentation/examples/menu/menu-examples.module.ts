import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxMenuModule } from '@allianz/ng-aquila/menu';
import { NxTreeModule } from '@allianz/ng-aquila/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuExampleComponent } from './menu/menu-example';
import { MenuButtonExampleComponent } from './menu-button/menu-button-example';
import { MenuItemExampleComponent } from './menu-item/menu-item-example';
import { MenuItemWithIconsExampleComponent } from './menu-item-with-icons/menu-item-with-icons-example';
import { MenuLinkExampleComponent } from './menu-link/menu-link-example';

const EXAMPLES = [
  MenuExampleComponent,
  MenuButtonExampleComponent,
  MenuItemExampleComponent,
  MenuItemWithIconsExampleComponent,
  MenuLinkExampleComponent,
];

@NgModule({
  imports: [
    NxButtonModule,
    NxMenuModule,
    NxIconModule,
    NxTreeModule,
    RouterModule,
    CommonModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class MenuExamplesModule {
  static components() {
    return {
      menu: MenuExampleComponent,
      'menu-button': MenuButtonExampleComponent,
      'menu-item': MenuItemExampleComponent,
      'menu-item-with-icons': MenuItemWithIconsExampleComponent,
      'menu-link': MenuLinkExampleComponent,
    };
  }
}
