import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Nested Context Menu Example
 */
@Component({
    selector: 'context-menu-nested-example',
    templateUrl: './context-menu-nested-example.html',
    styleUrls: ['./context-menu-nested-example.css'],
    standalone: true,
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxIconComponent,
        NxContextMenuTriggerDirective,
        NxIconButtonComponent,
    ],
})
export class ContextMenuNestedExampleComponent {}
