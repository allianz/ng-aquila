import { Component } from '@angular/core';
import { NxTreeFlatDataSource, NxFlatTreeControl, NxTreeNode, NxFlatTreeNode } from '@aposin/ng-aquila/tree';

interface Link {
  label: string;
  query: any;
}
/**
  This interface defines a single node of the trees data structure.
*/
export interface MyTreeNode extends NxTreeNode {
  children?: MyTreeNode[];
  links?: Link[];
  label?: string;
  icon?: string;
}

/** Flat node with expandable and level information */
interface MyFlatTreeNode extends NxFlatTreeNode {
  label?: string;
  links?: Link[];
  icon?: string;
}

/**
* @title Complete menu example
*/
@Component({
  selector: 'menu-example',
  templateUrl: './menu-example.html',
  styleUrls: ['menu-example.css']
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
              links: [
              {
                label: 'Option 1.2.1',
                query: { a: '1.1.1' }
              },
              {
                label: 'Option 1.1.2',
                query: { a: '1.1.2' }
              },
              {
                label: 'Option 1.1.3',
                query: { a: '1.1.3' }
              }
              ]
            }
          ]
        },
        {
          label: 'Option 1.2',
          children: [
            {
              links: [
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
                  query: { a: '1.2.3' }
                }
              ]
            }
          ]
        },
        {
          label: 'Option 1.3',
          children: [
            {
              links: [
                {
                  label: 'Option 1.3.1',
                  query: { a: '1.3.1' }
                },
                {
                  label: 'Option 1.3.2',
                  query: { a: '1.3.2' }
                },
                {
                  label: 'Option 1.3.3',
                  query: { a: '1.3.3' }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Option 2',
      icon: 'user-o',
      children: [
        {
          label: 'Option 2.1',
          children: [
            {
              links: [
                {
                  label: 'Option 2.2.1',
                  query: { a: '2.1.1' }
                },
                {
                  label: 'Option 2.1.2',
                  query: { a: '2.1.2' }
                },
                {
                  label: 'Option 2.1.3',
                  query: { a: '2.1.3' }
                }
              ]
            }
          ]
        },
        {
          label: 'Option 2.2',
          children: [
            {
              links: [
                {
                  label: 'Option 2.2.1',
                  query: { a: '2.2.1' }
                },
                {
                  label: 'Option 2.2.2',
                  query: { a: '2.2.2' }
                },
                {
                  label: 'Option 2.2.3',
                  query: { a: '2.2.3' }
                }
              ]
            }
          ]
        },
        {
          label: 'Option 2.3',
          children: [
            {
              links: [
                {
                  label: 'Option 2.3.1',
                  query: { a: '2.3.1' }
                },
                {
                  label: 'Option 2.3.2',
                  query: { a: '2.3.2' }
                },
                {
                  label: 'Option 2.3.3',
                  query: { a: '2.3.3' }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Option 3',
      icon: 'user-o',
      children: [
        {
          links: [
            {
              label: 'Option 3.1',
              query: { a: '3.1' }
            },
            {
              label: 'Option 3.2',
              query: { a: '3.2' }
            },
            {
              label: 'Option 3.3',
              query: { a: '3.3' }
            }
          ]
        }
      ]
    }
  ];

  _dataSource: NxTreeFlatDataSource<MyTreeNode, MyFlatTreeNode>;

  _treeControl: NxFlatTreeControl<MyFlatTreeNode>;

  constructor() {
    this._treeControl = new NxFlatTreeControl();
    this._dataSource = new NxTreeFlatDataSource(this._treeControl, this.navigationData);
  }

  _hasChild = (_: number, node: NxFlatTreeNode) => node.expandable;
}
