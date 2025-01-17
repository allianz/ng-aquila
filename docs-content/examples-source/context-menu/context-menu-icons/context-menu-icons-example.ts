import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Icons Context Menu Example
 */
@Component({
    selector: 'context-menu-icons-example',
    templateUrl: './context-menu-icons-example.html',
    styleUrls: ['./context-menu-icons-example.css'],
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxIconComponent,
        NxIconButtonComponent,
        NxContextMenuTriggerDirective,
    ],
})
export class ContextMenuIconsExampleComponent {}
