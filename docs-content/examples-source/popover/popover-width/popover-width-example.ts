import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    POPOVER_DEFAULT_OPTIONS,
    PopoverDefaultOptions,
} from '@aposin/ng-aquila/popover';

const myDefaultOptions: PopoverDefaultOptions = {
    popoverWidth: '800px',
    popoverMaxWidth: '700px',
};

/**
 * @title Popover Width Example
 */
@Component({
    selector: 'popover-width-example',
    templateUrl: './popover-width-example.html',
    styleUrls: ['./popover-width-example.css'],
    providers: [
        { provide: POPOVER_DEFAULT_OPTIONS, useValue: myDefaultOptions },
    ],
    standalone: true,
    imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverWidthExampleComponent {
    popoverWidth = '100%';
    popoverMaxWidth = '100%';
}
