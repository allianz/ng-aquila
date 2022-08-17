import { HttpClientModule } from '@angular/common/http';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxFileUploaderComponent } from './file-uploader.component';
import { FileItem } from './file-uploader.model';
import { NxFileUploaderModule } from './file-uploader.module';

@Directive()
abstract class FileUploaderTest {
    @ViewChild(NxFileUploaderComponent, { static: false }) fileUploaderInstance!: NxFileUploaderComponent;

    form!: FormGroup;
    queueList!: null | FileItem[];
    required = false;
    multiple = false;
    maxFileSize!: number;
    maxFileNumber!: number;
    accept: any;
}

describe('NxFileUploaderComponent', () => {
    let fixture: ComponentFixture<FileUploaderTest>;
    let testInstance: FileUploaderTest;
    let fileUploaderInstance: NxFileUploaderComponent;
    let buttonElm: HTMLElement;
    let hintElement: HTMLElement;
    let inputElm: HTMLInputElement;
    let labelElm: HTMLInputElement;

    function createTestComponent(component: Type<FileUploaderTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        fileUploaderInstance = testInstance.fileUploaderInstance;
        buttonElm = fixture.nativeElement.querySelector('[nxFileUploadButton]');
        inputElm = fixture.nativeElement.querySelector('input[type=file]');
        hintElement = fixture.nativeElement.querySelector('[nxFileUploadHint]');
        labelElm = fixture.nativeElement.querySelector('nx-label');
    }

    function createAndAddFile(name: string, type: string) {
        let fakeFile = new File(['3555'], name, { type });
        fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024 ** 3, writable: false });
        const fileList = { 0: fakeFile, length: 1, item: () => fakeFile };
        fileUploaderInstance._onFileChange({ type: 'change', target: { files: fileList } });
        fixture.detectChanges();
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicFileUpload, ReactiveFileUpload, DynamicFileUpload, CustomItemTemplateFileUpload],
            imports: [NxFileUploaderModule, NxLabelModule, NxIconModule, ReactiveFormsModule, FormsModule, NxErrorModule, HttpClientModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('should create', () => {
            createTestComponent(BasicFileUpload);
            expect(fileUploaderInstance).toBeTruthy();
        });

        it('should open the file browser when click on the button', () => {
            createTestComponent(BasicFileUpload);
            spyOn(inputElm, 'click').and.callThrough();
            buttonElm.click();

            expect(inputElm.click).toHaveBeenCalled();
        });

        it('should use default template class', fakeAsync(() => {
            createTestComponent(BasicFileUpload);
            createAndAddFile('fake file', 'text/html');
            const defaultTemplateWrapper = fixture.nativeElement.querySelector('.nx-file-uploader--default-template') as HTMLElement;

            expect(defaultTemplateWrapper).not.toBeNull();
        }));
    });

    describe('Template-Driven Form', () => {
        it('recognize and assign ngControl', fakeAsync(() => {
            createTestComponent(DynamicFileUpload);

            fixture.detectChanges();
            tick();

            expect(fileUploaderInstance.ngControl).toBeDefined();
        }));
    });

    describe('Custom Item Template', () => {
        it('should create', () => {
            createTestComponent(CustomItemTemplateFileUpload);
            expect(fileUploaderInstance).toBeTruthy();
        });

        it('should replace the default template', fakeAsync(() => {
            createTestComponent(CustomItemTemplateFileUpload);
            createAndAddFile('fake file', 'text/html');

            const customWrapper = fixture.nativeElement.querySelector('.nx-file-uploader--file-row .customWrapper') as HTMLElement;
            expect(customWrapper).not.toBeNull();

            const defaultTemplateWrapper = fixture.nativeElement.querySelector('.nx-file-uploader--default-template') as HTMLElement;

            expect(defaultTemplateWrapper).toBeNull();
        }));

        it('should provide file and context variables within template', fakeAsync(() => {
            createTestComponent(CustomItemTemplateFileUpload);
            createAndAddFile('fake file', 'text/html');

            const expectedContextClassName = fixture.componentInstance.fileUploaderInstance;
            const outputTemplateContextOutput = (fixture.componentInstance as any).outputTemplateContext;
            expect(expectedContextClassName).toBe(outputTemplateContextOutput);

            // @ts-expect-error
            const expectedFirstFileClassName = fixture.componentInstance.queueList[0];
            const outputFileOutput = (fixture.componentInstance as any).outputFile;
            expect(expectedFirstFileClassName).toBe(outputFileOutput);
        }));
    });

    describe('Reactive', () => {
        it('should patch operations in reactive forms', () => {
            createTestComponent(ReactiveFileUpload);
            expect(testInstance.form.controls['documents'].value).toBeFalsy();

            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value).toBeTruthy();
        });

        it('should reflect the file list', () => {
            createTestComponent(ReactiveFileUpload);

            expect(fileUploaderInstance.value).toBeFalsy();
            expect(testInstance.form.controls['documents'].value).toBeNull();

            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            testInstance.form.patchValue({ documents: [new FileItem(fakeFile)] });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value).toBeTruthy();
        });

        it('should set the control to dirty when value changes in the DOM', () => {
            createTestComponent(ReactiveFileUpload);

            expect(testInstance.form.get('documents')?.dirty).withContext('Expected control to start out pristine.').toBeFalse();

            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 0, writable: false });
            testInstance.form.setValue({ documents: [new FileItem(fakeFile)] });
            testInstance.form.controls['documents'].markAsTouched();
            testInstance.form.markAsTouched();
            testInstance.form.markAsDirty();

            fixture.detectChanges();

            expect(testInstance.form.dirty).withContext('Expected control to be dirty.').toBeTrue();
        });

        it('should programmatically set the files', () => {
            createTestComponent(ReactiveFileUpload);
            expect(testInstance.form.controls['documents'].value).toBeNull();

            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });

            const fileList = {
                0: fakeFile,
                1: fakeFile,
                length: 2,
                item: () => fakeFile,
            };

            fileUploaderInstance._onFileChange({
                type: 'change',
                target: {
                    files: fileList,
                },
            });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value.length).toBe(2);
            expect((fixture.nativeElement.querySelectorAll('.nx-file-uploader--file-row') as HTMLElement[]).length).toBe(2);
        });
    });

    describe('Queue actions', () => {
        it('should delete file from the queue', () => {
            createTestComponent(ReactiveFileUpload);

            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024, writable: false });
            const fileList = {
                0: fakeFile,
                1: fakeFile,
                length: 2,
                item: () => fakeFile,
            };

            fileUploaderInstance._onFileChange({
                type: 'change',
                target: {
                    files: fileList,
                },
            });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value.length).toBe(2);

            const deleteAction = fixture.nativeElement.querySelector('.nx-file-uploader--file-row-actions button') as HTMLElement;
            deleteAction.click();
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value.length).toBe(1);
        });

        it('should set file state from the form', fakeAsync(() => {}));
    });

    describe('Validation', () => {
        it('should be required', () => {
            createTestComponent(ReactiveFileUpload);
            const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;
            testInstance.required = true;
            fixture.detectChanges();
            submitButton.click();
            fixture.detectChanges();

            expect(testInstance.form.valid).toBeFalse();
        });

        it('should be invalid when all files are deleted from the queue', () => {
            createTestComponent(ReactiveFileUpload);
            fixture.detectChanges();
            let fakeFile = new File(['1'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 12, writable: false });
            const fileList = {
                0: fakeFile,
                length: 1,
                item: () => fakeFile,
            };

            fileUploaderInstance._onFileChange({
                type: 'change',
                target: {
                    files: fileList,
                },
            });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value.length).toBe(1);

            const deleteAction = fixture.nativeElement.querySelector('.nx-file-uploader--file-row-actions button') as HTMLElement;
            deleteAction.click();
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].value.length).toBe(0);
            expect(testInstance.form.controls['documents'].hasError('required')).toBeTrue();
        });

        it('should be error when selected file size is bigger than the max file', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.required = true;
            testInstance.maxFileSize = 1024;
            fixture.detectChanges();

            let fakeFile = new File(['3555'], 'fake file', { type: 'text/html' });
            fakeFile = Object.defineProperty(fakeFile, 'size', { value: 1024 ** 3, writable: false });
            const fileList = {
                0: fakeFile,
                1: fakeFile,
                length: 2,
                item: () => fakeFile,
            };

            fileUploaderInstance._onFileChange({
                type: 'change',
                target: {
                    files: fileList,
                },
            });
            fixture.detectChanges();

            expect(testInstance.form.controls['documents'].valid).toBeFalse();
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileSize')).toBeTrue();
            expect(testInstance.form.controls['documents'].hasError('required')).toBeTrue();
        });

        it('should be valid when accept is not set', () => {
            createTestComponent(ReactiveFileUpload);
            createAndAddFile('fake file', 'text/html');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeFalse();
        });

        it('is invalid when file does not fit to mime type', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            fixture.detectChanges();

            createAndAddFile('fake file', 'text/html');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeTrue();
        });

        it('is valid when file fits to mime type', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            fixture.detectChanges();
            createAndAddFile('fake file', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeFalse();

            testInstance.accept = 'image/*';
            fixture.detectChanges();
            createAndAddFile('test.png', 'image/png');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeFalse();
        });

        it('no error when fileType is not set', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            fixture.detectChanges();
            createAndAddFile('fake file', '');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeFalse();
        });

        it('valid when file ending is allowed', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.accept = '.png, .jpg';
            fixture.detectChanges();
            createAndAddFile('test.png', 'some type');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeFalse();
        });

        it('invalid when file ending is not allowed', () => {
            createTestComponent(ReactiveFileUpload);
            testInstance.accept = '.jpg';
            fixture.detectChanges();
            createAndAddFile('test.png', 'some type');
            expect(testInstance.form.controls['documents'].hasError('NxFileUploadFileTypeNotAccepted')).toBeTrue();
        });

        describe('maxFileNumber', () => {
            it('is valid if maxFileNumber is not set', () => {
                createTestComponent(ReactiveFileUpload);
                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeFalse();
            });

            it('is valid with no file added', () => {
                createTestComponent(ReactiveFileUpload);
                testInstance.maxFileNumber = 2;
                fixture.detectChanges();
                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeFalse();
            });

            it('is valid if file number <= maxFileNumber', () => {
                createTestComponent(ReactiveFileUpload);
                testInstance.maxFileNumber = 2;
                createAndAddFile('test.png', 'some type');
                inputElm.dispatchEvent(new Event('change'));
                fixture.detectChanges();
                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeFalse();

                // add a second file
                createAndAddFile('test.png', 'some type');
                inputElm.dispatchEvent(new Event('change'));
                fixture.detectChanges();
                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeFalse();
            });

            it('is invalid if file number > maxFileNumber', () => {
                createTestComponent(ReactiveFileUpload);
                testInstance.maxFileNumber = 2;
                createAndAddFile('test.png', 'some type');
                createAndAddFile('test.png', 'some type');
                createAndAddFile('test.png', 'some type');
                inputElm.dispatchEvent(new Event('change'));
                fixture.detectChanges();
                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeTrue();
            });

            it('is updated after deleting a file', () => {
                createTestComponent(ReactiveFileUpload);
                testInstance.maxFileNumber = 2;
                createAndAddFile('test.png', 'some type');
                createAndAddFile('test.png', 'some type');
                createAndAddFile('test.png', 'some type');
                inputElm.dispatchEvent(new Event('change'));
                fixture.detectChanges();

                // click delete button of first file
                fixture.nativeElement.querySelector('nx-file-upload-delete').click();
                fixture.detectChanges();

                expect(testInstance.form.controls['documents'].hasError('NxFileUploadMaxFileNumber')).toBeFalse();
            });
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicFileUpload);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should add aria described by for hint and label', fakeAsync(() => {
            createTestComponent(ReactiveFileUpload);
            tick();
            fixture.detectChanges();

            const ariaDescribedBy = buttonElm.attributes.getNamedItem('aria-describedby')?.value;
            tick();
            fixture.detectChanges();

            expect(ariaDescribedBy).toContain(hintElement.id);
            expect(ariaDescribedBy).toContain(labelElm.id);
        }));

        it('should set described by with the error ids', fakeAsync(() => {
            createTestComponent(ReactiveFileUpload);
            const submitButton = fixture.nativeElement.querySelector('#submit-button') as HTMLButtonElement;
            testInstance.required = true;
            tick();
            fixture.detectChanges();
            submitButton.click();
            fixture.detectChanges();
            tick();

            const ariaDescribedBy = buttonElm.attributes.getNamedItem('aria-describedby')?.value;
            expect(ariaDescribedBy).toContain(testInstance.fileUploaderInstance._errorList.map(error => error.id));
        }));
    });
});

