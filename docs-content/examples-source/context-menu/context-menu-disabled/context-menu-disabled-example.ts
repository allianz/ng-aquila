import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Disabled Context Menu Example
 */
@Component({
  selector: 'context-menu-disabled-example',
  templateUrl: './context-menu-disabled-example.html',
  styleUrls: ['./context-menu-disabled-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
    NxIconButtonComponent,
    NxIconComponent,
  ],
})
export class ContextMenuDisabledExampleComponent {}
