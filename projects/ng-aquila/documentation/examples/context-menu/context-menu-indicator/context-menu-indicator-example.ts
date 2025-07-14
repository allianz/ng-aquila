import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Context Menu with indicators
 */
@Component({
  selector: 'context-menu-indicator-example',
  templateUrl: './context-menu-indicator-example.html',
  styleUrls: ['./context-menu-indicator-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxIndicatorComponent,
    NxIconButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
  ],
})
export class ContextMenuIndicatorExampleComponent {}
