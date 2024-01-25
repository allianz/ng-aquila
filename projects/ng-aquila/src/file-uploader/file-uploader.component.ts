import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ERROR_DEFAULT_OPTIONS, NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, take, takeUntil } from 'rxjs/operators';

import { NxFileUploader } from './file-uploader';
import { FileItem } from './file-uploader.model';
import {
    FileUploadError,
    getFileExtension,
    isFileTypeValid,
    isMaxFileNumberValid,
    isMaxFileSizeValid,
    NxFileUploaderValidators,
} from './file-uploader.validations';
import { NxFileUploaderButtonDirective } from './file-uploader-button.directive';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';
import { NxFileUploaderHintDirective } from './file-uploader-hint.directive';
import { NxFileUploaderIntl } from './file-uploader-intl';

let nextId = 0;

@Component({
    selector: 'nx-file-uploader',
    templateUrl: './file-uploader.component.html',
    exportAs: 'NxFileUploaderComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./file-uploader.component.scss'],
    host: {
        '[attr.aria-invalid]': 'errorState',
        '[class.has-error]': 'errorState',
    },
    providers: [
        {
            provide: ERROR_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'message',
            },
        },
    ],
})
export class NxFileUploaderComponent implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy, DoCheck, OnInit, AfterViewInit {
    /** @docs-private */
    @ContentChild(NxFileUploaderButtonDirective, { static: false }) button?: NxFileUploaderButtonDirective;

    /** @docs-private */
    @ContentChild(NxFileUploaderDropZoneComponent, { static: true }) _dropZone!: NxFileUploaderDropZoneComponent;

    /** @docs-private */
    @ViewChild('nativeInputFile', { static: false }) nativeInputFile!: ElementRef;

    /** @docs-private */
    @ContentChild(NxLabelComponent, { static: false }) _label?: NxLabelComponent;

    /** @docs-private */
    @ContentChildren(NxFileUploaderHintDirective) _hintChildren!: QueryList<NxFileUploaderHintDirective>;

    /** @docs-private */
    @ContentChildren(NxErrorComponent) _errorList!: QueryList<NxErrorComponent>;

    @ViewChildren('fileRowElement') _fileRowElements!: QueryList<ElementRef>;

    /** Preserves the current value of the _fileRowElements ViewChildren in case _fileRowElements changes. */
    private _fileRowElementsPrevious!: QueryList<ElementRef>;

    private _filesSubscriptions: Subscription[] = [];

    /**
     * An event emitted when queue is changed.
     *
     * Emits the changed array of FileItems.
     * @docs-private
     */
    @Output() readonly valueChange = new EventEmitter<FileItem[]>();

    /**
     * An event emitted when a file is deleted from the queue.
     *
     * Emits the deleted FileItem.
     */
    @Output() readonly fileDeleted = new EventEmitter<FileItem>();

    /**
     * An event emitted when one or more files were added to the file input.
     *
     * Emits the selected `FileItem | FileItem[]`.
     */
    @Output() readonly filesSelected = new EventEmitter<FileItem[]>();

    private _controlValidators: ValidatorFn | null = null;
    _templateContext;

    /** @docs-private */
    errorState = false;

    /** List of errors */
    errors: FileUploadError[] = [];

    /** Whether the file uploader use common validators (file type, file size). */
    @Input() set noBlockingValidators(value: BooleanInput) {
        this._noBlockingValidators = coerceBooleanProperty(value);
    }
    get noBlockingValidators(): boolean {
        return this._noBlockingValidators;
    }
    private _noBlockingValidators = false;

    /** @docs-private */
    readonly stateChanges = new Subject<void>();

    /** @docs-private */
    validatorFnArray: any[] = [];

