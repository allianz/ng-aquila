import { Component } from '@angular/core';

/**
* @title Menu item with large indentation and button icons
*/
@Component({
  selector: 'menu-item-with-icons-example',
  templateUrl: 'menu-item-with-icons-example.html',
  styleUrls: ['menu-item-with-icons-example.css']
})
export class MenuItemWithIconsExampleComponent {
  menuData = [
    {
      label: 'Option 1',
      expanded: false,
      icon: 'file',
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
      icon: 'file',
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
      label: 'Option 3',
      icon: 'user-o'
    }
  ];

  onClick(item) {
    item.expanded = !item.expanded;
  }
}