@Component({
    template: `
        <form>
            <nx-file-uploader>
                <nx-label>Required file to upload</nx-label>
                <span nxFileUploadHint>All files are accepted</span>
                <button nxButton="primary" type="button" nxFileUploadButton>
                    <nx-icon name="download" class="nx-margin-right-2xs"></nx-icon>
                    Add Files
                </button>
            </nx-file-uploader>
        </form>
    `,
})
class BasicFileUpload extends FileUploaderTest {
    fb;

    constructor() {
        super();

        this.fb = new FormBuilder();

        this.form = this.fb.group({
            documents: [],
        });
    }
}

@Component({
    template: `
        <form [formGroup]="form">
            <nx-file-uploader
                formControlName="documents"
                [required]="required"
                [maxFileSize]="maxFileSize"
                multiple
                [maxFileNumber]="maxFileNumber"
                [accept]="accept"
            >
                <nx-label size="small">Required file to upload</nx-label>
                <span nxFileUploadHint>maximum Filesize 2MB</span>

                <button nxButton="primary" type="button" nxFileUploadButton>
                    <nx-icon name="download" class="nx-margin-right-2xs"></nx-icon>
                    Add Files
                </button>

                <nx-error *ngIf="form.controls['documents'].hasError('required')">Required!</nx-error>
                <nx-error *ngIf="form.controls['documents'].hasError('NxFileUploadMaxFileSize')">
                    File „ {{ form.controls['documents'].getError('NxFileUploadMaxFileSize').fileName | json }}“ can not be uploaded. File size exceeds size
                    limit!
                </nx-error>
            </nx-file-uploader>

            <button nxButton="primary" type="submit" id="submit-button">Upload files</button>
        </form>
    `,
})
class ReactiveFileUpload extends FileUploaderTest {
    fb;
    required: any;
    maxFileSize: any;
    queueList: any;
    maxFileNumber: any;

