import { NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    FileItem,
    NxFileUploaderButtonDirective,
    NxFileUploaderComponent,
    NxFileUploaderComponent as NxFileUploaderComponent_1,
    NxFileUploaderItemDelete,
    NxFileUploaderItemName,
    NxFileUploaderItemSize,
    NxFileUploaderItemStatus,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

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
    standalone: true,
    imports: [
        NxFileUploaderComponent_1,
        FormsModule,
        NxLabelComponent,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NgIf,
        NxErrorComponent,
        NxFileUploaderItemName,
        NxFileUploaderItemSize,
        NxFileUploaderItemStatus,
        NxFileUploaderItemDelete,
        NxRadioGroupComponent,
        NxRadioComponent,
    ],
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
