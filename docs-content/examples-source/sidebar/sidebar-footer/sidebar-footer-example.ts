import { Component } from '@angular/core';

/**
 * @title Side navigation with footer area
 */
@Component({
    selector: 'sidebar-footer-example',
    styleUrls: ['sidebar-footer-example.css'],
    templateUrl: './sidebar-footer-example.html',
})
export class SidebarFooterExampleComponent {
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
