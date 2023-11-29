import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { NxFlatTreeNode, NxTreeNode } from './tree-node';

/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T extends NxTreeNode` to flattened nodes of type `F extends NxFlatTreeNode`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F extends NxFlatTreeNode` with additional information.
 */
class NxTreeFlattener<T extends NxTreeNode, F extends NxFlatTreeNode> {
    transformFunction(node: NxTreeNode, level: number): F {
        const { children, ...rest } = node;
        return {
            ...rest,
            level,
            expandable: Array.isArray(children) && children.length > 0,
        } as F;
    }

    getLevel(node: F): number {
        return node.level;
    }

    isExpandable(node: F): boolean {
        return node.expandable;
    }

    getChildren(node: T): Observable<T[]> | T[] {
        return node.children as T[];
    }

    _flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[] {
        const flatNode = this.transformFunction(node, level);
        resultNodes.push(flatNode);

        if (this.isExpandable(flatNode)) {
            const childrenNodes = this.getChildren(node);
            if (Array.isArray(childrenNodes)) {
                this._flattenChildren(childrenNodes, level, resultNodes, parentMap);
            } else {
                childrenNodes.pipe(take(1)).subscribe(children => {
                    this._flattenChildren(children, level, resultNodes, parentMap);
                });
            }
        }
        return resultNodes;
    }

    _flattenChildren(children: T[], level: number, resultNodes: F[], parentMap: boolean[]): void {
        children.forEach((child, index) => {
            const childParentMap: boolean[] = parentMap.slice();
            childParentMap.push(index !== children.length - 1);
            this._flattenNode(child, level + 1, resultNodes, childParentMap);
        });
    }

    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData: T[]): F[] {
        const resultNodes: F[] = [];
        structuredData.forEach(node => this._flattenNode(node, 0, resultNodes, []));
        return resultNodes;
    }

    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F>): F[] {
        const results: F[] = [];
        const currentExpand: boolean[] = [];
        currentExpand[0] = true;

        nodes.forEach(node => {
            let expand = true;
            for (let i = 0; i <= this.getLevel(node); i++) {
                expand = expand && currentExpand[i];
            }
            if (expand) {
                results.push(node);
            }
            if (this.isExpandable(node)) {
                currentExpand[this.getLevel(node) + 1] = treeControl.isExpanded(node);
            }
        });
        return results;
    }
}

/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `NxTree`.
 * The nested tree nodes of type `T extends NxTreeNode` are flattened through `NxTreeFlattener`, and converted
 * to type `F extends NxFlatTreeNode` for `NxTree` to consume.
 */
export class NxTreeFlatDataSource<T extends NxTreeNode, F extends NxFlatTreeNode> extends DataSource<F> {
    _treeFlattener: NxTreeFlattener<T, F>;

    readonly _flattenedData = new BehaviorSubject<F[]>([]);

    readonly _expandedData = new BehaviorSubject<F[]>([]);

    readonly _data = new BehaviorSubject<T[]>([]);

    set data(value: T[]) {
        this._data.next(value);
        this._flattenedData.next(this._treeFlattener.flattenNodes(this.data));
        this.treeControl.dataNodes = this._flattenedData.value;
    }
    get data() {
        return this._data.value;
    }

    constructor(
        private readonly treeControl: FlatTreeControl<F>,
        initialData: T[] = [],
    ) {
        super();
        this._treeFlattener = new NxTreeFlattener();
        this.data = initialData;
    }

    connect(collectionViewer: CollectionViewer): Observable<F[]> {
        const changes = [collectionViewer.viewChange, this.treeControl.expansionModel.changed, this._flattenedData];
        return merge(...changes).pipe(
            map(() => {
                this._expandedData.next(this._treeFlattener.expandFlattenedNodes(this._flattenedData.value, this.treeControl));
                return this._expandedData.value;
            }),
        );
    }

    disconnect() {
        // no op
    }
}
