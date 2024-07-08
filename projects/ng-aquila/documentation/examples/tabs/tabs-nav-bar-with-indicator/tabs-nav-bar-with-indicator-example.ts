import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxIndicatorComponent } from '@aposin/ng-aquila/indicator';
import {
    NxTabLinkDirective,
    NxTabNavBarComponent,
} from '@aposin/ng-aquila/tabs';

/**
 * @title Tabs Navbar with Indicators
 */
@Component({
    selector: 'tabs-nav-bar-with-indicator-example',
    templateUrl: './tabs-nav-bar-with-indicator-example.html',
    styleUrls: ['./tabs-nav-bar-with-indicator-example.css'],
    standalone: true,
    imports: [
        NxTabNavBarComponent,
        NgFor,
        NxTabLinkDirective,
        RouterLink,
        NgIf,
        NxIndicatorComponent,
    ],
})
export class TabsNavBarWithIndicatorExampleComponent {
    links = [
        {
            label: 'First tab',
            path: '...',
            notification: false,
        },
        {
            label: 'Second tab',
            path: '...',
            notification: true,
        },
        {
            label: 'Third tab',
            path: '...',
            notification: true,
            notificationCount: 5,
        },
    ];

    currentLink = this.links[0];

    setActiveLink(link: any) {
        this.currentLink = link;
    }

    getAriaLabel(notificationCount: number) {
        if (!notificationCount) {
            return 'new notifications available';
        }
        return `${notificationCount} new notifications available`;
    }
}
