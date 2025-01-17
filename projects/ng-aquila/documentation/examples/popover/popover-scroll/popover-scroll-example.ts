import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Scroll Example
 */
@Component({
    selector: 'popover-scroll-example',
    templateUrl: './popover-scroll-example.html',
    styleUrls: ['./popover-scroll-example.css'],
    imports: [
        CdkScrollable,
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
    ],
})
export class PopoverScrollExampleComponent {}
