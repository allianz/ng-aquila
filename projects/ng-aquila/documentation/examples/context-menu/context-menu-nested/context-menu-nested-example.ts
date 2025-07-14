import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Nested Context Menu Example
 */
@Component({
  selector: 'context-menu-nested-example',
  templateUrl: './context-menu-nested-example.html',
  styleUrls: ['./context-menu-nested-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxIconComponent,
    NxContextMenuTriggerDirective,
    NxIconButtonComponent,
  ],
})
export class ContextMenuNestedExampleComponent {}
