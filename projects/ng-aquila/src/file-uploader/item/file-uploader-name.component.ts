import { Component, Input } from '@angular/core';

/** Shows the file name. */
@Component({
  selector: 'nx-file-upload-name',
  template: ` {{ name }} `,
})
export class NxFileUploaderItemName {
  /** The filename.*/
  @Input()
  name: String;
}
