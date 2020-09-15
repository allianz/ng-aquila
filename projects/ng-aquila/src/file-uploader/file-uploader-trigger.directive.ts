import { Directive, Input, HostListener } from '@angular/core';
import { NxFileUploaderComponent } from './file-uploader.component';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFileUploadTriggerFor]',
  exportAs: 'nxFileUploadTrigger'
})
export class NxFileUploaderTriggerDirective {

  _fileUpload: NxFileUploaderComponent;

  /** References the file upload component instance that the trigger is associated with. */
  @Input('nxFileUploadTriggerFor')
  set fileUpload(value: NxFileUploaderComponent) {
    if (this._fileUpload !== value) {
      this._fileUpload = value;
    }
  }
  get fileUpload(): NxFileUploaderComponent {
    return this._fileUpload;
  }

  @HostListener('click')
  _onClick() {
    this._fileUpload.uploadFiles();
  }
}
