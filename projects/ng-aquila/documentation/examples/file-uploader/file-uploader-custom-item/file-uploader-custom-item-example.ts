import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
    FileItem,
    NxFileUploaderComponent,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';

export class CustomFileItem extends FileItem {
    formData!: FormData;
}

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader custom-item example */
@Component({
    selector: 'file-uploader-custom-item-example',
    templateUrl: './file-uploader-custom-item-example.html',
    styleUrls: ['./file-uploader-custom-item-example.css'],
})
export class FileUploaderCustomItemExampleComponent {
    myFiles: CustomFileItem[] = [];

    @ViewChild('documentUpload') documentUpload!: NxFileUploaderComponent;

    @ViewChild('ngModel') ngModel!: NgModel;

    showUploadError = false;

    constructor(
        private readonly messageToastService: NxMessageToastService,
        private readonly http: HttpClient,
    ) {}

    onChange() {
        this.validate();
    }

    validate() {
        const valid = this.myFiles.every(
            file => typeof file.formData === 'boolean',
        );
        this.ngModel.control.setErrors(valid ? {} : { required: true });
        return valid;
    }

    upload(url: string) {
        this.showUploadError = false;

        if (!this.documentUpload.value) {
            return;
        }

        if (!this.validate()) {
            return;
        }

        const formData = new FormData();
        this.myFiles.forEach((file: CustomFileItem) => {
            if (!file.isUploaded) {
                file.setUploadingState();
                formData.set(file.name, file.file as Blob, file.name);
                formData.set(`${file.name}-form`, file.formData.toString());
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
