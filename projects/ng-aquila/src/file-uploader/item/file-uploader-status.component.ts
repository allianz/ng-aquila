import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxSpinnerModule } from '@allianz/ng-aquila/spinner';
import { Component, Input } from '@angular/core';

/** Shows the current uploading status of a file. */
@Component({
  selector: 'nx-file-upload-status',
  styleUrls: ['./file-uploader-status.component.scss'],
  template: `
    @if (isUploading) {
      <nx-spinner size="medium"></nx-spinner>
    }
    @if (isUploaded) {
      <nx-icon name="check-circle" size="s" [attr.aria-label]="uploadedLabel || null"> </nx-icon>
    }
  `,
  imports: [NxSpinnerModule, NxIconModule],
})
export class NxFileUploaderItemStatus {
  /** Whether the file is uploading at the moment. If this is true, a spinner is shown. Default: false.*/
  @Input() isUploading!: boolean;

  /** Whether the file was uploaded. If this is true, a `check-circle` icon is shown. Default: false.*/
  @Input() isUploaded!: boolean;

  /** The label that is used once the file has been uploaded (used by screen readers).*/
  @Input() uploadedLabel!: string;
}
