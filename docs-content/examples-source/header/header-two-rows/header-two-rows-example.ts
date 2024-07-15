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
    NxHeaderRowDirective,
} from '@aposin/ng-aquila/header';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Header Two Rows Example
 */
@Component({
    selector: 'header-two-rows-example',
    templateUrl: './header-two-rows-example.html',
    styleUrls: ['./header-two-rows-example.css'],
    standalone: true,
    imports: [
        NxHeaderComponent,
        NxHeaderRowDirective,
        NxHeaderBrandDirective,
        NxLinkComponent,
        NxHeaderActionsDirective,
        NxButtonComponent,
        NxHeaderNavigationComponent,
        NxHeaderNavigationItemDirective,
        NxHeaderLinkComponent,
        RouterLink,
        RouterLinkActive,
    ],
})
export class HeaderTwoRowsExampleComponent {}
