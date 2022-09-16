import { NxContextMenuTriggerDirective } from '@allianz/ng-aquila/context-menu';
import { Component, ViewChild } from '@angular/core';

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
})
export class ContextMenuProgrammaticExampleComponent {
    @ViewChild(NxContextMenuTriggerDirective)
    trigger!: NxContextMenuTriggerDirective;

    openContextMenu($event: Event) {
        $event.preventDefault();
        this.trigger.toggleContextMenu();
    }
}
