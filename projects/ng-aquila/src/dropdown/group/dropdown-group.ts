import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'nx-dropdown-group',
  templateUrl: 'dropdown-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dropdown-group.scss'],
  standalone: true,
  host: {
    role: 'group',
    '[attr.aria-labelledby]': 'id',
    '[class.nx-hidden]': '_allItemsHidden()',
  },
})
export class NxDropdownGroupComponent {
  id = inject(IdGenerationService).nextId('nx-dropdown-group');
  /** Label displayed in the group. */
  readonly label = input.required<string>();

  // Items register themselves because a content query would make this file and the item import each other.
  private readonly _items = new Set<{ readonly _hidden: boolean }>();

  /** Registers an item of this group and returns a function to unregister it. */
  _registerItem(item: { readonly _hidden: boolean }): () => void {
    this._items.add(item);
    return () => this._items.delete(item);
  }

  protected _allItemsHidden(): boolean {
    return this._items.size > 0 && [...this._items].every((item) => item._hidden);
  }
}
