import { QueryList } from '@angular/core';

import { NxContextMenuComponent } from './context-menu.component';

/**
 * Base for Context Menu Item Wrapper.
 * Solely for resolving circular dependency between the Item Wrap and the Context Menu itself
 */
export abstract class NxContextMenuItemWrapBase {
  abstract _items: QueryList<NxContextMenuItemBase>;
}

/**
 * Base for Context Menu Item.
 * Solely for resolving circular dependency between the Menu Item and the Context Menu itself
 */
export abstract class NxContextMenuItemBase {
  abstract get parentMenu(): NxContextMenuComponent | null;
  abstract focus(): void;
}
