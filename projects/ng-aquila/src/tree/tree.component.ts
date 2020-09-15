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
    'class': 'nx-tree',
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
