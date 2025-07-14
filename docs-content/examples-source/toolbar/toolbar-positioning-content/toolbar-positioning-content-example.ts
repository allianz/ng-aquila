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
import { NxToolbarComponent } from '@allianz/ng-aquila/toolbar';
import { Component } from '@angular/core';

/**
 * @title Toolbar positioning content Example
 */
@Component({
  selector: 'toolbar-positioning-content-example',
  templateUrl: './toolbar-positioning-content-example.html',
  styleUrls: ['./toolbar-positioning-content-example.css'],
  imports: [
    NxToolbarComponent,
    NxPlainButtonComponent,
    NxIconComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxButtonComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
  ],
})
export class ToolbarPositioningContentExampleComponent {}
