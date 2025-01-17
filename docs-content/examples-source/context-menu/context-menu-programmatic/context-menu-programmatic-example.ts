import { Component, ViewChild } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
    NxContextMenuTriggerDirective as NxContextMenuTriggerDirective_1,
} from '@aposin/ng-aquila/context-menu';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Programmatic Context Menu Example
 */
@Component({
    selector: 'context-menu-programmatic-example',
    templateUrl: './context-menu-programmatic-example.html',
    styleUrls: ['./context-menu-programmatic-example.css'],
    host: {
        '(document:keydown.control.p)': 'openContextMenu($event)',
    },
    imports: [
        NxCopytextComponent,
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxIconButtonComponent,
        NxContextMenuTriggerDirective_1,
        NxIconComponent,
    ],
})
export class ContextMenuProgrammaticExampleComponent {
    @ViewChild(NxContextMenuTriggerDirective)
    trigger!: NxContextMenuTriggerDirective;

    openContextMenu($event: Event) {
        $event.preventDefault();
        this.trigger.toggleContextMenu();
    }
}
