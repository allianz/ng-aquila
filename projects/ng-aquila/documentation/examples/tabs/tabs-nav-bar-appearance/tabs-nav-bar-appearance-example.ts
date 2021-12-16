import { Component } from '@angular/core';

interface Link {
    label: string;
    path: string;
    disabled: boolean;
}

/**
 * @title Appearance for Tabs Navbar
 */
@Component({
    selector: 'tabs-nav-bar-appearance-example',
    templateUrl: './tabs-nav-bar-appearance-example.html',
    styleUrls: ['./tabs-nav-bar-appearance-example.css'],
})
export class TabsNavBarAppearanceExampleComponent {
    links: Link[] = [
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

    setActiveLink(link: Link) {
        if (!link.disabled) {
            this.currentLink = link;
        }
    }
}
