import { Component, ViewChild } from '@angular/core';
import { NxContextMenuTriggerDirective } from '@aposin/ng-aquila/context-menu';

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
