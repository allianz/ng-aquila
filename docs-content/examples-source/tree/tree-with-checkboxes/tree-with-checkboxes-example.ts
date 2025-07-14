import { NxButtonModule } from '@allianz/ng-aquila/button';
import {
  NxCheckboxComponent,
  NxCheckboxModule,
} from '@allianz/ng-aquila/checkbox';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { ArrayDataSource, SelectionModel } from '@angular/cdk/collections';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Directive,
  inject,
  input,
  ViewChild,
  viewChildren,
} from '@angular/core';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

const TREE_DATA: ExampleFlatNode[] = [
  {
    name: 'Fruit',
    expandable: true,
    level: 0,
  },
  {
    name: 'Apple',
    expandable: false,
    level: 1,
  },
  {
    name: 'Banana',
    expandable: false,
    level: 1,
  },
  {
    name: 'Fruit loops',
    expandable: false,
    level: 1,
  },
  {
    name: 'Vegetables',
    expandable: true,
    level: 0,
  },
  {
    name: 'Green',
    expandable: true,
    level: 1,
  },
  {
    name: 'Broccoli',
    expandable: false,
    level: 2,
  },
  {
    name: 'Brussels sprouts',
    expandable: false,
    level: 2,
  },
  {
    name: 'Orange',
    expandable: true,
    level: 1,
  },
  {
    name: 'Pumpkins',
    expandable: false,
    level: 2,
  },
  {
    name: 'Carrots',
    expandable: false,
    level: 2,
  },
];

/** Helper because the new CDK Tree API does not expose a form of `getDescendants` anymore. */
@Directive({
  selector: '[treeCheckboxNode]',
})
export class TreeCheckboxNode<T> implements AfterViewInit {
  checkbox = inject(NxCheckboxComponent, { self: true });
  node = input<T | null>(null, { alias: 'treeCheckboxNode' });
  parentNode = input<T | null>(null, {
    alias: 'treeCheckboxParentNode',
  });

  ngAfterViewInit() {
    // currently it is not possible to set the tabindex of the checkbox with an input
    // on the component, doing this little trick, because the focus and keyboard action should
    // happen on the tree nodes
    this.checkbox._nativeInput.nativeElement.setAttribute('tabindex', '-1');
  }
}

/**
 * @title Tree Example
 */
@Component({
  selector: 'tree-with-checkboxes-example',
  templateUrl: './tree-with-checkboxes-example.html',
  styleUrls: ['./tree-with-checkboxes-example.css'],
  standalone: true,
  imports: [
    CdkTreeModule,
    CommonModule,
    NxCheckboxModule,
    NxButtonModule,
    NxIconComponent,
    TreeCheckboxNode,
  ],
})
export class TreeWithCheckboxesExampleComponent {
  @ViewChild(CdkTree)
  tree!: CdkTree<ExampleFlatNode>;

  levelAccessor = (dataNode: ExampleFlatNode) => dataNode.level;

  dataSource = new ArrayDataSource(TREE_DATA);

  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);

  treeCheckboxNodes = viewChildren(TreeCheckboxNode);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    // Determine the node's parent by finding the first preceding node that's
    // one level shallower.
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: ExampleFlatNode): boolean {
    // This node should render if it is a root node or if all of its ancestors are expanded.
    const parent = this.getParentNode(node);
    return (
      !parent || (!!this.tree?.isExpanded(parent) && this.shouldRender(parent))
    );
  }

  toggleNode(node: ExampleFlatNode) {
    this.checklistSelection.toggle(node);
    const isSelected = this.checklistSelection.isSelected(node);
    this.setDescendants(node, isSelected);
    this.checkAllParentsSelection(node);
  }

  setDescendants(parentNode: ExampleFlatNode, isSelected: boolean) {
    const descendants = this.getDescendants(parentNode);

    descendants.forEach((item) => {
      isSelected
        ? this.checklistSelection.select(item)
        : this.checklistSelection.deselect(item);
    });
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ExampleFlatNode): void {
    let parent: ExampleFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.toggleRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  toggleRootNodeSelection(node: ExampleFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descAllSelected = this.descendantsAllSelected(node);
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getDescendants(node: ExampleFlatNode) {
    const descendants: ExampleFlatNode[] = [];
    this._getDescendants(descendants, node);
    return descendants.splice(1);
  }

  private _getDescendants(
    descendants: ExampleFlatNode[],
    node: ExampleFlatNode,
  ) {
    descendants.push(node);
    this.treeCheckboxNodes()
      ?.filter((item) => item.parentNode() === node)
      .forEach((item) => {
        descendants.push(item.node());
        this._getDescendants(descendants, item.node());
      });
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ExampleFlatNode): boolean {
    const descendants = this.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  // /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ExampleFlatNode): boolean {
    const descendants = this.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child),
    );
    return result && !this.descendantsAllSelected(node);
  }
}
