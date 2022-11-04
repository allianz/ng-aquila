/**
 * This interface defines a single node of the trees data structure.
 */
export interface NxTreeNode {
    children?: NxTreeNode[];
}

/**
 * Flat node with level information.
 */
export interface NxFlatTreeNode {
    expandable: boolean;
    level: number;
}
