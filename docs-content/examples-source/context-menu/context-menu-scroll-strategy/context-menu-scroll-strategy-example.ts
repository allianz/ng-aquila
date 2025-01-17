import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

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
