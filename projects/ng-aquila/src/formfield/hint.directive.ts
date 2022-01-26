import { Directive, Input } from '@angular/core';

let uniqueId = 0;

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
    selector: '[nxFormfieldHint]',
    host: {
        '[attr.id]': 'id',
        '[class.nx-formfield-hint]': 'true',
    },
})
export class NxFormfieldHintDirective {
    /** Sets the id of the formfield hint. */
    @Input() id = `nx-formfield-hint-${uniqueId++}`;
}
