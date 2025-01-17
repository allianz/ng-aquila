import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxHeaderActionsDirective,
    NxHeaderAppTitleDirective,
    NxHeaderBrandDirective,
    NxHeaderComponent,
    NxHeaderLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderRowDirective,
} from '@aposin/ng-aquila/header';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Header with co-branding example
 */
@Component({
    selector: 'header-cobranding-example',
    templateUrl: './header-cobranding-example.html',
    styleUrls: ['header-cobranding-example.css'],
    imports: [
        NxHeaderComponent,
        NxHeaderRowDirective,
        NxHeaderBrandDirective,
        NxLinkComponent,
        NxHeaderAppTitleDirective,
        NxHeaderActionsDirective,
        NxHeaderNavigationComponent,
        NxHeaderNavigationItemDirective,
        NxHeaderLinkComponent,
        RouterLink,
        RouterLinkActive,
        NxPlainButtonComponent,
        NxIconComponent,
    ],
})
export class HeaderCobrandingExampleComponent {}
