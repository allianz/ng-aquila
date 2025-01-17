import { Component } from '@angular/core';
import {
    NxButtonComponent,
    NxIconButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxToolbarComponent,
    NxToolbarDividerComponent,
} from '@aposin/ng-aquila/toolbar';

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
