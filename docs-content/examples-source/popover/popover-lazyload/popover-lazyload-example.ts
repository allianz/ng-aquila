import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverContentDirective,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover lazyload Example
 */
@Component({
    selector: 'popover-lazyload-example',
    templateUrl: './popover-lazyload-example.html',
    styleUrls: ['./popover-lazyload-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxPopoverTriggerDirective,
        NxPopoverComponent,
        NxPopoverContentDirective,
    ],
})
export class PopoverLazyloadExampleComponent {
    popoverWidth = '400px';
}
