import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

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
