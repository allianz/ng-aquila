import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxFileUploaderComponent } from './file-uploader.component';
import { FileItem } from './file-uploader.model';
import { NxFileUploaderModule } from './file-uploader.module';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';

@Directive()
abstract class FileUploaderTest {
    @ViewChild(NxFileUploaderComponent, { static: false }) fileUploaderInstance!: NxFileUploaderComponent;

    form!: FormGroup;
    queueList!: null | FileItem[];
    required = false;
    multiple = false;
    disabled = false;
    maxFileSize!: number;
}

describe('NxFileUploaderComponent', () => {
    let fixture: ComponentFixture<FileUploaderTest>;
    let testInstance: FileUploaderTest;
    let fileUploaderInstance: NxFileUploaderComponent;
    let dropZoneElm: DebugElement;
    let dropZone: NxFileUploaderDropZoneComponent;

    function createTestComponent(component: Type<FileUploaderTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        fileUploaderInstance = testInstance.fileUploaderInstance;
        dropZone = testInstance.fileUploaderInstance._dropZone;
        dropZoneElm = fixture.debugElement.query(By.css('nx-file-uploader-drop-zone'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DropZoneFileUpload],
            imports: [NxFileUploaderModule, NxLabelModule, NxIconModule, ReactiveFormsModule, FormsModule, NxErrorModule, HttpClientModule],
        }).compileComponents();
    }));

    describe('drop zone', () => {
        it('should call onDrop when dropping event', () => {
            createTestComponent(DropZoneFileUpload);
            spyOn(dropZone, 'onDrop');
            dropZoneElm.triggerEventHandler('drop', new DragEvent('drop'));
            expect(dropZone.onDrop).toHaveBeenCalled();
        });

        it('should call onDragOver when a drop over event', () => {
            createTestComponent(DropZoneFileUpload);
            spyOn(dropZone, 'onDragOver');
            dropZoneElm.triggerEventHandler('dragover', new DragEvent('dragover'));
            expect(dropZone.onDragOver).toHaveBeenCalled();
        });

        it('should call onDragLeave when a dragleave event', () => {
            createTestComponent(DropZoneFileUpload);
            spyOn(dropZone, 'onDragLeave');
            dropZoneElm.triggerEventHandler('dragleave', new DragEvent('dragleave'));
            expect(dropZone.onDragLeave).toHaveBeenCalled();
        });

        it('should emit the dropped files', () => {
            createTestComponent(DropZoneFileUpload);
            fixture.detectChanges();
            spyOn(dropZone.fileDropped, 'emit');
            const file = new File([''], 'fake-file.jpg');
            const files = [file, file, file];
            const fileDropEvent = { preventDefault: () => {}, dataTransfer: { files, clearData: () => {} } };
            dropZone.onDrop(fileDropEvent as any);
            fixture.detectChanges();

            expect(dropZone.fileDropped.emit).toHaveBeenCalledWith(files);
        });

        it('should not emit the dropped files when disabled', () => {
            createTestComponent(DropZoneFileUpload);
            testInstance.disabled = true;
            fixture.detectChanges();
            spyOn(dropZone.fileDropped, 'emit');
            const file = new File([''], 'fake-file.jpg');
            const fileDropEvent = { preventDefault: () => {}, dataTransfer: { files: [file, file, file], clearData: () => {} } };
            dropZone.onDrop(fileDropEvent as any);
            fixture.detectChanges();

            expect(dropZone.fileDropped.emit).toHaveBeenCalledTimes(0);
        });
    });
});

@Component({
    template: `
        <form [formGroup]="form">
            <nx-file-uploader formControlName="documents" [required]="required" [disabled]="disabled" multiple>
                <nx-label size="small">Required file to upload</nx-label>
                <span nxFileUploadHint>maximum Filesize 2MB</span>
                <nx-file-uploader-drop-zone class="nx-margin-bottom-m">
                    <span>Drag your files here to</span>
                    <button nxButton="primary" type="button" nxFileUploadButton>
                        <nx-icon name="download" class="nx-margin-right-2xs"></nx-icon>
                        Add Files
                    </button>
                </nx-file-uploader-drop-zone>
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
class DropZoneFileUpload extends FileUploaderTest {
    fb;
    required: any;
    queueList: any;
    disabled: any;

    constructor() {
        super();

        this.fb = new FormBuilder();
        this.form = this.fb.group({
            documents: [this.queueList, Validators.required],
        });
    }
}
