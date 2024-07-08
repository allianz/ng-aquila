import { NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFileUploadConfig,
    NxFileUploader,
    NxFileUploaderButtonDirective,
    NxFileUploaderComponent,
    NxFileUploaderHintDirective,
    NxFileUploaderTriggerDirective,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';
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
    standalone: true,
    imports: [
        NxFileUploaderComponent,
        NxLabelComponent,
        NxFileUploaderHintDirective,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NgIf,
        NxErrorComponent,
        NxRadioToggleComponent,
        FormsModule,
        NxRadioToggleButtonComponent,
        NxFileUploaderTriggerDirective,
    ],
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
