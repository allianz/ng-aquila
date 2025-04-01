import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    Component,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    viewChildren,
} from '@angular/core';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import {
    FileUploadError,
    NxFileUploadConfig,
    NxFileUploader,
    NxFileUploaderButtonDirective,
    NxFileUploaderComponent,
    NxFileUploaderHintDirective,
    NxFileUploadResult,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMessageToastConfig,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { Subject, zip } from 'rxjs';
import { first } from 'rxjs/operators';

const successToastConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

const noFilesToastConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'info',
    announcementMessage: 'Information: No files to upload.',
};

/** @title Multiple file uploader combined example */
@Component({
    selector: 'file-uploader-categories-example',
    templateUrl: './file-uploader-categories-example.html',
    styleUrls: ['./file-uploader-categories-example.css'],
    imports: [
        NxFileUploaderComponent,
        NxLabelComponent,
        NxFileUploaderHintDirective,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NxPlainButtonComponent,
        CommonModule,
        NxErrorComponent,
    ],
})
export class FileUploaderCategoriesExampleComponent
    implements OnDestroy, OnChanges
{
    readonly uploadConfig: NxFileUploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
        // emitSuccessResultOnEmptyFileList: true,
    };

    readonly carDocumentsUploader = new NxFileUploader(
        this.uploadConfig,
        this.http,
    );
    readonly driverDocumentsUploader = new NxFileUploader(
        this.uploadConfig,
        this.http,
    );
    readonly additionalDocumentsUploader = new NxFileUploader(
        this.uploadConfig,
        this.http,
    );

    private readonly _destroyed = new Subject<void>();

    uploaderComponents = viewChildren(NxFileUploaderComponent);

    constructor(
        private readonly messageToastService: NxMessageToastService,
        private readonly http: HttpClient,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    triggerUpload() {
        // find all uploaders that have files to upload and ignore others
        const uploadersWithFilesToUpload = this.uploaderComponents().filter(
            uploaderComponent =>
                uploaderComponent.value
                    ? uploaderComponent.value.filter(item => !item.isUploaded)
                          .length > 0
                    : false,
        );

        // show toast if no files to upload
        if (uploadersWithFilesToUpload.length === 0) {
            this.messageToastService.open(
                'No files to upload!',
                noFilesToastConfig,
            );
        }

        if (uploadersWithFilesToUpload.length > 0) {
            this.uploadFilesForUploaders(uploadersWithFilesToUpload);
        }
    }

    getFileErrors(): FileUploadError[] {
        return this.uploaderComponents()
            .map(uploader => uploader.errors || [])
            .flatMap(error => error);
    }

    uploadFilesForUploaders(
        uploadersWithFilesToUpload: NxFileUploaderComponent[],
    ) {
        // wait for all uploaders with files to upload to finish uploading
        zip(
            uploadersWithFilesToUpload.map(
                uploaderComponent => uploaderComponent.uploader.response,
            ),
        )
            .pipe(first())
            .subscribe((results: NxFileUploadResult[]) => {
                console.log(`results`, results);

                const allSucessful = results.every(
                    result => result.allSucessful,
                );

                if (allSucessful) {
                    this.messageToastService.open(
                        'All files were uploaded successfully!',
                        successToastConfig,
                    );
                } else {
                    results.forEach(result => console.log(result.error));
                }
            });

        // start uploading files
        uploadersWithFilesToUpload.forEach(uploader => {
            uploader.uploadFiles();
        });
    }
}
