import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    FileItem,
    NxFileUploaderButtonDirective,
    NxFileUploaderComponent,
    NxFileUploaderComponent as NxFileUploaderComponent_1,
    NxFileUploaderHintDirective,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';

const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title Custom uploading implementation */
@Component({
    selector: 'file-uploader-with-request-example',
    templateUrl: './file-uploader-with-request-example.html',
    styleUrls: ['./file-uploader-with-request-example.css'],
    imports: [
        NxFileUploaderComponent_1,
        NxLabelComponent,
        NxFileUploaderHintDirective,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NxErrorComponent,
    ],
})
export class FileUploaderWithRequestExampleComponent {
    @ViewChild('documentUpload', { static: false })
    documentUpload!: NxFileUploaderComponent;

    showUploadError = false;

    constructor(
        private readonly messageToastService: NxMessageToastService,
        private readonly http: HttpClient,
    ) {}

    upload(url: string) {
        this.showUploadError = false;

        if (!this.documentUpload.value) {
            return;
        }

        const formData = new FormData();

        this.documentUpload.value.forEach((fileItem: FileItem) => {
            if (!fileItem.isUploaded) {
                fileItem.setUploadingState();
                formData.append(
                    'uploads[]',
                    fileItem.file as Blob,
                    fileItem.name,
                );
            }
        });

        const params = new HttpParams();
        const options = {
            params,
            reportProgress: true,
        };

        this.http.post(url, formData, options).subscribe(
            data => {
                this.documentUpload.value!.forEach((fileItem: FileItem) => {
                    fileItem.setUploadedState();
                });
                this.messageToastService.open(
                    'All files were uploaded successfully!',
                    myCustomConfig,
                );
            },
            error => {
                this.documentUpload.value!.forEach((fileItem: FileItem) => {
                    if (!fileItem.isUploaded) {
                        fileItem.setErrorState();
                    }
                });
                this.showUploadError = true;
            },
        );
    }
}
