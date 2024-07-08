import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxIndicatorComponent } from '@aposin/ng-aquila/indicator';
import {
    NxTabComponent,
    NxTabGroupComponent,
    NxTabLabelDirective,
} from '@aposin/ng-aquila/tabs';

/**
 * @title Tab group with indicators
 */
@Component({
    selector: 'tabs-with-indicator-example',
    templateUrl: './tabs-with-indicator-example.html',
    styleUrls: ['./tabs-with-indicator-example.css'],
    standalone: true,
    imports: [
        NxTabGroupComponent,
        NgFor,
        NxTabComponent,
        NxTabLabelDirective,
        NgIf,
        NxIndicatorComponent,
    ],
})
export class TabsWithIndicatorExampleComponent {
    tabs = [
        {
            label: 'First tab',
            notification: false,
        },
        {
            label: 'Second tab',
            notification: true,
        },
        {
            label: 'Third tab',
            notification: true,
            notificationCount: 2,
        },
        {
            label: 'Fourth tab',
            notification: true,
            notificationCount: 105,
            disabled: true,
        },
    ];

    setSelectedTab(selectedTab: number) {
        this.tabs[selectedTab];
    }

    getIndicatorText(notificationCount: number) {
        if (!notificationCount) {
            return '';
        }
        return notificationCount > 99 ? '99+' : notificationCount;
    }

    getAriaLabel(notificationCount: number) {
        if (!notificationCount) {
            return 'new notifications available';
        }
        return notificationCount > 99
            ? 'more than 99 new notifications available'
            : notificationCount + ' new notifications available';
    }
}
