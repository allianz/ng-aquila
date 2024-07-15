import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxHeaderActionsDirective,
    NxHeaderBrandDirective,
    NxHeaderComponent,
    NxHeaderLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
} from '@aposin/ng-aquila/header';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Single Row Header Example
 */
@Component({
    selector: 'header-example',
    templateUrl: './header-example.html',
    styleUrls: ['./header-example.css'],
    standalone: true,
    imports: [
        NxHeaderComponent,
        NxHeaderBrandDirective,
        NxLinkComponent,
        NxHeaderNavigationComponent,
        NxHeaderNavigationItemDirective,
        NxHeaderLinkComponent,
        RouterLink,
        RouterLinkActive,
        NxHeaderActionsDirective,
        NxButtonComponent,
    ],
})
export class HeaderExampleComponent {}
