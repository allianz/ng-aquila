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
import { NxToolbarComponent } from '@aposin/ng-aquila/toolbar';

/**
 * @title Toolbar positioning content Example
 */
@Component({
    selector: 'toolbar-positioning-content-example',
    templateUrl: './toolbar-positioning-content-example.html',
    styleUrls: ['./toolbar-positioning-content-example.css'],
    standalone: true,
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
