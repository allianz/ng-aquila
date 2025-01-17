import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';

/**
 * @title Context menu example
 */
@Component({
    selector: 'breadcrumb-context-menu-example',
    templateUrl: './breadcrumb-context-menu-example.html',
    styleUrls: ['./breadcrumb-context-menu-example.css'],
    imports: [
        NxBreadcrumbComponent,
        NxBreadcrumbItemComponent,
        RouterLink,
        NxContextMenuComponent,
        NxContextMenuTriggerDirective,
        NxContextMenuItemComponent,
    ],
})
export class BreadcrumbContextMenuExampleComponent {}
