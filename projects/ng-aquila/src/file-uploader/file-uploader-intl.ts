import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** File uploader data that requires internationalization. */
@Injectable({ providedIn: 'root' })
export class NxFileUploaderIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();

    /** A label for the uploading state used in the queue. */
    uploadingLabel = 'uploading';
    /** Aria-label for the delete icon. */
    deleteLabel = 'Delete';
    /** Aria-label for the 'successfully-uploaded' icon. */
    uploadedStateLabel = 'uploaded';
    /** Aria-label for the uploaded files list. */
    uploadedListLabel = 'List of uploaded files';
}
