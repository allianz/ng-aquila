import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Modal Popover Example
 */
@Component({
    selector: 'popover-modal-example',
    templateUrl: './popover-modal-example.html',
    styleUrls: ['./popover-modal-example.css'],
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverModalExampleComponent {}
