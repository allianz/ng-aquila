import { Component } from '@angular/core';
import {
    TAB_NAV_BAR_DEFAULT_OPTIONS,
    TabNavBarDefaultOptions,
} from '@aposin/ng-aquila/tabs';

const myDefaultOptions: TabNavBarDefaultOptions = {
    appearance: 'expert',
};

/**
 * @title Injection Token in Tabs Navbar
 */
@Component({
    selector: 'tabs-nav-bar-injection-token-example',
    templateUrl: './tabs-nav-bar-injection-token-example.html',
    styleUrls: ['./tabs-nav-bar-injection-token-example.css'],
    providers: [
        { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: myDefaultOptions },
    ],
})
export class TabsNavBarInjectionTokenExampleComponent {
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
