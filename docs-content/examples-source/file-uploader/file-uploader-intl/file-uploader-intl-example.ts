import { Component, Injectable } from '@angular/core';
import {
    NxFileUploaderComponent,
    NxFileUploaderIntl,
    NxFileUploader,
    NxFileUploadResult,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class FileUploaderIntl extends NxFileUploaderIntl {
    uploadingLabel = 'Téléchargement';
    deleteLabel = 'Supprimer';
    uploadedStateLabel = 'Téléchargé';
}

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader internationalization example */
@Component({
    selector: 'file-uploader-intl-example',
    templateUrl: './file-uploader-intl-example.html',
    styleUrls: ['./file-uploader-intl-example.css'],
    providers: [{ provide: NxFileUploaderIntl, useClass: FileUploaderIntl }],
})
export class FileUploaderIntlExampleComponent {
    uploader: NxFileUploader;
    uploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
    };

    constructor(
        private messageToastService: NxMessageToastService,
        private http: HttpClient,
    ) {
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
}
