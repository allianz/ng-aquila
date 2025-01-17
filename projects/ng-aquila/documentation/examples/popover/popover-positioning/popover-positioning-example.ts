import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover positioning Example
 */
@Component({
    selector: 'popover-positioning-example',
    templateUrl: './popover-positioning-example.html',
    styleUrls: ['./popover-positioning-example.css'],
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverPositioningExampleComponent {}
