import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

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
