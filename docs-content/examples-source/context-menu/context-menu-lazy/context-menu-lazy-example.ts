import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuContentDirective,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Lazy Context Menu Example
 */
@Component({
    selector: 'context-menu-lazy-example',
    templateUrl: './context-menu-lazy-example.html',
    styleUrls: ['./context-menu-lazy-example.css'],
    standalone: true,
    imports: [
        NxContextMenuComponent,
        NxContextMenuContentDirective,
        NxContextMenuItemComponent,
        NxIconButtonComponent,
        NxContextMenuTriggerDirective,
        NxIconComponent,
    ],
})
export class ContextMenuLazyExampleComponent {}
