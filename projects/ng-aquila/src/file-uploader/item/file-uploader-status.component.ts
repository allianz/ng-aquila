import { NxStatusIconComponent } from '@allianz/ng-aquila/icon';
import { NxSpinnerModule } from '@allianz/ng-aquila/spinner';
import { Component, input } from '@angular/core';

/** Shows the current uploading status of a file. */
@Component({
  selector: 'nx-file-upload-status',
  styleUrls: ['./file-uploader-status.component.scss'],
  template: `
    @if (isUploading()) {
      <nx-spinner size="medium"></nx-spinner>
    }
    @if (isUploaded()) {
      <nx-status-icon type="success" size="s" [attr.aria-label]="uploadedLabel() || null">
      </nx-status-icon>
    }
  `,
  imports: [NxSpinnerModule, NxStatusIconComponent],
})
export class NxFileUploaderItemStatus {
  /** Whether the file is uploading at the moment. If this is true, a spinner is shown. Default: false.*/
  readonly isUploading = input<boolean>(false);

  /** Whether the file was uploaded. If this is true, a success status icon is shown. Default: false.*/
  readonly isUploaded = input<boolean>(false);

  /** The label that is used once the file has been uploaded (used by screen readers).*/
  readonly uploadedLabel = input<string>();
}
