import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxIndicatorComponent } from '@aposin/ng-aquila/indicator';

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
