import { Component, OnInit } from '@angular/core';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

interface Action {
    icon: string;
    label: string;
    notification?: boolean;
    notificationCount?: number;
}

/**
 * @title Action Example
 */
@Component({
    selector: 'action-example',
    styleUrls: ['./action-example.css'],
    templateUrl: './action-example.html',
    imports: [NxActionComponent, NxIconComponent, NxActionIconDirective],
})
export class ActionExampleComponent implements OnInit {
    actions: Action[] = [
        {
            icon: 'file-text',
            label: 'All Files',
        },
        {
            icon: 'calendar',
            label: 'Calendar',
        },
        {
            icon: 'mail-o',
            label: 'Email',
        },
        {
            icon: 'user-o',
            label: 'My Profile',
        },
        {
            icon: 'file',
            label: 'Recent Downloads',
        },
    ];

    selectedAction!: Action;

    ngOnInit(): void {
        this.selectedAction = this.actions[1];
    }

    onSelect(action: Action) {
        this.selectedAction = action;
    }
}
