import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMenuButtonComponent,
    NxMenuButtonIconDirective,
    NxMenuComponent,
    NxMenuItemDirective,
    NxMenuLinkDirective,
} from '@aposin/ng-aquila/menu';
import {
    NxFlatTreeControl,
    NxFlatTreeNode,
    NxTreeComponent,
    NxTreeFlatDataSource,
    NxTreeNode,
    NxTreeNodeActionItem,
    NxTreeNodeComponent,
    NxTreeNodeDefDirective,
    NxTreeNodeToggleDirective,
} from '@aposin/ng-aquila/tree';

/**
 * This interface defines a single node of the trees data structure.
 */
export interface MyTreeNode extends NxTreeNode {
    children?: MyTreeNode[];
    label?: string;
    icon?: string;
    query?: any;
}

/** Flat node with expandable and level information */
interface MyFlatTreeNode extends NxFlatTreeNode {
    label?: string;
    query?: any;
    icon?: string;
}

/**
 * @title Complete menu example
 */
@Component({
    selector: 'menu-example',
    templateUrl: './menu-example.html',
    styleUrls: ['menu-example.css'],
    standalone: true,
    imports: [
        NxPlainButtonComponent,
        NxIconComponent,
        NxMenuComponent,
        NxTreeComponent,
        NxTreeNodeDefDirective,
        NxTreeNodeComponent,
        NxMenuItemDirective,
        NxMenuLinkDirective,
        NxTreeNodeActionItem,
        RouterLink,
        NxMenuButtonComponent,
        NxTreeNodeToggleDirective,
        NxMenuButtonIconDirective,
        NxButtonComponent,
    ],
})
export class MenuExampleComponent {
    navigationData: MyTreeNode[] = [
        {
            label: 'Option 1',
            icon: 'file',
            children: [
                {
                    label: 'Option 1.1',
                    children: [
                        {
                            label: 'Option 1.2.1',
                            query: { a: '1.1.1' },
                        },
                        {
                            label: 'Option 1.1.2',
                            query: { a: '1.1.2' },
                        },
                        {
                            label: 'Option 1.1.3',
                            query: { a: '1.1.3' },
                        },
                    ],
                },
                {
                    label: 'Option 1.2',
                    children: [
                        {
                            label: 'Option 1.2.1',
                            query: { a: '1.2.1' },
                        },
                        {
                            label: 'Option 1.2.2',
                            query: { a: '1.2.2' },
                        },
                        {
                            label: 'Option 1.2.3',
                            query: { a: '1.2.3' },
                        },
                    ],
                },
                {
                    label: 'Option 1.3',
                    children: [
                        {
                            label: 'Option 1.3.1',
                            query: { a: '1.3.1' },
                        },
                        {
                            label: 'Option 1.3.2',
                            query: { a: '1.3.2' },
                        },
                        {
                            label: 'Option 1.3.3',
                            query: { a: '1.3.3' },
                        },
                    ],
                },
            ],
        },
        {
            label: 'Option 2',
            icon: 'user-o',
            children: [
                {
                    label: 'Option 2.1',
                    children: [
                        {
                            label: 'Option 2.2.1',
                            query: { a: '2.1.1' },
                        },
                        {
                            label: 'Option 2.1.2',
                            query: { a: '2.1.2' },
                        },
                        {
                            label: 'Option 2.1.3',
                            query: { a: '2.1.3' },
                        },
                    ],
                },
                {
                    label: 'Option 2.2',
                    children: [
                        {
                            label: 'Option 2.2.1',
                            query: { a: '2.2.1' },
                        },
                        {
                            label: 'Option 2.2.2',
                            query: { a: '2.2.2' },
                        },
                        {
                            label: 'Option 2.2.3',
                            query: { a: '2.2.3' },
                        },
                    ],
                },
                {
                    label: 'Option 2.3',
                    children: [
                        {
                            label: 'Option 2.3.1',
                            query: { a: '2.3.1' },
                        },
                        {
                            label: 'Option 2.3.2',
                            query: { a: '2.3.2' },
                        },
                        {
                            label: 'Option 2.3.3',
                            query: { a: '2.3.3' },
                        },
                    ],
                },
            ],
        },
        {
            label: 'Option 3',
            icon: 'user-o',
            children: [
                {
                    label: 'Option 3.1',
                    query: { a: '3.1' },
                },
                {
                    label: 'Option 3.2',
                    query: { a: '3.2' },
                },
                {
                    label: 'Option 3.3',
                    query: { a: '3.3' },
                },
            ],
        },
    ];

    _dataSource: NxTreeFlatDataSource<MyTreeNode, MyFlatTreeNode>;

    _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

    constructor() {
        this._treeControl = new NxFlatTreeControl();
        this._dataSource = new NxTreeFlatDataSource(
            this._treeControl,
            this.navigationData,
        );
    }

    _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;
    _isLink = (_: number, node: MyFlatTreeNode) => node.query;
}
