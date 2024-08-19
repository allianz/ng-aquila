import { HttpClient, HttpParams } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
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
    NxFileUploaderComponent as NxFileUploaderComponent_1,
    NxFileUploaderHintDirective,
    NxFileUploaderTriggerDirective,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxMessageToastService } from '@aposin/ng-aquila/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { myCustomConfig } from '../file-uploader-auto/file-uploader-auto-example';

/** @title File uploader error list example */
@Component({
    selector: 'file-uploader-error-list-example',
    templateUrl: './file-uploader-error-list-example.html',
    styleUrls: ['./file-uploader-error-list-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxFileUploaderComponent_1,
        NxLabelComponent,
        NxFileUploaderHintDirective,
        NxButtonComponent,
        NxFileUploaderButtonDirective,
        NxIconComponent,
        NxErrorComponent,
        NxFileUploaderTriggerDirective,
    ],
})
export class FileUploaderErrorListExampleComponent
    implements OnInit, OnDestroy
{
    @ViewChild('documentUpload', { static: false })
    documentUpload!: NxFileUploaderComponent;

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
