import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { NxFileUploaderComponent } from './file-uploader.component';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
    selector: '[nxFileUploadTriggerFor]',
    exportAs: 'nxFileUploadTrigger',
})
export class NxFileUploaderTriggerDirective {
    /** References the file upload component instance that the trigger is associated with. */
    @Input('nxFileUploadTriggerFor') set fileUpload(value: NxFileUploaderComponent) {
        if (this._fileUpload !== value) {
            this._fileUpload = value;
        }
    }
    get fileUpload(): NxFileUploaderComponent {
        return this._fileUpload;
    }
    _fileUpload!: NxFileUploaderComponent;

    @HostListener('click')
    _onClick() {
        this._fileUpload.uploadFiles();
    }

    @HostBinding('style.visibility') get visibility() {
        return this._fileUpload.allFilesUploaded ? 'hidden' : 'unset';
    }
}
