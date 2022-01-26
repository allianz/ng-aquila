import { Directive, Input } from '@angular/core';

let uniqueId = 0;

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
    selector: '[nxFormfieldAppendix]',
    host: {
        '[attr.id]': 'id',
    },
})
export class NxFormfieldAppendixDirective {
    /** Sets the id of the formfield appendix. */
    @Input() id = `nx-formfield-appendix-${uniqueId++}`;
}
