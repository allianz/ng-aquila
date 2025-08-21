import { FocusMonitor } from '@angular/cdk/a11y';
import { CdkTree, CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import {
  AfterViewInit,
  Component,
  computed,
  contentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';

import { NxTreeNodeActionItem } from './action-item.directive';
import { NxTreeComponent } from './tree.component';

/**
 * Wrapper for the CdkTree node with custom design styles.
 */
@Component({
  selector: 'nx-tree-node',
  exportAs: 'nxTreeNode',
  inputs: ['disabled', 'tabIndex'],
  host: {
    class: 'nx-tree__node',
    '[class.is-expanded]': 'isExpanded',
    '[attr.tabindex]': '-1',
    '[attr.aria-level]': 'ariaLevel()',
    '[attr.aria-posinset]': 'ariaPosInSet()',
    '[attr.aria-setsize]': 'ariaSetSize()',
    '[attr.role]': 'ariaRole()',
  },
  providers: [{ provide: CdkTreeNode, useExisting: NxTreeNodeComponent }],
  templateUrl: './node.html',
  standalone: true,
})
export class NxTreeNodeComponent<T> extends CdkTreeNode<T> implements OnDestroy, AfterViewInit {
  constructor(
    _elementRef: ElementRef<HTMLElement>,
    _tree: CdkTree<T>,
    protected readonly _focusMonitor: FocusMonitor,
  ) {
    super(_elementRef, _tree);
  }

  private readonly actionItem = contentChild(NxTreeNodeActionItem);

  /** if NxTreeNodeActionItem is present, returns  */
  readonly ariaLevel = computed(() => (this.actionItem() ? null : this.level + 1));
  readonly ariaPosInSet = computed(() => (this.actionItem() ? null : this._getPositionInSet()));
  readonly ariaSetSize = computed(() => (this.actionItem() ? null : this._getSetSize()));
  readonly ariaRole = computed(() => (this.actionItem() ? null : 'treeitem'));

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    super.ngOnDestroy();
  }

  /** Update the focused data in tree keyboard interaction */
  _focus(): void {
    (this._tree as NxTreeComponent<T>).updateFocusedData(this._data);
  }

  focus(): void {
    if (this.actionItem()) {
      this.actionItem()!.focus?.();
    } else {
      this._elementRef.nativeElement.focus();
    }
  }
}

/**
 * Wrapper for the CdkTree node definition with custom design styles.
 */
@Directive({
  selector: '[nxTreeNodeDef]',
  inputs: ['when: nxTreeNodeDefWhen'],
  providers: [{ provide: CdkTreeNodeDef, useExisting: NxTreeNodeDefDirective }],
  standalone: true,
})
export class NxTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('nxTreeNode') data!: T;
}
