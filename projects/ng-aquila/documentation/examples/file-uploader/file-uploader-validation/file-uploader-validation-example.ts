import { JsonPipe, NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    FileItem,
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

const myCustomConfig: NxMessageToastConfig = {
    duration: 3000,
    context: 'success',
    announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader validation example */
@Component({
    selector: 'file-uploader-validation-example',
    templateUrl: './file-uploader-validation-example.html',
    styleUrls: ['./file-uploader-validation-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFileUploaderComponent,
        NxLabelComponent,
        NxFileUploaderHintDirective,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NgIf,
        NxErrorComponent,
        NxRadioToggleComponent,
        NxRadioToggleButtonComponent,
        NxFileUploaderTriggerDirective,
        JsonPipe,
    ],
})
export class FileUploaderValidationExampleComponent
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
                    this.testForm.controls.documents.setErrors({
                        serverError: true,
                    });
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
