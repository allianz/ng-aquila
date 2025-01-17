import { Component } from '@angular/core';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxIndicatorComponent } from '@aposin/ng-aquila/indicator';

interface Action {
    icon: string;
    label: string;
    notification?: boolean;
    notificationCount?: number;
}

/**
 * @title Indicator Example
 */
@Component({
    selector: 'action-indicator-example',
    styleUrls: ['./action-indicator-example.css'],
    templateUrl: './action-indicator-example.html',
    imports: [
        NxActionComponent,
        NxIconComponent,
        NxActionIconDirective,
        NxIndicatorComponent,
    ],
})
export class ActionIndicatorExampleComponent {
    actions: Action[] = [
        {
            icon: 'file-text',
            label: 'All Files',
            notification: false,
        },
        {
            icon: 'calendar',
            label: 'Calendar',
            notification: true,
        },
        {
            icon: 'mail-o',
            label: 'Email',
            notification: true,
            notificationCount: 105,
        },
        {
            icon: 'user-o',
            label: 'My Profile',
            notification: true,
            notificationCount: 4,
        },
        {
            icon: 'file',
            label: 'Recent Downloads',
        },
    ];

    selectedAction: Action = this.actions[0];

    onSelect(action: Action) {
        this.selectedAction = action;
    }

    getIndicatorText(notificationCount: number) {
        if (!notificationCount) {
            return '';
        }
        return notificationCount > 99 ? '99+' : notificationCount;
    }

    getAriaLabel(
        label: string,
        notificationCount = '',
        hasNotification?: boolean,
    ) {
        if (hasNotification) {
            return `${label} ${notificationCount} new notifications available`;
        }

        return `${label}`;
    }
}
