import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Scroll Strategy Context Menu Example
 */
@Component({
  selector: 'context-menu-scroll-strategy-example',
  templateUrl: './context-menu-scroll-strategy-example.html',
  styleUrls: ['./context-menu-scroll-strategy-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
  ],
})
export class ContextMenuScrollStrategyExampleComponent {}
