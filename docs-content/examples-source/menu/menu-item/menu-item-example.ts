import { Component } from '@angular/core';

interface MenuChild {
    label: string;
}

interface MenuItem {
    label: string;
    expanded?: boolean;
    children?: MenuChild[];
}

/**
 * @title Menu item
 */
@Component({
    selector: 'menu-item-example',
    templateUrl: 'menu-item-example.html',
    styleUrls: ['menu-item-example.css'],
})
export class MenuItemExampleComponent {
    menuData: MenuItem[] = [
        {
            label: 'Option 1',
            expanded: false,
            children: [
                {
                    label: 'Option 1.1',
                },
                {
                    label: 'Option 1.2',
                },
                {
                    label: 'Option 1.3',
                },
            ],
        },
        {
            label: 'Option 2',
            expanded: false,
            children: [
                {
                    label: 'Option 2.1',
                },
                {
                    label: 'Option 2.2',
                },
                {
                    label: 'Option 2.3',
                },
            ],
        },
        {
            label: 'Option 3',
        },
    ];

    onClick(item: any) {
        item.expanded = !item.expanded;
    }
}
