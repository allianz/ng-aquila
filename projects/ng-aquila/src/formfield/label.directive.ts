import { Directive, ElementRef } from '@angular/core';

/** A directive for passing more complex custom label content. */
@Directive({
    selector: 'nx-formfield-label',
    standalone: true,
})
export class NxFormfieldLabelDirective {
    constructor(readonly el: ElementRef) {}
}
