import { CdkTreeNode } from '@angular/cdk/tree';
import { Directive, ElementRef } from '@angular/core';

/**
 * Handles focussing of the tree action item and adds the necessary attributes for a11y
 */
@Directive({
  selector: '[nxTreeNodeActionItem]',

  host: {
    '[attr.tabindex]': '-1',
    '[attr.role]': '"treeitem"',
    '[attr.aria-level]': 'ariaLevel',
    '[attr.aria-posinset]': '_treeNode?._getPositionInSet()',
    '[attr.aria-setsize]': '_treeNode?._getSetSize()',
  },
  standalone: true,
})
export class NxTreeNodeActionItem<T> {
  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    protected readonly _treeNode: CdkTreeNode<T>,
  ) {}

  get ariaLevel(): number | null {
    const level = this._treeNode?.level;
    return level === undefined ? null : level + 1;
  }

  focus() {
    this._elementRef.nativeElement.focus();
  }
}
