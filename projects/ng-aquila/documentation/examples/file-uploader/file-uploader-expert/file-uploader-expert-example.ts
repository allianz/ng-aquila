import { Component } from '@angular/core';
import { NxFileUploadResult, NxFileUploader } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpParams, HttpClient } from '@angular/common/http';

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader expert example */
@Component({
    selector: 'file-uploader-expert-example',
    templateUrl: './file-uploader-expert-example.html',
    styleUrls: ['./file-uploader-expert-example.css'],
})
export class FileUploaderExpertExampleComponent {
    uploader: NxFileUploader;
    uploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
    };

    constructor(private messageToastService: NxMessageToastService, private http: HttpClient) {
        this.uploader = new NxFileUploader(this.uploadConfig, this.http);

        this.uploader.response.subscribe((result: NxFileUploadResult) => {
            if (result.success) {
                this.messageToastService.open('All files were uploaded successfully!', myCustomConfig);
            } else if (result.error) {
                // error handling
                console.log(result.error);
            }
        });
    }
}
