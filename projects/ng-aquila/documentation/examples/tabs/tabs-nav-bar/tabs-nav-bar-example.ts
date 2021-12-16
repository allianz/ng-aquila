import { Component } from '@angular/core';

/**
 * @title Tabs Navbar
 */
@Component({
    selector: 'tabs-nav-bar-example',
    templateUrl: './tabs-nav-bar-example.html',
    styleUrls: ['./tabs-nav-bar-example.css'],
})
export class TabsNavBarExampleComponent {
    links = [
        {
            label: 'Subpage 1',
            path: '...',
            disabled: false,
        },
        {
            label: 'Subpage 2',
            path: '...',
            disabled: false,
        },
        {
            label: 'Subpage 3',
            path: '...',
            disabled: true,
        },
    ];

    currentLink = this.links[0];

    setActiveLink(link: any) {
        if (!link.disabled) {
            this.currentLink = link;
        }
    }
}
