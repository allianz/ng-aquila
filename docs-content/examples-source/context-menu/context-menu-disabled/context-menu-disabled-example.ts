import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Disabled Context Menu Example
 */
@Component({
    selector: 'context-menu-disabled-example',
    templateUrl: './context-menu-disabled-example.html',
    styleUrls: ['./context-menu-disabled-example.css'],
    imports: [
        NxContextMenuComponent,
        NxContextMenuItemComponent,
        NxContextMenuTriggerDirective,
        NxIconButtonComponent,
        NxIconComponent,
    ],
})
export class ContextMenuDisabledExampleComponent {}
