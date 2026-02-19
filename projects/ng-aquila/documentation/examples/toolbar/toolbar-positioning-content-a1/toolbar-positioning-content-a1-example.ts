import {
  NxButtonComponent,
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
 * @title Toolbar positioning content example
 */
@Component({
  selector: 'toolbar-positioning-content-a1-example',
  templateUrl: './toolbar-positioning-content-a1-example.html',
  styleUrls: ['./toolbar-positioning-content-a1-example.css'],
  imports: [
    NxToolbarComponent,
    NxPlainButtonComponent,
    NxIconComponent,
    NxContextMenuTriggerDirective,
    NxButtonComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
  ],
})
export class ToolbarPositioningContentA1ExampleComponent {}
