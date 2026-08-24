import { NxLabelModule } from '@allianz/ng-aquila/base';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injectable,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NxFileUploadConfig, NxFileUploader } from './file-uploader';
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

@Directive({ standalone: true })
abstract class FileUploaderTest {
  @ViewChild(NxFileUploaderComponent, { static: false })
  fileUploaderInstance!: NxFileUploaderComponent;
  form!: FormGroup;
  files!: null | FileItem[];

  uploader!: NxFileUploader;
  uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportUploadProgress: true,
    },
    uploadSeparately: false,
  };
}

@Directive({ standalone: true })
abstract class FileUploaderSendsSuccessOnEmptyListTest extends FileUploaderTest {
  @ViewChild(NxFileUploaderComponent, { static: false })
  fileUploaderInstance!: NxFileUploaderComponent;
  form!: FormGroup;
  files!: null | FileItem[];

  uploader!: NxFileUploader;
  uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportUploadProgress: true,
    },
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

  describe('basic', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NxFileUploaderModule,
          NxLabelModule,
          ReactiveFormsModule,
          FormsModule,
          BasicFileUpload,
        ],
        providers: [
          { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
          provideHttpClient(withXhr(), withInterceptorsFromDi()),
        ],
      }).compileComponents();
    }));

    describe('creation test', () => {
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
        const spy = vi.spyOn(testInstance.uploader, 'uploadFiles').mockReturnValue(undefined);
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
        expect(file.isUploaded).toBe(false);
        expect(file.isUploading).toBe(false);
        expect(file.isError).toBe(false);

        fileUploaderInstance.uploadFiles();
        tick(5);

        // status: should not be uploaded, should be uploading
        expect(file.isUploaded).toBe(false);
        expect(file.isUploading).toBe(true);
        expect(file.isError).toBe(false);

        tick(5);

        // status: should not be uploading, should be uploaded
        expect(file.isUploaded).toBe(true);
        expect(file.isUploading).toBe(false);
        expect(file.isError).toBe(false);
      }));

      it('should return a response when a request was successful', async () => {
        createTestComponent(BasicFileUpload);

        // Await the response instead of asserting inside a bare `subscribe`: the request
        // resolves after this test would otherwise have returned, so the assertions used to
        // run against whichever fixture the next test had already created.
        const responsePromise = firstValueFrom(testInstance.uploader.response);

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)],
        });

        fileUploaderInstance.uploadFiles();

        const response = await responsePromise;
        expect(response).toBeDefined();
        expect(response.error).toBeUndefined();
        expect(response.success).toBeDefined();
        expect(response.success?.files).toHaveLength(3);
        expect(response.success?.requests).toHaveLength(1);
      });

      it('should not upload files that are already uploaded', async () => {
        createTestComponent(BasicFileUpload);

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });

        // send a first request and wait for it to finish
        const firstResponse = firstValueFrom(testInstance.uploader.response);
        fileUploaderInstance.uploadFiles();
        await firstResponse;

        // add two more files and upload them; only the two new ones should go out
        const secondResponse = firstValueFrom(testInstance.uploader.response);
        testInstance.form.patchValue({
          documents: [
            ...testInstance.form.controls.documents.value,
            new FileItem(fakeFile),
            new FileItem(fakeFile),
          ],
        });
        fileUploaderInstance.uploadFiles();

        const response = await secondResponse;
        expect(response).toBeDefined();
        expect(response.error).toBeUndefined();
        expect(response.success).toBeDefined();
        expect(response.success?.files).toHaveLength(2);
        expect(response.success?.requests).toHaveLength(1);
      });

      it('should return an error if the request was not successful', async () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.requestUrl = 'error-url';

        const responsePromise = firstValueFrom(testInstance.uploader.response);

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)],
        });

        fileUploaderInstance.uploadFiles();

        const response = await responsePromise;
        expect(response).toBeDefined();
        expect(response.success).toBeUndefined();
        expect(response.error).toBeDefined();
        expect(response.error?.files).toHaveLength(3);
        expect(response.error?.requests).toHaveLength(1);

        // should have set the status of the files to error
        fileUploaderInstance.value?.forEach((file) => {
          expect(file.isUploaded).toBe(false);
          expect(file.isUploading).toBe(false);
          expect(file.isError).toBe(true);
        });
      });
    });

    describe('upload separately', () => {
      it('should set the file status correctly for a successful request', fakeAsync(() => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.uploadSeparately = true;

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: [new FileItem(fakeFile), new FileItem(fakeFile)],
        });

        // status: should not be uploaded or uploading
        fileUploaderInstance.value?.forEach((file) => {
          expect(file.isUploaded).toBe(false);
          expect(file.isUploading).toBe(false);
          expect(file.isError).toBe(false);
        });

        fileUploaderInstance.uploadFiles();
        tick(5);

        // status: should not be uploaded, should be uploading
        fileUploaderInstance.value?.forEach((file) => {
          expect(file.isUploaded).toBe(false);
          expect(file.isUploading).toBe(true);
          expect(file.isError).toBe(false);
        });

        tick(5);

        // status: should not be uploading, should be uploaded
        fileUploaderInstance.value?.forEach((file) => {
          expect(file.isUploaded).toBe(true);
          expect(file.isUploading).toBe(false);
          expect(file.isError).toBe(false);
        });
      }));

      it('should upload all files correctly', async () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.uploadSeparately = true;

        const responsePromise = firstValueFrom(testInstance.uploader.response);

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)],
        });

        fileUploaderInstance.uploadFiles();

        const response = await responsePromise;
        expect(response).toBeDefined();
        expect(response.error).toBeUndefined();
        expect(response.success).toBeDefined();
        expect(response.success?.files).toHaveLength(3);
        expect(response.success?.requests).toHaveLength(3);
      });

      it('should not upload files that are already uploaded', async () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.uploadSeparately = true;

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });

        // send a first request and wait for it to finish
        const firstResponse = firstValueFrom(testInstance.uploader.response);
        fileUploaderInstance.uploadFiles();
        await firstResponse;

        // add two more files and upload them; only the two new ones should go out
        const secondResponse = firstValueFrom(testInstance.uploader.response);
        testInstance.form.patchValue({
          documents: [
            ...testInstance.form.controls.documents.value,
            new FileItem(fakeFile),
            new FileItem(fakeFile),
          ],
        });
        fileUploaderInstance.uploadFiles();

        const response = await secondResponse;
        expect(response).toBeDefined();
        expect(response.error).toBeUndefined();
        expect(response.success).toBeDefined();
        expect(response.success?.files).toHaveLength(2);
        expect(response.success?.requests).toHaveLength(2);
      });

      it('should return an error if one of the files was not uploaded successful', async () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.requestUrl = 'error-url';
        testInstance.uploadConfig.uploadSeparately = true;

        const responsePromise = firstValueFrom(testInstance.uploader.response);

        // add files
        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: [new FileItem(fakeFile), new FileItem(fakeFile), new FileItem(fakeFile)],
        });

        fileUploaderInstance.uploadFiles();

        const response = await responsePromise;
        expect(response).toBeDefined();
        expect(response.success).toBeUndefined();
        expect(response.error).toBeDefined();
        expect(response.error?.files).toHaveLength(3);
        expect(response.error?.requests).toHaveLength(3);

        // should have set the status of the files to error
        fileUploaderInstance.value?.forEach((file) => {
          expect(file.isUploaded).toBe(false);
          expect(file.isUploading).toBe(false);
          expect(file.isError).toBe(true);
        });
      });

      it('should emit opened event when open file-picker dialog', async () => {
        createTestComponent(BasicFileUpload);
        const opened = vi.fn().mockName('spy');
        fileUploaderInstance._openedStream.subscribe(() => {
          opened();
        });
        addFileButton.click();
        expect(opened).toHaveBeenCalled();
      });

      it('should emit closed event when closed file-picker dialog', async () => {
        createTestComponent(BasicFileUpload);
        const closed = vi.fn().mockName('spy');
        fileUploaderInstance._closedStream.subscribe(() => {
          closed();
        });
        addFileButton.click();
        addFileButton.focus();
        fixture.detectChanges();
        expect(closed).toHaveBeenCalled();
      });
    });

    describe('form data field name', () => {
      /**
       * Uploads the given number of fake files and returns the spy of the stubbed post request.
       * The request is stubbed so that the sent form data can be inspected directly.
       */
      function uploadFakeFiles(count: number) {
        const postSpy = vi.spyOn(TestBed.inject(HttpClient), 'post').mockReturnValue(of({}));

        let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
        testInstance.form.patchValue({
          documents: Array.from({ length: count }, () => new FileItem(fakeFile)),
        });

        fileUploaderInstance.uploadFiles();

        return postSpy;
      }

      function formDataOfCall(
        postSpy: ReturnType<typeof uploadFakeFiles>,
        index: number,
      ): FormData {
        return postSpy.mock.calls[index][1] as FormData;
      }

      it('should append the files with "uploads[]" by default', () => {
        createTestComponent(BasicFileUpload);

        const formData = formDataOfCall(uploadFakeFiles(2), 0);

        expect(formData.getAll('uploads[]')).toHaveLength(2);
      });

      it('should append the files with the configured field name', () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.formDataFieldName = 'upload';

        const formData = formDataOfCall(uploadFakeFiles(2), 0);

        expect(formData.has('uploads[]')).toBe(false);
        expect(formData.getAll('upload')).toHaveLength(2);
      });

      it('should append the file with the configured field name when uploading separately', () => {
        createTestComponent(BasicFileUpload);
        testInstance.uploadConfig.formDataFieldName = 'upload';
        testInstance.uploadConfig.uploadSeparately = true;

        const postSpy = uploadFakeFiles(2);

        expect(postSpy).toHaveBeenCalledTimes(2);
        [0, 1].forEach((index) => {
          const formData = formDataOfCall(postSpy, index);
          expect(formData.has('uploads[]')).toBe(false);
          expect(formData.getAll('upload')).toHaveLength(1);
        });
      });
    });
  });
});

