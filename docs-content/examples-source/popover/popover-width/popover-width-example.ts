import { Component } from '@angular/core';
import {
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
})
export class PopoverWidthExampleComponent {
    popoverWidth = '100%';
    popoverMaxWidth = '100%';
}
