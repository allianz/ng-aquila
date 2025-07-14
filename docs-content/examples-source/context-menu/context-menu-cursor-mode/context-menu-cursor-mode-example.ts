import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxCardComponent } from '@allianz/ng-aquila/card';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

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
