import {
  NxButtonComponent,
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxToolbarComponent,
  NxToolbarDividerComponent,
} from '@allianz/ng-aquila/toolbar';
import { Component } from '@angular/core';

/**
 * @title Toolbar divider example
 */
@Component({
  selector: 'toolbar-divider-example',
  templateUrl: './toolbar-divider-example.html',
  styleUrls: ['./toolbar-divider-example.css'],
  imports: [
    NxToolbarComponent,
    NxPlainButtonComponent,
    NxIconComponent,
    NxToolbarDividerComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxButtonComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
  ],
})
export class ToolbarDividerExampleComponent {}
