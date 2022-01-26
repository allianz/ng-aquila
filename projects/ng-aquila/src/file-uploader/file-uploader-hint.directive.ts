import { Directive, Input } from '@angular/core';

let nextId = 0;
// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
    selector: '[nxFileUploadHint]',
    host: {
        '[attr.id]': 'id',
        '[class.nx-file-upload-hint]': 'true',
    },
})
export class NxFileUploaderHintDirective {
    /** Sets the id of the file upload hint. */
    @Input() id = `nx-formfield-hint-${nextId++}`;
}
