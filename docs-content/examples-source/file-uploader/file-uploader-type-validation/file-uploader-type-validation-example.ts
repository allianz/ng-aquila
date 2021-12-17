import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    FileItem,
    NxFileUploadResult,
    NxFileUploader,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { HttpClient, HttpParams } from '@angular/common/http';

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader type validation example */
@Component({
    selector: 'file-uploader-type-validation-example',
    templateUrl: './file-uploader-type-validation-example.html',
    styleUrls: ['./file-uploader-type-validation-example.css'],
})
export class FileUploaderTypeValidationExampleComponent {
    testForm!: FormGroup;
    uploader: NxFileUploader;
    uploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
    };

    constructor(
        private fb: FormBuilder,
        private messageToastService: NxMessageToastService,
        private http: HttpClient,
    ) {
        this.createForm();

        this.uploader = new NxFileUploader(this.uploadConfig, this.http);

        this.uploader.response.subscribe((result: NxFileUploadResult) => {
            if (result.success) {
                this.messageToastService.open(
                    'All files were uploaded successfully!',
                    myCustomConfig,
                );
            } else if (result.error) {
                // error handling
                console.log(result.error);
            }
        });
    }

    createForm() {
        this.testForm = this.fb.group({
            documents: [[], Validators.required],
        });
    }

    onChange($event: FileItem[]) {
        console.log($event);
    }

    onDelete($event: FileItem) {
        console.log($event);
    }
}
