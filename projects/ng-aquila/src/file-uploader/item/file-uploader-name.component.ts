import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { getFileExtension } from '../file-uploader.validations';
import { NxFileIconComponent } from './file-icon.component';

/** Shows the file name. */
@Component({
  selector: 'nx-file-upload-name',
  styleUrls: ['./file-uploader-name.component.scss'],
  template: `
    <nx-file-icon [fileExtension]="extension()"></nx-file-icon>
    <span class="file-name">{{ name() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFileIconComponent],
})
export class NxFileUploaderItemName {
  /** The filename.*/
  readonly name = input.required<string>();

  /**
   * Maps a file extension to its label background color.
   * @deprecated The extension badge is now rendered by `NxFileIconComponent`
   * and its colors are driven by design tokens. This property is kept for
   * backwards compatibility and is no longer used internally.
   */
  iconColor: { [key: string]: string } = {
    xls: '#1E8927',
    xlsx: '#1E8927',
    pdf: '#DC3149',
    png: '#ba31dc',
  };

  /** The file extension without the leading dot. */
  readonly extension = computed(() => getFileExtension(this.name()).substring(1));
}
