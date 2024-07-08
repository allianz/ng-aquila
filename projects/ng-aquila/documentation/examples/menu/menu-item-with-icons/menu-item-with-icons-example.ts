import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMenuButtonComponent,
    NxMenuButtonIconDirective,
    NxMenuItemDirective,
    NxMenuLinkDirective,
} from '@aposin/ng-aquila/menu';

interface MenuChild {
    label: string;
}

interface MenuItem {
    label: string;
    expanded?: boolean;
    icon: string;
    children?: MenuChild[];
}

/**
 * @title Menu item with large indentation and button icons
 */
@Component({
    selector: 'menu-item-with-icons-example',
    templateUrl: 'menu-item-with-icons-example.html',
    styleUrls: ['menu-item-with-icons-example.css'],
    standalone: true,
    imports: [
        NgFor,
        NxMenuButtonComponent,
        NxMenuItemDirective,
        NxIconComponent,
        NxMenuButtonIconDirective,
        NgIf,
        NxMenuLinkDirective,
    ],
})
export class MenuItemWithIconsExampleComponent {
    menuData: MenuItem[] = [
        {
            label: 'Option 1',
            expanded: false,
            icon: 'file',
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
            icon: 'file',
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
            icon: 'user-o',
        },
    ];

    onClick(item: MenuItem) {
        item.expanded = !item.expanded;
    }
}
