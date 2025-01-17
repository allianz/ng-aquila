import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Basic Context Menu Example
 */
@Component({
    selector: 'context-menu-basic-example',
    templateUrl: './context-menu-basic-example.html',
    styleUrls: ['./context-menu-basic-example.css'],
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxIconButtonComponent,
        NxContextMenuTriggerDirective,
        NxIconComponent,
    ],
})
export class ContextMenuBasicExampleComponent {}