@Component({
  selector: 'test-basic-file-upload',
  template: `
    <form [formGroup]="form">
      <nx-file-uploader #documentUpload formControlName="documents" [uploader]="uploader" multiple>
        <nx-label>Required file to upload</nx-label>
        <span nxFileUploadHint>All files are accepted</span>
        <button type="button" nxFileUploadButton id="add-file">Add Files</button>
      </nx-file-uploader>

      <button id="upload-trigger" [nxFileUploadTriggerFor]="documentUpload" type="button">
        Upload files
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFileUploaderModule, NxLabelModule, ReactiveFormsModule, FormsModule],
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
@Component({
  selector: 'test-basic-file-upload-success-on-empty-list',
  template: `
    <form [formGroup]="form">
      <nx-file-uploader #documentUpload formControlName="documents" [uploader]="uploader" multiple>
        <nx-label>Required file to upload</nx-label>
        <span nxFileUploadHint>All files are accepted</span>
        <button type="button" nxFileUploadButton id="add-file">Add Files</button>
      </nx-file-uploader>

      <button id="upload-trigger" [nxFileUploadTriggerFor]="documentUpload" type="button">
        Upload files
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFileUploaderModule, NxLabelModule, ReactiveFormsModule, FormsModule],
})
class BasicFileUploadSuccessOnEmptyList extends FileUploaderSendsSuccessOnEmptyListTest {
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
