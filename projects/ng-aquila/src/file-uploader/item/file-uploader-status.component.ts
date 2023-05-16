import { Component, Input } from '@angular/core';

/** Shows the current uploading status of a file. */
@Component({
    selector: 'nx-file-upload-status',
    styleUrls: ['./file-uploader-status.component.scss'],
    template: `
        <nx-spinner *ngIf="isUploading" size="medium"></nx-spinner>
        <nx-icon name="check-circle" *ngIf="isUploaded" size="s" [attr.aria-label]="uploadedLabel || null"> </nx-icon>
    `,
})
export class NxFileUploaderItemStatus {
    /** Whether the file is uploading at the moment. If this is true, a spinner is shown. Default: false.*/
    @Input() isUploading!: boolean;

    /** Whether the file was uploaded. If this is true, a `check-circle` icon is shown. Default: false.*/
    @Input() isUploaded!: boolean;

    /** The label that is used once the file has been uploaded (used by screen readers).*/
    @Input() uploadedLabel!: string;
}
