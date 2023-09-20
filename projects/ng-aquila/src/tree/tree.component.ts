import { FocusableOption, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, HOME, LEFT_ARROW, NUMPAD_MULTIPLY, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    IterableChangeRecord,
    IterableDiffer,
    IterableDiffers,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxTreeNodeOutletDirective } from './outlet';

/**
 * Wrapper for the CdkTree with custom design styles and keyboard nav mechanics.
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
        class: 'nx-tree cdk-tree',
        role: 'tree',
        '[attr.tabindex]': '_tabIndex',
        '(keydown)': '_handleKeydown($event)',
        '(focus)': 'focus()',
    },
    styleUrls: ['tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: CdkTree, useExisting: NxTreeComponent }],
})
export class NxTreeComponent<T> extends CdkTree<T> implements OnDestroy, OnInit {
    // Outlets within the tree's template where the dataNodes will be inserted.
    @ViewChild(NxTreeNodeOutletDirective, { static: true }) _nodeOutlet!: NxTreeNodeOutletDirective;

    /** The node map map data nodes to CdkTreeNodes */
    protected nodeMap: Map<T, FocusableOption> = new Map<T, FocusableOption>();

    /** A map from parent node to a list of children. */
    protected childrenMap: Map<T | undefined, T[]> = new Map<T | undefined, T[]>();

    /** A map from node data to its parent node data. */
    protected parentMap: Map<T, T> = new Map<T, T>();

    /** Current focused node data. */
    protected _focusedData!: T;

    /** Tab index for the tree. */
    _tabIndex = 0;

    /**
     * User defined tab index.
     * When it is not null, use user defined tab index. Otherwise use _tabIndex.
     */
    _userTabIndex: number | null = null;

    @Input()
    set tabIndex(value: number) {
        this._userTabIndex = value;
    }

    /** Subject that emits when the component has been destroyed. */
    private readonly _wrapperOnDestroy = new Subject<void>();

    constructor(
        _wrapperDiffers: IterableDiffers,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly dir: Directionality | null,
        protected readonly _elementRef: ElementRef,
        protected readonly _focusMonitor: FocusMonitor,
    ) {
        super(_wrapperDiffers, _cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this._monitorTreeFocus();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._wrapperOnDestroy.next();
        this._wrapperOnDestroy.complete();
    }

    /** Get current focused data */
    get focusedData() {
        return this._focusedData;
    }

    /** Add tree node to data list based on owner of parent view container. */
    insertToA11yNodeTracking(index: number, data: T, node: FocusableOption, parentData?: T) {
        this.nodeMap.set(data, node);
        if (parentData) {
            this.parentMap.set(data, parentData);
        }
        // prevent duplicate items when node expanded
        const hasData = this._getChildrenList(parentData).includes(data);
        if (!hasData) {
            this._getChildrenList(parentData).splice(index, 0, data);
        }
    }

    /** Remove a node data from node list based on the owner of view container. */
    removeFromA11yNodeTracking(index: number, parentData?: T) {
        const nodeList = this._getChildrenList(parentData);
        const removed = nodeList.splice(index, 1)[0];
        if (removed && removed === this._focusedData) {
            this._changeFocusedData(this._getNextVisibleNode());
        }
        this.nodeMap.delete(removed);
        this.parentMap.delete(removed);
        this.childrenMap.delete(removed);
    }

    /** Update node's index information based on the owner of view container. */
    moveInA11yNodeTracking(previousIndex: number, currentIndex: number, parentData?: T) {
        const nodeList = this._getChildrenList(parentData);
        const target = nodeList.splice(previousIndex, 1);
        nodeList.splice(currentIndex, 0, target[0]);
    }

    /** When a tree node is focused, update the current focused data. */
    updateFocusedData(newFocusedData: T) {
        this._focusedData = newFocusedData;
    }

    /** Focus first node when the tree is focused */
    focus() {
        this._focusedData ? this._changeFocusedData(this._focusedData) : this.focusFirstVisibleNode();
    }

    /** Change focus to first visible node in the tree. */
    focusFirstVisibleNode() {
        this._changeFocusedData(this._getFirstVisibleNode());
    }

    /** Change focus to last visible node in the tree. */
    focusLastVisibleNode() {
        this._changeFocusedData(this._getLastVisibleNode());
    }

    /** Change focus to previous visible node. */
    focusPreviousVisibleNode() {
        if (!this._focusedData) {
            return this.focusLastVisibleNode();
        }
        this._changeFocusedData(this._getPreviousVisibleNode());
    }

    /** Change focus to next visible node. */
    focusNextVisibleNode() {
        if (!this._focusedData) {
            return this.focusFirstVisibleNode();
        }
        this._changeFocusedData(this._getNextVisibleNode());
    }

    /** Collapse the current node if it's expanded. Otherwise move to parent. */
    collapseCurrentFocusedNode() {
        if (this._focusedData && this.treeControl) {
            if (this.treeControl.isExpanded(this._focusedData)) {
                this.treeControl.collapse(this._focusedData);
            } else {
                this._changeFocusedData(this._getParentNode());
            }
        }
    }

    /** Expand the current node if it's not expanded. Otherwise move to its first child. */
    expandCurrentFocusedNode() {
        if (this._focusedData && this.treeControl) {
            if (this.treeControl.isExpanded(this._focusedData)) {
                this._changeFocusedData(this._getNextVisibleNode());
            } else {
                this.treeControl.expand(this._focusedData);
            }
        }
    }

    /** Expand all the nodes in the tree */
    expandAllNodes() {
        if (this.treeControl) {
            this.treeControl.expandAll();
        }
    }

    /** Expand the current node if it's not expanded. Otherwise move to its first child. */
    toggleCurrentFocusedNode() {
        if (this._focusedData && this.treeControl) {
            this.treeControl.toggle(this._focusedData);
        }
    }

    _isRtl() {
        return this.dir && this.dir.value === 'rtl';
    }

    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    _handleKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case HOME:
                this.focusFirstVisibleNode();
                event.preventDefault();
                break;
            case END:
                this.focusLastVisibleNode();
                event.preventDefault();
                break;
            case UP_ARROW:
                this.focusPreviousVisibleNode();
                event.preventDefault();
                break;
            case DOWN_ARROW:
                this.focusNextVisibleNode();
                event.preventDefault();
                break;
            case LEFT_ARROW:
                this._isRtl() ? this.expandCurrentFocusedNode() : this.collapseCurrentFocusedNode();
                event.preventDefault();
                break;
            case RIGHT_ARROW:
                this._isRtl() ? this.collapseCurrentFocusedNode() : this.expandCurrentFocusedNode();
                event.preventDefault();
                break;
            case NUMPAD_MULTIPLY:
                this.expandAllNodes();
                event.preventDefault();
                break;
            default:
        }
    }

    /** Focus the tree node component with new focused data. */
    _changeFocusedData(newFocused: T | undefined) {
        if (newFocused) {
            this._focusedData = newFocused;
            if (this.nodeMap.has(this._focusedData)) {
                this.nodeMap.get(this._focusedData)!.focus();
            }
        }
    }

    /** Returns the data of the first visible tree node in the tree. */
    _getFirstVisibleNode(): T | undefined {
        const nodeList = this._getChildrenList();
        return nodeList[0];
    }

    /** Returns the data of the last visible tree node in the tree. */
    _getLastVisibleNode(): T | undefined {
        const nodeList = this._getChildrenList();
        return this._getLastChild(nodeList[nodeList.length - 1]);
    }

    /** Returns the previous visible tree node of current focused data. */
    _getPreviousVisibleNode(): T | undefined {
        if (!this._focusedData) {
            return;
        }

        const parent = this.parentMap.get(this._focusedData);
        const nodeList = this.childrenMap.get(parent);
        const index = nodeList!.indexOf(this._focusedData);
        const isExpanded = this.treeControl.isExpanded(this._focusedData);
        if (!isExpanded) {
            this._removeChildren();
        }

        if (index === 0) {
            return parent;
        } else if (index > 0) {
            return this._getLastChild(nodeList![index - 1]);
        }
        return undefined;
    }

    /** Returns the next visible tree node data of current focused data. */
    _getNextVisibleNode(): T | undefined {
        if (!this._focusedData) {
            return;
        }
        const isExpanded = this.treeControl.isExpanded(this._focusedData);
        if (!isExpanded) {
            this._removeChildren();
        }

        // Always return first child if the node is expanded
        if (this.childrenMap.has(this._focusedData) && this.treeControl && isExpanded) {
            const childNodeList = this._getChildrenList(this._focusedData);
            if (childNodeList.length) {
                return childNodeList[0];
            }
        }
        // Or return next sibling / parent's next child if any
        let currentData: T | undefined = this._focusedData;

        while (currentData) {
            const parent = this.parentMap.get(currentData);
            const nodeList = this.childrenMap.get(parent);
            const index = nodeList!.indexOf(currentData);
            if (index === nodeList!.length - 1) {
                currentData = parent;
            } else if (index > -1) {
                return nodeList![index + 1];
            }
        }
        return undefined;
    }

    /** Returns the parent of current focused node. */
    _getParentNode(): T | undefined {
        if (this.parentMap.has(this._focusedData)) {
            // For nested tree
            this._changeFocusedData(this.parentMap.get(this._focusedData));
        } else if (this.treeControl.getLevel) {
            // For flat tree
            const nodeList = this._getChildrenList();
            const index = nodeList.indexOf(this._focusedData);
            const level = this.treeControl.getLevel(this._focusedData) - 1;
            if (index <= 0) {
                return;
            }
            for (let i = index - 1; i >= 0; i--) {
                if (this.treeControl.getLevel(nodeList[i]) === level) {
                    return nodeList[i];
                }
            }
        }
        return undefined;
    }

    /** Remove all nodes under collapsed tree */
    _removeChildren() {
        const parent = this.parentMap.get(this._focusedData);
        const nodeList = this._getChildrenList();
        const currentFocusIndex = nodeList.indexOf(this._focusedData);
        const children = this._getNestLevels(nodeList, currentFocusIndex);

        children.forEach(child => {
            this.nodeMap.delete(child);
            this.parentMap.delete(child);
        });
        const removedList = nodeList.filter(node => !children.includes(node));
        this.childrenMap.set(parent, removedList);
    }

    /** Get all nest nodes under an expandable node. */
    _getNestLevels(data: any[], fromIndex: number) {
        const fromLevel = data[fromIndex]?.level;
        const selectedObjects = [];
        let currentIndex = fromIndex + 1;

        while (currentIndex < data.length) {
            const currentObject = data[currentIndex];

            if (currentObject.level <= fromLevel) {
                break; // Stop when a higher-level object is encountered
            }

            selectedObjects.push(currentObject);
            currentIndex++;
        }

        return selectedObjects;
    }

    /**
     * Returns the data of list of children in the current `parentData` node's view container.
     * If there's no parent, return the tree nodes in the tree's view container.
     */
    _getChildrenList(parentData?: T): T[] {
        if (!this.childrenMap.has(parentData)) {
            this.childrenMap.set(parentData, []);
        }
        return this.childrenMap.get(parentData)!;
    }

    /**
     * Returns the data of last visible elements in the sub-tree rooted at `targetNode`.
     */
    _getLastChild(targetNode: T) {
        let currentData = targetNode;
        while (currentData && this.childrenMap.has(currentData) && this.treeControl && this.treeControl.isExpanded(currentData)) {
            const childNodeList = this._getChildrenList(currentData);
            if (childNodeList.length) {
                currentData = childNodeList[childNodeList.length - 1];
            } else {
                break;
            }
        }
        return currentData;
    }

    /**
     * Extended CdkTree method to track new nodes for a11y.
     */
    insertNode(nodeData: T, index: number, viewContainer?: ViewContainerRef, parentData?: T) {
        super.insertNode(nodeData, index, viewContainer, parentData);

        if (CdkTreeNode.mostRecentTreeNode) {
            this.insertToA11yNodeTracking(index, nodeData, CdkTreeNode.mostRecentTreeNode as CdkTreeNode<T>, parentData);
            CdkTreeNode.mostRecentTreeNode.focus();
        }
    }

    /**
     * ⚠️  Here we override the method from cdk tree ⚠️
     * Adds some extra method calls to update the a11y node tracking.
     */
    renderNodeChanges(
        data: T[],
        // eslint-disable-next-line @typescript-eslint/dot-notation
        dataDiffer: IterableDiffer<T> = this['_dataDiffer'], // accessing private super class member
        viewContainer: ViewContainerRef = this._nodeOutlet.viewContainer,
        parentData?: T,
    ) {
        super.renderNodeChanges(data, dataDiffer, viewContainer, parentData);

        const changes = dataDiffer.diff(data);

        if (!changes) {
            return;
        }

        changes.forEachOperation((item: IterableChangeRecord<T>, adjustedPreviousIndex: number | null, currentIndex: number | null) => {
            if (currentIndex == null) {
                this.removeFromA11yNodeTracking(adjustedPreviousIndex!, parentData);
            } else if (item.previousIndex !== null) {
                this.moveInA11yNodeTracking(adjustedPreviousIndex!, currentIndex, parentData);
            }
        });
    }

    /**
     * Monitor focus of the tree. When the tree is focused, change the tab index to -1 so TAB
     * can move the focus out of the tree. When the tree is blurred, change back the tab index.
     */
    _monitorTreeFocus() {
        this._focusMonitor
            .monitor(this._elementRef.nativeElement, true)
            .pipe(takeUntil(this._wrapperOnDestroy))
            .subscribe(origin => {
                const newTabIndex = origin ? -1 : this._userTabIndex || 0;
                if (this._tabIndex !== newTabIndex) {
                    this._tabIndex = newTabIndex;
                    this._cdr.markForCheck();
                }
            });
    }
}
