import { Component } from '@angular/core';

/**
 * @title Action with Router Example
 */
@Component({
    selector: 'action-with-router-example',
    styleUrls: ['action-with-router-example.css'],
    templateUrl: './action-with-router-example.html',
})
export class ActionWithRouterExampleComponent {
    actions = [
        {
            icon: 'file-text',
            label: 'All Files',
            query: { a: 1 },
        },
        {
            icon: 'calendar',
            label: 'Calendar',
            query: { a: 2 },
        },
        {
            icon: 'mail-o',
            label: 'Email',
            query: { a: 3 },
        },
        {
            icon: 'user-o',
            label: 'My Profile',
            query: { a: 4 },
        },
        {
            icon: 'file',
            label: 'Recent Downloads',
            query: { a: 5 },
        },
    ];
}
