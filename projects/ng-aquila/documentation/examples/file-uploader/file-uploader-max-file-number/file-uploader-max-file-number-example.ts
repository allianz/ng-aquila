import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    FileItem,
    NxFileUploadConfig,
    NxFileUploader,
} from '@aposin/ng-aquila/file-uploader';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader with max number of files example */
@Component({
    selector: 'file-uploader-max-file-number-example',
    templateUrl: './file-uploader-max-file-number-example.html',
    styleUrls: ['./file-uploader-max-file-number-example.css'],
})
export class FileUploaderMaxFileNumberExampleComponent
    implements OnInit, OnDestroy
{
    readonly uploadConfig: NxFileUploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
    };

    readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

    readonly testForm = new FormGroup({
        documents: new FormControl([], Validators.required),
    });

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

    onChange($event: FileItem[]) {
        console.log($event);
    }

    onDelete($event: FileItem) {
        console.log($event);
    }
}
