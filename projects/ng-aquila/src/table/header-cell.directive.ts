import { Directive, ElementRef } from '@angular/core';

/**
 * This is a table header cell.
 */
@Directive({
    selector: '[nxHeaderCell]',
    host: {
        '[class.nx-header-cell]': 'true',
    },
})
export class NxHeaderCellDirective {
    constructor(readonly elementRef: ElementRef<HTMLElement>) {}
}
