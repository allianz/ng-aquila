import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

/** Shows a file size in Megabyte (MB) or an alternative label while the file is uploading. */
@Component({
  selector: 'nx-file-upload-size',
  styleUrls: ['./file-uploader-size.component.scss'],
  template: `
    @if (isUploading()) {
      <span>{{ uploadingLabel() }}</span>
    } @else {
      <span>{{ size() / 1024 / 1024 | number: '.2' }} MB</span>
    }
  `,
  imports: [DecimalPipe],
})
export class NxFileUploaderItemSize {
  /** The size of the file in bytes.*/
  readonly size = input.required<number>();

  /** Whether the file is uploading at the moment. Default: false.*/
  readonly isUploading = input<boolean>(false);

  /** The label that is shown while uploading the file.*/
  readonly uploadingLabel = input<string>('');
}
