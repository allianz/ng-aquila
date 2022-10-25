import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    FileItem,
    NxFileUploadConfig,
    NxFileUploader,
    NxFileUploaderComponent,
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

/** @title File uploader auto uploading example */
@Component({
    selector: 'file-uploader-auto-example',
    templateUrl: './file-uploader-auto-example.html',
    styleUrls: ['./file-uploader-auto-example.css'],
})
export class FileUploaderAutoExampleComponent implements OnInit, OnDestroy {
    readonly uploadConfig: NxFileUploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            headers: new HttpHeaders({
                'My-Custom-Header': 'custom-header-value',
            }),
            reportProgress: true,
        },
    };

    myFiles: FileItem[] = [];

    readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

    @ViewChild('documentUpload', { static: false })
    documentUpload!: NxFileUploaderComponent;

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
                } else if (result.error) {
                    // error handling
                    console.log(result.error);
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    onFilesAddedChange(files: FileItem[]) {
        if (files) {
            this.documentUpload.uploadFiles();
        }
    }
}
