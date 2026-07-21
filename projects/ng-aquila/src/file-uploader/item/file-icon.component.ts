import { NxIconModule } from '@allianz/ng-aquila/icon';
import { Component, computed, input } from '@angular/core';

/** Shows the file type icon with the file extension label. */
@Component({
  selector: 'nx-file-icon',
  styleUrls: ['./file-icon.component.scss'],
  template: `
    @if (fileExtension()) {
      <span class="extension-label" [class]="_badgeClass()">{{ fileExtension() }}</span>
    }
    <nx-icon name="file" class="extension-icon" aria-hidden="true"></nx-icon>
  `,
  imports: [NxIconModule],
})
export class NxFileIconComponent {
  /**
   * The file extension, without the leading dot (e.g. `pdf`).
   *
   * When omitted (or empty), no extension badge is shown. Unknown extensions
   * fall back to the default badge color.
   */
  readonly fileExtension = input<string>('');

  /** Maps a file extension to the badge color modifier class, grouped by file category. */
  private readonly _badgeClassByExtension: { [key: string]: string } = {
    // documents
    pdf: 'badge-red',
    // text processing documents
    doc: 'badge-aqua',
    docx: 'badge-aqua',
    odt: 'badge-aqua',
    rtf: 'badge-aqua',
    txt: 'badge-aqua',
    // spreadsheets
    xls: 'badge-green',
    xlsx: 'badge-green',
    ods: 'badge-green',
    csv: 'badge-green',
    // presentations
    ppt: 'badge-orange',
    pptx: 'badge-orange',
    odp: 'badge-orange',
    // images
    png: 'badge-purple',
    jpg: 'badge-purple',
    jpeg: 'badge-purple',
    gif: 'badge-purple',
    svg: 'badge-purple',
    webp: 'badge-purple',
    bmp: 'badge-purple',
    // archives
    zip: 'badge-default',
    rar: 'badge-default',
    '7z': 'badge-default',
    tar: 'badge-default',
    gz: 'badge-default',
    // audio & video
    mp3: 'badge-teal',
    wav: 'badge-teal',
    mp4: 'badge-teal',
    mov: 'badge-teal',
    avi: 'badge-teal',
    // code & scripts
    js: 'badge-yellow',
    ts: 'badge-yellow',
    json: 'badge-yellow',
    xml: 'badge-yellow',
    html: 'badge-yellow',
    css: 'badge-yellow',
  };
  protected readonly _badgeClass = computed(
    () => this._badgeClassByExtension[this.fileExtension().toLowerCase()] ?? 'badge-default',
  );
}
