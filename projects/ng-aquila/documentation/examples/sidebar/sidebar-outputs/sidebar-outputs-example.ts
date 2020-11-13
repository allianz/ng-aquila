import { Component } from '@angular/core';
import { NxTreeFlatDataSource, NxFlatTreeControl, NxTreeNode, NxFlatTreeNode } from '@aposin/ng-aquila/tree';
import { Observable, of } from 'rxjs';

/**
  This interface defines a single node of the trees data structure.
*/
export interface MyTreeNode extends NxTreeNode {
  label: string;
  icon?: string;
  query?: any;
  children?: MyTreeNode[];
}

/** Flat node with expandable and level information */
interface MyFlatTreeNode extends NxFlatTreeNode {
  label: string;
  icon?: string;
  query?: any;
}

/**
* @title Outputs example
*/
@Component({
  styleUrls: ['sidebar-outputs-example.css'],
  templateUrl: './sidebar-outputs-example.html'
})
export class SidebarOutputsExampleComponent {
  navigationData: MyTreeNode[] = [
    {
      label: 'Option 1',
      icon: 'user-o',
      children: [
        {
          label: 'Option 1.1',
          query: { a: '1.1' }
        },
        {
          label: 'Option 1.2',
          children: [
            {
              label: 'Option 1.2.1',
              query: { a: '1.2.1' }
            },
            {
              label: 'Option 1.2.2',
              query: { a: '1.2.2' }
            },
            {
              label: 'Option 1.2.3',
              children: [
                {
                  label: 'Option 1.2.3.1',
                  children: [
                    {
                      label: 'Option 1.2.3.1.1',
                      query: { a: '1.2.3.1.1' }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Option 1.3',
          query: { a: '1.3' }
        }
      ]
    },
    {
      label: 'Option 2',
      icon: 'file',
      children: [
        {
          label: 'Option 2.1',
          query: { a: '2.1' }
        },
        {
          label: 'Option 2.2',
          query: { a: '2.2' }
        },
        {
          label: 'Option 2.3',
          query: { a: '2.3' }
        }
      ]
    },
    {
      label: 'Option 3',
      icon: 'file',
      query: { a: '3' }
    }
  ];

  _dataSource: NxTreeFlatDataSource<MyTreeNode, MyFlatTreeNode>;

  _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

  logMessage: string;
  messages = [];

  constructor() {
    this._treeControl = new NxFlatTreeControl();
    this._dataSource = new NxTreeFlatDataSource(this._treeControl, this.navigationData);
  }

  _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;

  log(value) {
    this.messages.push('New width value: ' + value);
    this.logMessage = this.messages.join('\n');
  }
}
