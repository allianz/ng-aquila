import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxLabelModule } from '@aposin/ng-aquila/base';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NxFileUploader } from './file-uploader';
import { NxFileUploaderComponent } from './file-uploader.component';
import { FileItem } from './file-uploader.model';
import { NxFileUploaderModule } from './file-uploader.module';

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'file-upload') {
            return of(new HttpResponse({ status: 200 })).pipe(delay(10));
        }

        return next.handle(req);
    }
}

@Directive()
abstract class FileUploaderTest {
    @ViewChild(NxFileUploaderComponent, { static: false }) fileUploaderInstance!: NxFileUploaderComponent;
    form!: FormGroup;
    files!: null | FileItem[];

    uploader!: NxFileUploader;
    uploadConfig = {
        requestUrl: 'file-upload',
        options: {
            params: new HttpParams(),
            reportProgress: true,
        },
        uploadSeparately: false,
    };
}

describe('NxFileUploaderComponent', () => {
    let fixture: ComponentFixture<FileUploaderTest>;
    let testInstance: FileUploaderTest;
    let fileUploaderInstance: NxFileUploaderComponent;
    let triggerButton: HTMLButtonElement;
    let addFileButton: HTMLButtonElement;

    function createTestComponent(component: Type<FileUploaderTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        fileUploaderInstance = testInstance.fileUploaderInstance;
        triggerButton = fixture.nativeElement.querySelector('#upload-trigger') as HTMLButtonElement;
        addFileButton = fixture.nativeElement.querySelector('#add-file') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicFileUpload],
            imports: [NxFileUploaderModule, NxLabelModule, HttpClientModule, ReactiveFormsModule, FormsModule],
            providers: [{ provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true }],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('should correctly assign id and label', () => {
            createTestComponent(BasicFileUpload);
            fixture.detectChanges();

            expect(fileUploaderInstance._inputId).toMatch(/nx-file-uploader-.+-input/);
            expect(fileUploaderInstance._labelId).toMatch(/nx-file-uploader-.+-label/);
        });
    });

    describe('trigger directive', () => {
        it('should call uploadFiles when triggerButton was clicked', () => {
            createTestComponent(BasicFileUpload);
            const spy = spyOn(testInstance.uploader, 'uploadFiles');
            triggerButton.click();

            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('upload collectively', () => {
        it('should set the file status correctly for a successful request', fakeAsync(() => {
            createTestComponent(BasicFileUpload);

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });

            const file = fileUploaderInstance.value?.[0] as FileItem;

            // status: should not be uploaded or uploading
            expect(file.isUploaded).toBeFalse();
            expect(file.isUploading).toBeFalse();
            expect(file.isError).toBeFalse();

            fileUploaderInstance.uploadFiles();
            tick(5);

            // status: should not be uploaded, should be uploading
            expect(file.isUploaded).toBeFalse();
            expect(file.isUploading).toBeTrue();
            expect(file.isError).toBeFalse();

            tick(5);

            // status: should not be uploading, should be uploaded
            expect(file.isUploaded).toBeTrue();
            expect(file.isUploading).toBeFalse();
            expect(file.isError).toBeFalse();
        }));

        it('should return a response when a request was successful', done => {
            createTestComponent(BasicFileUpload);

            testInstance.uploader.response.subscribe(response => {
                expect(response).toBeDefined();
                expect(response.error).toBeUndefined();
                expect(response.success).toBeDefined();
                expect(response.success?.files).toHaveSize(3);
                expect(response.success?.requests).toHaveSize(1);
                done();
            });

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)] });

            fileUploaderInstance.uploadFiles();
        });

        it('should not upload files that are already uploaded', done => {
            createTestComponent(BasicFileUpload);

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });

            // send a first request
            fileUploaderInstance.uploadFiles();

            // add two more files and upload them
            setTimeout(() => {
                testInstance.uploader.response.subscribe(response => {
                    expect(response).toBeDefined();
                    expect(response.error).toBeUndefined();
                    expect(response.success).toBeDefined();
                    expect(response.success?.files).toHaveSize(2);
                    expect(response.success?.requests).toHaveSize(1);
                    done();
                });

                testInstance.form.patchValue({
                    documents: [...testInstance.form.controls.documents.value, new FileItem(fakeFile), new FileItem(fakeFile)],
                });
                fileUploaderInstance.uploadFiles();
            }, 10);
        });

        it('should return an error if the request was not successful', done => {
            createTestComponent(BasicFileUpload);
            testInstance.uploadConfig.requestUrl = 'error-url';

            testInstance.uploader.response.subscribe(response => {
                expect(response).toBeDefined();
                expect(response.success).toBeUndefined();
                expect(response.error).toBeDefined();
                expect(response.error?.files).toHaveSize(3);
                expect(response.error?.requests).toHaveSize(1);

                // should have set the status of the files to error
                fileUploaderInstance.value?.forEach(file => {
                    expect(file.isUploaded).toBeFalse();
                    expect(file.isUploading).toBeFalse();
                    expect(file.isError).toBeTrue();
                });
                done();
            });

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)] });

            fileUploaderInstance.uploadFiles();
        });
    });

    describe('upload separately', () => {
        it('should set the file status correctly for a successful request', fakeAsync(() => {
            createTestComponent(BasicFileUpload);
            testInstance.uploadConfig.uploadSeparately = true;

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile), new FileItem(fakeFile)] });

            // status: should not be uploaded or uploading
            fileUploaderInstance.value?.forEach(file => {
                expect(file.isUploaded).toBeFalse();
                expect(file.isUploading).toBeFalse();
                expect(file.isError).toBeFalse();
            });

            fileUploaderInstance.uploadFiles();
            tick(5);

            // status: should not be uploaded, should be uploading
            fileUploaderInstance.value?.forEach(file => {
                expect(file.isUploaded).toBeFalse();
                expect(file.isUploading).toBeTrue();
                expect(file.isError).toBeFalse();
            });

            tick(5);

            // status: should not be uploading, should be uploaded
            fileUploaderInstance.value?.forEach(file => {
                expect(file.isUploaded).toBeTrue();
                expect(file.isUploading).toBeFalse();
                expect(file.isError).toBeFalse();
            });
        }));

        it('should upload all files correctly', done => {
            createTestComponent(BasicFileUpload);
            testInstance.uploadConfig.uploadSeparately = true;

            testInstance.uploader.response.subscribe(response => {
                expect(response).toBeDefined();
                expect(response.error).toBeUndefined();
                expect(response.success).toBeDefined();
                expect(response.success?.files).toHaveSize(3);
                expect(response.success?.requests).toHaveSize(3);
                done();
            });

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)] });

            fileUploaderInstance.uploadFiles();
        });

        it('should not upload files that are already uploaded', done => {
            createTestComponent(BasicFileUpload);
            testInstance.uploadConfig.uploadSeparately = true;

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });

            // send a first request
            fileUploaderInstance.uploadFiles();

            // add two more files and upload them
            setTimeout(() => {
                testInstance.uploader.response.subscribe(response => {
                    expect(response).toBeDefined();
                    expect(response.error).toBeUndefined();
                    expect(response.success).toBeDefined();
                    expect(response.success?.files).toHaveSize(2);
                    expect(response.success?.requests).toHaveSize(2);
                    done();
                });

                testInstance.form.patchValue({ documents: [...testInstance.form.controls.documents.value, new FileItem(fakeFile), new FileItem(fakeFile)] });
                fileUploaderInstance.uploadFiles();
            }, 10);
        });

        it('should return an error if one of the files was not uploaded successful', done => {
            createTestComponent(BasicFileUpload);
            testInstance.uploadConfig.requestUrl = 'error-url';
            testInstance.uploadConfig.uploadSeparately = true;

            testInstance.uploader.response.subscribe(response => {
                expect(response).toBeDefined();
                expect(response.success).toBeUndefined();
                expect(response.error).toBeDefined();
                expect(response.error?.files).toHaveSize(3);
                expect(response.error?.requests).toHaveSize(3);

                // should have set the status of the files to error
                fileUploaderInstance.value?.forEach(file => {
                    expect(file.isUploaded).toBeFalse();
                    expect(file.isUploading).toBeFalse();
                    expect(file.isError).toBeTrue();
                });
                done();
            });

            // add files
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)] });

            fileUploaderInstance.uploadFiles();
        });

        it('should emit opened event when open file-picker dialog', done => {
            createTestComponent(BasicFileUpload);
            const opened = jasmine.createSpy('spy');
            fileUploaderInstance._openedStream.subscribe(() => {
                opened();
                done();
            });
            addFileButton.click();
            expect(opened).toHaveBeenCalled();
        });

        it('should emit closed event when closed file-picker dialog', done => {
            createTestComponent(BasicFileUpload);
            const closed = jasmine.createSpy('spy');
            fileUploaderInstance._closedStream.subscribe(() => {
                closed();
                done();
            });
            addFileButton.click();
            addFileButton.focus();
            fixture.detectChanges();
            expect(closed).toHaveBeenCalled();
        });
    });
});

@Component({
    template: `
        <form [formGroup]="form">
            <nx-file-uploader #documentUpload formControlName="documents" [uploader]="uploader" multiple>
                <nx-label>Required file to upload</nx-label>
                <span nxFileUploadHint>All files are accepted</span>
                <button type="button" nxFileUploadButton id="add-file">Add Files</button>
            </nx-file-uploader>

            <button id="upload-trigger" [nxFileUploadTriggerFor]="documentUpload" type="button">Upload files</button>
        </form>
    `,
})
class BasicFileUpload extends FileUploaderTest {
    fb: FormBuilder;

    constructor(private readonly http: HttpClient) {
        super();

        this.fb = new FormBuilder();
        this.form = this.fb.group({
            documents: [this.files],
        });

        this.uploader = new NxFileUploader(this.uploadConfig, this.http);
    }
}
