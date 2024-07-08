import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxHeaderActionsDirective,
    NxHeaderAppTitleDirective,
    NxHeaderBrandDirective,
    NxHeaderComponent,
} from '@aposin/ng-aquila/header';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Header with functional icons example
 */
@Component({
    selector: 'header-icons-example',
    templateUrl: './header-icons-example.html',
    styleUrls: ['./header-icons-example.css'],
    standalone: true,
    imports: [
        NxHeaderComponent,
        NxHeaderBrandDirective,
        NxLinkComponent,
        NxHeaderAppTitleDirective,
        NxHeaderActionsDirective,
        NxPlainButtonComponent,
        NxIconComponent,
        RouterLink,
    ],
})
export class HeaderIconsExampleComponent {}
