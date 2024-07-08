import { Component, Input } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

/** Shows a delete button. */
@Component({
    selector: 'nx-file-upload-delete',
    template: `
        <button nxIconButton="tertiary small-medium" [attr.aria-label]="deleteLabel || null" type="button" [attr.disabled]="isUploading || null">
            <nx-icon name="trash-o" [attr.aria-hidden]="true"></nx-icon>
        </button>
    `,
    styleUrls: ['file-uploader-delete.component.scss'],
    standalone: true,
    imports: [NxButtonModule, NxIconModule],
})
export class NxFileUploaderItemDelete {
    /** Whether the file is uploading at the moment. If true, the button is disabled. Default: false.*/
    @Input() isUploading!: boolean;

    /** The label that is used for the delete button (used by screen readers). */
    @Input() deleteLabel!: string;
}
