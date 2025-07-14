import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuContentDirective,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Lazy Context Menu Example
 */
@Component({
  selector: 'context-menu-lazy-example',
  templateUrl: './context-menu-lazy-example.html',
  styleUrls: ['./context-menu-lazy-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuContentDirective,
    NxContextMenuItemComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
  ],
})
export class ContextMenuLazyExampleComponent {}
