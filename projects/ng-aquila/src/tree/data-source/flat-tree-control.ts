import { FlatTreeControl } from '@angular/cdk/tree';

import { NxFlatTreeNode } from './tree-node';

/**
 * Flat tree control, allows to expand/collapse a subtree recursively for flattened tree.
 */
export class NxFlatTreeControl<F extends NxFlatTreeNode> extends FlatTreeControl<F> {
    constructor() {
        super(
            node => node.level,
            node => node.expandable,
        );
    }
}
