import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import { NxCardComponent } from '@aposin/ng-aquila/card';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Cursor Mode Context Menu Example
 */
@Component({
    selector: 'context-menu-cursor-mode-example',
    templateUrl: './context-menu-cursor-mode-example.html',
    styleUrls: ['./context-menu-cursor-mode-example.css'],
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxCardComponent,
        NxContextMenuTriggerDirective,
        NxCopytextComponent,
        NxIconButtonComponent,
        NxIconComponent,
    ],
})
export class ContextMenuCursorModeExampleComponent {}
