import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
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
  selector: 'context-menu-indicator-a1-example',
  templateUrl: './context-menu-indicator-a1-example.html',
  styleUrls: ['./context-menu-indicator-a1-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxIndicatorComponent,
    NxPlainButtonComponent,
    NxContextMenuTriggerDirective,
    NxIconComponent,
  ],
})
export class ContextMenuIndicatorA1ExampleComponent {}
