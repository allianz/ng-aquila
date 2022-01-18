import { Directive, Input } from '@angular/core';

let uniqueId = 0;

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
    selector: '[nxFormfieldNote]',
    host: {
        '[attr.id]': 'id',
    },
})
export class NxFormfieldNoteDirective {
    /** Sets the id of the formfield note. */
    @Input() id = `nx-formfield-note-${uniqueId++}`;
}
