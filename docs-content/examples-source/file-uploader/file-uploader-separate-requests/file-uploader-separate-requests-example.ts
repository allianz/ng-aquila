import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    NxFileUploadConfig,
    NxFileUploader,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title Example with separate uploading requests */
@Component({
    selector: 'file-uploader-separate-requests-example',
    templateUrl: './file-uploader-separate-requests-example.html',
    styleUrls: ['./file-uploader-separate-requests-example.css'],
})
export class FileUploaderSeparateRequestsExampleComponent
    implements OnInit, OnDestroy
{
    readonly uploadConfig: NxFileUploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
        uploadSeparately: true,
    };

    readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

    showUploadError = false;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly messageToastService: NxMessageToastService,
        private readonly http: HttpClient,
    ) {}

    ngOnInit(): void {
        this.uploader.response
            .pipe(takeUntil(this._destroyed))
            .subscribe(result => {
                if (result.success) {
                    this.messageToastService.open(
                        'All files were uploaded successfully!',
                        myCustomConfig,
                    );
                } else {
                    // error handling: at least one request returned an error
                    this.showUploadError = true;
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
