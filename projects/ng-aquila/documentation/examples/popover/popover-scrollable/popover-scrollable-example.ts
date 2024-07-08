import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Scrollable Example
 */
@Component({
    selector: 'popover-scrollable-example',
    templateUrl: './popover-scrollable-example.html',
    styleUrls: ['./popover-scrollable-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        CdkScrollable,
    ],
})
export class PopoverScrollableExampleComponent {}
