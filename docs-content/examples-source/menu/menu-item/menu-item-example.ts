import { Component } from '@angular/core';

/**
* @title Menu item
*/
@Component({
  selector: 'menu-item-example',
  templateUrl: 'menu-item-example.html',
  styleUrls: ['menu-item-example.css']
})
export class MenuItemExampleComponent {
  menuData = [
    {
      label: 'Option 1',
      expanded: false,
      children: [
        {
          label: 'Option 1.1'
        },
        {
          label: 'Option 1.2'
        },
        {
          label: 'Option 1.3'
        }
      ]
    },
    {
      label: 'Option 2',
      expanded: false,
      children: [
        {
          label: 'Option 2.1'
        },
        {
          label: 'Option 2.2'
        },
        {
          label: 'Option 2.3'
        }
      ]
    },
    {
      label: 'Option 3'
    }
  ];

  onClick(item) {
    item.expanded = !item.expanded;
  }
}
