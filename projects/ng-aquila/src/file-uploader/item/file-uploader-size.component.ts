import { Component, Input } from '@angular/core';

/** Shows a file size in Megabyte (MB) or an alternative label while the file is uploading. */
@Component({
    selector: 'nx-file-upload-size',
    styleUrls: ['./file-uploader-size.component.scss'],
    template: `
        <span *ngIf="isUploading; else uploaded">{{ uploadingLabel }}</span>
        <ng-template #uploaded>
            <span>{{ size / 1024 / 1024 | number: '.2' }} MB</span>
        </ng-template>
    `,
})
export class NxFileUploaderItemSize {
    /** The size of the file in bytes.*/
    @Input() size!: number;

    /** Whether the file is uploading at the moment. Default: false.*/
    @Input() isUploading!: boolean;

    /** The label that is shown while uploading the file.*/
    @Input() uploadingLabel!: string;
}
