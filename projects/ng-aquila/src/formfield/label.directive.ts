import { Directive, ElementRef } from '@angular/core';

/** A directive for passing more complex custom label content. */
@Directive({
    selector: 'nx-formfield-label',
})
export class NxFormfieldLabelDirective {
    constructor(readonly el: ElementRef) {}
}