    /** Sets the id of the file uploader. */
    @Input() set id(value: string) {
        this._id = value;
        this._cdr.markForCheck();
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-file-uploader-${nextId++}`;
    _inputId = `${this.id}-input`;
    _labelId = `${this.id}-label`;

    /** Whether the file uploader is required. */
    @Input() set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return this._required;
    }
    private _required = false;

    /** The value of the file upload. */
    @Input() set value(value: FileItem[] | undefined) {
        this.writeValue(value!);
    }
    get value(): FileItem[] | undefined {
        return this._value!;
    }
    private _value!: FileItem[] | null;

    /** Name that is used for accessibility. */
    @Input() set name(value: string) {
        this._name = value;
    }
    get name(): string {
        return this._name;
    }
    private _name!: string;

    /** Whether the file uploader is disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        if (this.button) {
            this.button.disabled = this._disabled;
        }

        if (this._dropZone) {
            this._dropZone.disabled = this._disabled;
        }

        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Whether the file uploader accepts multiple files to be added. */
    @Input() set multiple(value: BooleanInput) {
        this._multiple = coerceBooleanProperty(value);
    }
    get multiple(): boolean {
        return this._multiple;
    }
    private _multiple = false;

    /** The accepted file types */
    @Input() set accept(value: string) {
        this._accept = value;
    }
    get accept(): string {
        return this._accept;
    }
    private _accept!: string;

    /** Whether to validate files that don't have provide a file type. Disabled by default. */
    @Input() strictAcceptValidation = false;

    /** The max file size in bytes used for validation */
    @Input() set maxFileSize(value: NumberInput) {
        this._maxFileSize = coerceNumberProperty(value);
    }
    get maxFileSize(): number {
        return this._maxFileSize;
    }
    private _maxFileSize = 0;

    /** Sets the file uploader for the component. */
    @Input() set uploader(newUploader: NxFileUploader) {
        if (this._uploader !== newUploader) {
            this._uploader = newUploader;
        }
    }
    get uploader(): NxFileUploader {
        return this._uploader;
    }
    private _uploader!: NxFileUploader;

    /** The max number of files that is accepted. */
    @Input() set maxFileNumber(value: NumberInput) {
        this._maxFileNumber = coerceNumberProperty(value);
    }
    get maxFileNumber(): number {
        return this._maxFileNumber!;
    }
    private _maxFileNumber: number | null = null;

    /** Sets the template for the file items. */
    @Input() set itemTemplate(template: TemplateRef<any>) {
        if (this._itemTemplate !== template) {
            this._itemTemplate = template;
        }
    }
    get itemTemplate(): TemplateRef<any> {
        return this._itemTemplate;
    }
    _itemTemplate!: TemplateRef<any>;

    private readonly _destroyed = new Subject<void>();

    /** Event emitted when the file picker dialog has been toggled. */
    @Output() readonly openedChange = new EventEmitter<boolean>();

    /** Event emitted when the file picker dialog has been opened. */
    @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(
        filter(o => o),
        map(() => {}),
    );

    /** Event emitted when the file picker dialog has been closed. */
    @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(
        filter(o => !o),
        map(() => {}),
    );

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        readonly _intl: NxFileUploaderIntl,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
        /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        this._templateContext = this;
    }

    ngOnInit(): void {
        if (this.ngControl?.control) {
            // we need to save the control validators.
            this._controlValidators = this.ngControl.control.validator;
        }

        this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
            this.stateChanges.next();
        });

        this._resetValidators();
    }

    ngAfterViewInit(): void {
        this._fileRowElements.forEach(row => this._focusMonitor.monitor(row));
        this._fileRowElementsPrevious = this._fileRowElements;
        this._fileRowElements.changes.pipe(takeUntil(this._destroyed)).subscribe(rowElements => {
            this._fileRowElementsPrevious.forEach(row => this._focusMonitor.stopMonitoring(row));
            this._fileRowElementsPrevious = rowElements;
            rowElements.forEach((row: ElementRef) => this._focusMonitor.monitor(row));
        });
    }

    ngOnChanges(): void {
        this.stateChanges.next();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this.stateChanges.complete();
        this._filesSubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        this._fileRowElements.forEach(row => this._focusMonitor.stopMonitoring(row));
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    /** @docs-private */
    onChangeCallback = (_: any) => {};

    /** @docs-private */
    onTouchedCallback = () => {};

    registerOnChange(callback: any): void {
        this.onChangeCallback = callback;
    }

    registerOnTouched(callback: any): void {
        this.onTouchedCallback = callback;
    }

    writeValue(value: FileItem[]) {
        if (this._value !== value) {
            if (value) {
                if (this._filesSubscriptions) {
                    this._filesSubscriptions.forEach((fileSubscription: Subscription) => fileSubscription.unsubscribe());
                    this._filesSubscriptions = [];
                }
            }
            this._value = value;
            this._subscribeToFileChanges();
        }
    }

    private isValidOnSelection(file: File) {
        if (!isMaxFileSizeValid(file, this.maxFileSize)) {
            this.setFileSizeError(file);
        }
        if (!isFileTypeValid(file, this.accept, this.strictAcceptValidation)) {
            this.setFileTypeError(file);
        }

        return this.errors.length === 0;
    }

    _resetValidators(clear = false) {
        if (this.ngControl?.control) {
            if (clear) {
                this.ngControl.control.clearValidators();
            }

            const validators = [];

            if (this._controlValidators) {
                validators.unshift(this._controlValidators);
            }

            if (this.validatorFnArray) {
                validators.push(...this.validatorFnArray);
            }

            this.ngControl.control.setValidators(validators);
            this.ngControl.control.updateValueAndValidity();
        }
    }

    ngAfterContentInit(): void {
        if (!this.button) {
            return;
        }
        this.button._clicked.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.errors = [];

            const reachMaxFileNumber = this.maxFileNumber && (this.value?.length || 0) === this.maxFileNumber;
            if (reachMaxFileNumber) {
                this.setMaxFileNumberError(this.maxFileNumber);
                this._resetValidators(true);
                return;
            }
            this.nativeInputFile.nativeElement.click();
        });
        const focusButton$ = fromEvent(this.button.elemetRef.nativeElement, 'focus');
        const clickButton$ = fromEvent(this.button.elemetRef.nativeElement, 'click');
        let opened = false;

        clickButton$.pipe(takeUntil(this._destroyed)).subscribe(() => {
            opened = true;
            this.openedChange.emit(opened);
        });

        focusButton$.pipe(takeUntil(this._destroyed)).subscribe(() => {
            // file picker dialog dont have closed event, so using combination of focus + opend to check instead.
            if (opened) {
                opened = false;
                this.openedChange.emit(opened);
            }
        });

        this.button.disabled = this.disabled;

        if (this._dropZone) {
            this._dropZone.fileDropped.pipe(takeUntil(this._destroyed)).subscribe(files => {
                this._addFilesToQueue(files);
            });
            this._dropZone.disabled = this.disabled;
        }

        if (this._label) {
            this._label.for = this._inputId;
            this._label.id = this._labelId;
        }

        this.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });

        // Re-validate when the number of hints changes.
        this._hintChildren.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });

        // Re-validate when the number of hints changes.
        this._errorList.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });
    }

    _addFilesToQueue(files: File[]) {
        if (!this.multiple) {
            this.value = [];
        }

        this._setFileListFromValue(files);
        this._resetValidators(true);

        this.onChangeCallback(this.value);
        this.onTouchedCallback();
        this.valueChange.emit(this.value);
        this.filesSelected.emit(this.value);
    }

    _setFileListFromValue(files: File[]) {
        // we need to set max file size errors to false
        this.validatorFnArray = [];
        if (files === null) {
            this.value = undefined;
        } else {
            this.errors = [];
            const totalFilesNum = (this.value?.length || 0) + files.length;
            if (isMaxFileNumberValid(totalFilesNum, this.maxFileNumber)) {
                files.forEach((file: File) => {
                    if (this.isValidOnSelection(file)) {
                        const tmp = new FileItem(file);
                        if (this.value) {
                            this.value.push(tmp);
                        } else {
                            this.value = [tmp];
                        }
                        this._cdr.markForCheck();
                    }
                });
            } else {
                this.setMaxFileNumberError(totalFilesNum);
            }

            this._subscribeToFileChanges();
        }
    }

    /** Removes a file from the value list of the file upload input. */
    removeFile(file: any) {
        this.value = this.value!.filter(item => file !== item);

        if (this._filesSubscriptions) {
            this._filesSubscriptions.forEach((fileSubscription: Subscription) => fileSubscription.unsubscribe());
            this._filesSubscriptions = [];
        }

        this._subscribeToFileChanges();

        this.validatorFnArray = []; // bugfix: kick invalid type error on file remove
        this._resetValidators(true);
        this._cdr.markForCheck();

        this.valueChange.emit(this.value);
        this.fileDeleted.emit(file);
        this.onTouchedCallback();
        this.onChangeCallback(this.value);

        // resets the value of the file input, so that if a file is deleted and added again. otherwise there is no change detected
        this.nativeInputFile.nativeElement.value = '';
    }

    /** Uploads the files via the defined uploader. */
    uploadFiles() {
        if (!this.uploader) {
            console.warn('No uploader found. Please define a NxFileUpload to use the uploading mechanism.');
            return;
        }

        // Remove latest upload failed from the list
        if (this.uploader) {
            this.uploader.response.pipe(take(1)).subscribe(res => {
                const successFiles = this.value?.filter(file => file.isUploaded && !file.isError);
                const errorFiles = res.error?.files.filter(file => !file.isUploaded && file.isError);
                if (errorFiles?.length) {
                    errorFiles?.forEach(file => this.setFileUploadError(file, 'An error occured while uploading'));
                }
                this.value = successFiles;
            });
            this.uploader.uploadFiles(this.value!);
        }
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    /**
     * The label for the uploading state used in the queue.
     * @docs-private
     */
    get uploadingLabel(): string {
        return this._intl.uploadingLabel;
    }

    /**
     * The label for the uploading state used in the queue.
     * @docs-private
     */
    get deleteLabel(): string {
        return this._intl.deleteLabel;
    }

    /**
     * The label for the uploading state used in the queue.
     * @docs-private
     */
    get uploadedLabel(): string {
        return this._intl.uploadedStateLabel;
    }

    /**
     * The label for the uploaded files in the queue.
     * @docs-private
     */
    get uploadedListLabel(): string {
        return this._intl.uploadedListLabel;
    }

    /**
     * Sets the list of element IDs that describe the child control. This allows the trigger element (button) to update
     * its `aria-describedby` attribute accordingly.
     */
    private _syncDescribedByIds() {
        let ids: string[] = [];
        ids = this._hintChildren.map(hint => hint.id);
        ids = this._label ? [this._label.id, ...ids] : ids;
        ids = [...this._errorList.map(error => error.id), ...ids];
        this.button?.setDescribedByIds(ids);
    }

    _handleKeydownListRow(event: KeyboardEvent) {
        if (event.keyCode === DOWN_ARROW) {
            const nextFileItemRow = (event.target as HTMLElement).nextSibling as HTMLElement;
            if (nextFileItemRow?.classList?.contains('nx-file-uploader--file-row')) {
                event.preventDefault();
                nextFileItemRow.focus();
            }
        } else if (event.keyCode === UP_ARROW) {
            const previousFileItemRow = (event.target as HTMLElement).previousSibling as HTMLElement;
            if (previousFileItemRow?.classList?.contains('nx-file-uploader--file-row')) {
                event.preventDefault();
                previousFileItemRow.focus();
            }
        }
    }

    /**
     * Triggered when the `input[type=file]` is changed.
     */
    _onFileChange(event: any) {
        if (this.disabled) {
            return;
        }

        const target = event.target as HTMLInputElement;
        const files: File[] = Array.from(target.files ?? []);

        this._addFilesToQueue(files);
        this.stateChanges.next();
        this._cdr.markForCheck();
        this.nativeInputFile.nativeElement.value = '';
    }

    /** Listens to changes in each file. */
    _subscribeToFileChanges() {
        if (this.value?.length) {
            let subscription;
            this.value.map(file => {
                subscription = file.onChange.subscribe(() => {
                    this._cdr.markForCheck();
                });
                this._filesSubscriptions.push(subscription);
            });
        }
    }

    private setMaxFileNumberError(totalFilesNum: number) {
        this.errors.push({
            filename: '',
            type: 'fileNumber',
            max: this.maxFileNumber,
            actual: totalFilesNum,
        });
        if (!this.noBlockingValidators && this.ngControl?.control) {
            this.validatorFnArray.push((control: AbstractControl): ValidationErrors | null => ({
                NxFileUploadMaxFileNumber: { max: this.maxFileNumber, actual: totalFilesNum },
            }));
        }
    }

    private setFileSizeError(file: File) {
        this.errors.push({
            filename: file.name,
            type: 'fileSize',
            max: this.maxFileSize,
            actual: file.size,
        });
        if (!this.noBlockingValidators && this.ngControl?.control) {
            this.validatorFnArray.push(NxFileUploaderValidators.maxFileSize(this.maxFileSize, file));
        }
    }

    private setFileTypeError(file: File) {
        this.errors.push({
            filename: file.name,
            type: 'fileType',
            extension: this.accept,
            actual: getFileExtension(file.name),
        });
        if (!this.noBlockingValidators && this.ngControl?.control) {
            this.validatorFnArray.push(NxFileUploaderValidators.fileType(file, this.accept, this.strictAcceptValidation));
        }
    }

    private setFileUploadError(file: FileItem, reason: string) {
        this.errors.push({
            filename: file.name,
            type: 'upload',
            reason,
        });
    }

    /** weather all files is uplaoded */
    get allFilesUploaded(): boolean {
        return this.value?.every(f => f.isUploaded) || false;
    }

    setDisabledState?(isDisabled: boolean) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
}