    constructor() {
        super();

        this.fb = new FormBuilder();
        this.form = this.fb.group({
            documents: [this.queueList, Validators.required],
        });
    }
}

@Component({
    template: `
        <nx-file-uploader [(ngModel)]="queueList">
            <nx-label size="small">Please upload a file</nx-label>
            <button nxButton="primary" type="button" nxFileUploadButton>
                <nx-icon name="download" class="nx-margin-right-2xs"></nx-icon>
                Add a file
            </button>
        </nx-file-uploader>
    `,
})
class DynamicFileUpload extends FileUploaderTest {
    queueList: any;
}

@Component({
    template: `
        <nx-file-uploader [(ngModel)]="queueList" [itemTemplate]="myItemTemplate" #documentUpload>
            <nx-label size="small">Please upload a file</nx-label>
            <button nxButton="primary" type="button" nxFileUploadButton>
                <nx-icon name="download" class="nx-margin-right-2xs"></nx-icon>
                Add a file
            </button>
        </nx-file-uploader>

        <ng-template #myItemTemplate let-templateContext="templateContext" let-file="file">
            <!-- Both calls are used to provide the inner variables to the test class -->
            {{ setOutputTemplateContext(templateContext) }}
            {{ setOutputFile(file) }}

            <section class="customWrapper">
                <nx-file-upload-name [name]="file?.name"></nx-file-upload-name>

                <nx-file-upload-size
                    [size]="file?.size"
                    [isUploading]="file.isUploading"
                    [uploadingLabel]="templateContext.uploadingLabel"
                ></nx-file-upload-size>

                <div class="nx-file-uploader--file-row-actions">
                    <nx-file-upload-status
                        [isUploading]="file.isUploading"
                        [isUploaded]="file.isUploaded"
                        [uploadedLabel]="templateContext.uploadedLabel"
                    ></nx-file-upload-status>

                    <nx-file-upload-delete
                        [deleteLabel]="templateContext.deleteLabel"
                        [isUploading]="file.isUploading"
                        (click)="templateContext.removeFile(file)"
                    ></nx-file-upload-delete>
                </div>
            </section>
        </ng-template>
    `,
})
class CustomItemTemplateFileUpload extends FileUploaderTest {
    queueList: any;
    outputTemplateContext: any;
    outputFile: any;

    setOutputTemplateContext(value: any) {
        this.outputTemplateContext = value;
    }

    setOutputFile(value: any) {
        this.outputFile = value;
    }
}
