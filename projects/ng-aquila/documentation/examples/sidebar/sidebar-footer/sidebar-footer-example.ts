import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxSidebarComponent,
    NxSidebarFooterComponent,
    NxSidebarToggleComponent,
} from '@aposin/ng-aquila/sidebar';

/**
 * @title Side navigation with footer area
 */
@Component({
    selector: 'sidebar-footer-example',
    styleUrls: ['sidebar-footer-example.css'],
    templateUrl: './sidebar-footer-example.html',
    standalone: true,
    imports: [
        NxSidebarComponent,
        NxActionComponent,
        RouterLink,
        RouterLinkActive,
        NxIconComponent,
        NxActionIconDirective,
        NxSidebarFooterComponent,
        NxIconButtonComponent,
        NxSidebarToggleComponent,
    ],
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
