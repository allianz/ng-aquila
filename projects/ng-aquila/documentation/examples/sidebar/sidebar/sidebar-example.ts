import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';

/**
 * @title Side navigation with Actions
 */
@Component({
    selector: 'sidebar-example',
    styleUrls: ['sidebar-example.css'],
    templateUrl: './sidebar-example.html',
    standalone: true,
    imports: [
        NxSidebarComponent,
        NxActionComponent,
        RouterLink,
        RouterLinkActive,
        NxIconComponent,
        NxActionIconDirective,
    ],
})
export class SidebarExampleComponent {
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
