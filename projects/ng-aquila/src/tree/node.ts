import {CdkTreeNode, CdkTreeNodeDef} from '@angular/cdk/tree';
import {
  Component,
  Directive,
  Input,
} from '@angular/core';

/**
 * Wrapper for the CdkTree node with custom design styles.
 */
@Component({
  selector: 'nx-tree-node',
  exportAs: 'nxTreeNode',
  inputs: ['disabled', 'tabIndex'],
  host: {
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-level]': 'role === "treeitem" ? level : null',
    '[attr.role]': 'role',
    'class': 'nx-tree__node',
    '[class.is-expanded]': 'isExpanded'
  },
  providers: [{provide: CdkTreeNode, useExisting: NxTreeNodeComponent}],
  templateUrl: './node.html'
})
export class NxTreeNodeComponent<T> extends CdkTreeNode<T> {}

/**
 * Wrapper for the CdkTree node definition with custom design styles.
 */
@Directive({
  selector: '[nxTreeNodeDef]',
  inputs: [
    'when: nxTreeNodeDefWhen'
  ],
  providers: [{provide: CdkTreeNodeDef, useExisting: NxTreeNodeDefDirective}]
})
export class NxTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('nxTreeNode') data: T;
}
