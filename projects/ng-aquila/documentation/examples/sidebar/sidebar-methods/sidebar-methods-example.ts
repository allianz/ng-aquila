import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
    NxActionComponent,
    NxActionIconDirective,
} from '@aposin/ng-aquila/action';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';

/**
 * @title Side navigation Methods
 */
@Component({
    selector: 'sidebar-methods-example',
    styleUrls: ['sidebar-methods-example.css'],
    templateUrl: './sidebar-methods-example.html',
    imports: [
        NxSidebarComponent,
        NxActionComponent,
        RouterLink,
        RouterLinkActive,
        NxIconComponent,
        NxActionIconDirective,
        NxButtonComponent,
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
    ],
})
export class SidebarMethodsExampleComponent {
    expandedWidth = 350;

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
