import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Custom Example
 */
@Component({
    selector: 'popover-custom-example',
    templateUrl: './popover-custom-example.html',
    styleUrls: ['./popover-custom-example.css'],
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverCustomExampleComponent {
    popoverWidth = '400px';
}
