import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NxTreeNodeOutletDirective } from './outlet';

/**
 * Wrapper for the CdkTable with custom design styles.
 */
@Component({
  selector: 'nx-tree',
  exportAs: 'nxTree',
  template: `<ng-container nxTreeNodeOutlet></ng-container>`,
  host: {
    // The 'cdk-tree' class needs to be included here because classes set in the host in the
    // parent class are not inherited with View Engine. The 'cdk-tree' class in CdkTreeNode has
    // to be set in the host because:
    // if it is set as a @HostBinding it is not set by the time the tree nodes try to read the
    // class from it.
    // the ElementRef is not available in the constructor so the class can't be applied directly
    // without a breaking constructor change.
    'class': 'nx-tree cdk-tree',
    'role': 'tree',
  },
  styleUrls: ['tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkTree, useExisting: NxTreeComponent }]
})
export class NxTreeComponent<T> extends CdkTree<T> {
  // Outlets within the tree's template where the dataNodes will be inserted.
  @ViewChild(NxTreeNodeOutletDirective, { static: true }) _nodeOutlet: NxTreeNodeOutletDirective;
}
