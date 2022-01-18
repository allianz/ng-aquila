import { Directive, Input } from '@angular/core';

let uniqueId = 0;

@Directive({
    selector: '[nxFormfieldError], [nxError]',
    host: {
        role: 'alert',
        '[attr.id]': 'id',
    },
})
export class NxFormfieldErrorDirective {
    // create a unique id to be used by aria-described-by
    /** Sets the id of the formfield error. */
    @Input() id = `nx-formfield-error-${uniqueId++}`;
}
