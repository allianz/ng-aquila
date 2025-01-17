import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';
import {
    NxFlatTreeControl,
    NxFlatTreeNode,
    NxTreeComponent,
    NxTreeFlatDataSource,
    NxTreeNode,
    NxTreeNodeActionItem,
    NxTreeNodeComponent,
    NxTreeNodeDefDirective,
    NxTreeNodePaddingDirective,
    NxTreeNodeToggleDirective,
} from '@aposin/ng-aquila/tree';

interface Query {
    a: string;
}

/**
 * This interface defines a single node of the trees data structure.
 */
export interface MyTreeNode extends NxTreeNode {
    label: string;
    icon?: string;
    query?: Query;
    children?: MyTreeNode[];
}

/** Flat node with expandable and level information */
interface MyFlatTreeNode extends NxFlatTreeNode {
    label: string;
    icon?: string;
    query?: Query;
}

/**
 * @title Outputs example
 */
@Component({
    selector: 'sidebar-outputs-example',
    templateUrl: './sidebar-outputs-example.html',
    styleUrls: ['sidebar-outputs-example.css'],
    imports: [
        NxSidebarComponent,
        NxTreeComponent,
        NxTreeNodeDefDirective,
        NxTreeNodeComponent,
        NxActionComponent,
        NxTreeNodePaddingDirective,
        NxTreeNodeActionItem,
        RouterLink,
        RouterLinkActive,
        NxIconComponent,
        NxActionIconDirective,
        NxTreeNodeToggleDirective,
        NxButtonComponent,
    ],
})
export class SidebarOutputsExampleComponent {
    navigationData: MyTreeNode[] = [
        {
            label: 'Option 1',
            icon: 'user-o',
            children: [
                {
                    label: 'Option 1.1',
                    query: { a: '1.1' },
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
                            children: [
                                {
                                    label: 'Option 1.2.3.1',
                                    children: [
                                        {
                                            label: 'Option 1.2.3.1.1',
                                            query: { a: '1.2.3.1.1' },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Option 1.3',
                    query: { a: '1.3' },
                },
            ],
        },
        {
            label: 'Option 2',
            icon: 'file',
            children: [
                {
                    label: 'Option 2.1',
                    query: { a: '2.1' },
                },
                {
                    label: 'Option 2.2',
                    query: { a: '2.2' },
                },
                {
                    label: 'Option 2.3',
                    query: { a: '2.3' },
                },
            ],
        },
        {
            label: 'Option 3',
            icon: 'file',
            query: { a: '3' },
        },
    ];

    _dataSource: NxTreeFlatDataSource<MyTreeNode, MyFlatTreeNode>;

    _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

    logMessage!: string;
    messages: string[] = [];

    constructor() {
        this._treeControl = new NxFlatTreeControl();
        this._dataSource = new NxTreeFlatDataSource(
            this._treeControl,
            this.navigationData,
        );
    }

    _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;

    log(value: number) {
        this.messages.push('New width value: ' + value);
        this.logMessage = this.messages.join('\n');
    }
}
