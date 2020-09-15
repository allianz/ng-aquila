import { Component, ViewChild } from '@angular/core';
import { NxContextMenuTriggerDirective } from '@aposin/ng-aquila/context-menu';

/**
* @title Programmatic Context Menu Example
*/
@Component({
  templateUrl: './context-menu-programmatic-example.html',
  host: {
    '(document:keydown.control.p)': 'openContextMenu($event)'
  }
})
export class ContextMenuProgrammaticExampleComponent {
  @ViewChild(NxContextMenuTriggerDirective)
  trigger: NxContextMenuTriggerDirective;

  openContextMenu($event) {
    $event.preventDefault();
    this.trigger.toggleContextMenu();
  }
}
