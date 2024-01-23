import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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
    forwardRef,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormGroupDirective,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    NgForm,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let nextId = 0;

export class NxCheckboxChangeEvent {
    constructor(
        /** The checked value of the checkbox. */
        readonly checked: boolean,
        /** The value of the checkbox. */
        readonly value: string,
        /** The component instance of the checkbox which emitted the change event. */
        readonly checkbox: NxCheckboxComponent,
    ) {}
}

export class NxCheckboxGroupChangeEvent {
    constructor(
        /** The value of the checkbox group. An array containing all checked checkbox values. */
        readonly value: string[],
        /** The component instance of the checkbox group. */
        readonly checkboxGroup: NxCheckboxGroupComponent,
    ) {}
}

/** Size of the label. */
export type NxCheckboxLabelSize = 'small' | 'large';

@Component({
    selector: 'nx-checkbox-group',
    templateUrl: 'checkbox-group.component.html',
    styleUrls: ['checkbox-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.nx-checkbox-group]': 'true',
        '[class.nx-checkbox-group--negative]': 'negative',
        '[attr.id]': 'id',
        '[attr.required]': 'required',
        '[attr.disabled]': 'disabled || null',
        '[attr.aria-labelledby]': 'this._label?.id  || null',
        '[attr.role]': '"group"',
    },
})
export class NxCheckboxGroupComponent implements ControlValueAccessor, AfterContentInit, OnDestroy, DoCheck {
    @ContentChildren(forwardRef(() => NxCheckboxComponent), { descendants: true }) _checkboxes!: QueryList<NxCheckboxComponent>;

    @ContentChild(forwardRef(() => NxLabelComponent)) _label!: NxLabelComponent;

    errorState = false;

    readonly _stateChanges = new Subject<void>();

    @Output() readonly selectionChange = new EventEmitter<NxCheckboxGroupChangeEvent>();

    /** Sets the Id of the checkbox group. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-checkbox-group-${nextId++}`;

    /** Sets the name of the checkboxes inside the nx-checkbox-group. */
    @Input() set name(value: string) {
        this._name = value;
        this._cdr.markForCheck();
    }
    get name(): string {
        return this._name;
    }
    private _name = '';

    /** Disables all checkboxes inside the nx-checkbox-group. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        if (this._label) {
            this._label.disabled = this._disabled;
        }
        this._stateChanges.next();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Set the negative styles for all the checkboxes inside the nx-checkbox-group */
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
        this._stateChanges.next();
    }
    get negative(): boolean {
        return this._negative;
    }
    private _negative = false;

    /** Sets the label size of the checkboxes inside the group */
    @Input() set labelSize(value: NxCheckboxLabelSize) {
        this._labelSize = value;
        this._stateChanges.next();
    }
    get labelSize(): NxCheckboxLabelSize {
        return this._labelSize!;
    }
    private _labelSize?: NxCheckboxLabelSize;

    /** Whether the nx-checkbox-group are required. */
    @Input() set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return !!this._required;
    }
    private _required?: boolean;

    private _value?: any[];

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
        @Optional() @Self() readonly ngControl: NgControl | null,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterContentInit(): void {
        setTimeout(() => {
            this._updateSelectedCheckboxFromValue(true);
        });

        this._checkboxes.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._value = this._checkboxes.filter(checkbox => checkbox.checked).map(cb => cb.value);

            if (this.ngControl) {
                this.ngControl.control!.setValue(this._value);
            }
            this._updateSelectedCheckboxFromValue();
        });
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._stateChanges.complete();
    }

    writeValue(value: any): void {
        if (this._value !== value) {
            this._value = value;
            this._updateSelectedCheckboxFromValue();
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private _onChange: (value: any) => void = () => {};

    private _onTouched: () => any = () => {};

    private _updateSelectedCheckboxFromValue(initialisation = false): void {
        // prevent reset of class values with empty array during initialisation
        const isValueSet = initialisation ? !!this._value && this._value.length : !!this._value;
        if (this._checkboxes?.length && isValueSet) {
            this._checkboxes.map(checkbox => {
                checkbox.checked = this._value!.includes(checkbox.value);
            });
        }
    }

    /** @docs-private */
    change(value: unknown) {
        const checkedCheckboxValues = this._checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        this._onChange(checkedCheckboxValues);

        if (this._onTouched) {
            this._onTouched();
        }

        this.selectionChange.emit(new NxCheckboxGroupChangeEvent(checkedCheckboxValues, this));
    }

    /** Checkbox instances in the checkbox group. */
    get checkboxes(): NxCheckboxComponent[] {
        return this._checkboxes.toArray();
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this._cdr.markForCheck();
        }
    }
}

@Component({
    selector: 'nx-checkbox',
    templateUrl: 'checkbox.component.html',
    styleUrls: ['checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.nx-checkbox]': 'true',
        '[class.disabled]': 'disabled',
        '[class.nx-checkbox--label-large]': 'labelSize === "large"',
        '[class.nx-checkbox--label-small]': 'labelSize === "small"',
        '[class.nx-checkbox--negative]': 'negative',
        '[class.has-error]': '_controlInvalid() || null',
        '[attr.required]': 'required',
        '[attr.aria-invalid]': '_controlInvalid() || null',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxCheckboxComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NxCheckboxComponent),
            multi: true,
        },
    ],
})
export class NxCheckboxComponent implements ControlValueAccessor, OnDestroy, OnInit, AfterViewInit, Validator {
    /** @docs-private */
    @ViewChild('checkboxLabelWrapper', { static: true }) _checkboxLabelWrapper!: ElementRef;

    @ViewChild('input') _nativeInput!: ElementRef<HTMLElement>;

    /**
     * Id of the checkbox.
     *
     * If not set, the checkbox gets an incremented value by default.
     */
    @Input() set id(value: string) {
        if (value !== this._id) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return `nx-checkbox-${this._id}`;
    }
    private _id: string = (nextId++).toString();

    /** Name of the checkbox. */
    @Input() set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this.checkboxGroup?.name || this._name!;
    }
    private _name: string | null = null;

    /** Whether the checkbox is disabled. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
    }
    get disabled(): boolean {
        return this.checkboxGroup?.disabled || this._disabled;
    }
    private _disabled = false;

    /**
     * Sets the label size of the checkbox.
     *
     * Default: `'small'`.
     */
    @Input() set labelSize(value: NxCheckboxLabelSize) {
        this._labelSize = value;
        this._cdr.markForCheck();
    }
    get labelSize(): NxCheckboxLabelSize {
        return this.checkboxGroup?.labelSize || this._labelSize;
    }
    private _labelSize: NxCheckboxLabelSize = 'small';

    /**
     * Whether the checkbox has negative styling.
     */
    @Input() set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._negative) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this.checkboxGroup?.negative || this._negative;
    }
    private _negative = false;

    /** Whether the checkbox is checked. */
    @Input() set checked(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._checked) {
            if (this._indeterminate) {
                this._setIndeterminate(false);
            }
            this._setChecked(newValue);
        }
    }
    get checked(): boolean {
        return this._checked;
    }
    private _checked = false;

    private _indeterminate = false;

    /** Whether the checkbox is indeterminated. */
    @Input() set indeterminate(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._indeterminate !== newValue) {
            if (this._checked) {
                this._setChecked(false);
            }
            this._setIndeterminate(newValue);
        }
        this._cdr.markForCheck();
    }
    get indeterminate(): boolean {
        return this._indeterminate;
    }

    /** Whether the checkbox is required. */
    @Input() set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return !!this._required;
    }
    private _required?: boolean;

    /** Sets the value of the checkbox. Default value is the checked status. */
    @Input() set value(value: string) {
        this._value = value;
        this._cdr.markForCheck();
    }
    get value(): string {
        return this._value ? this._value : this.checked.toString();
    }
    private _value = '';

    /** An event emitted when the indeterminate value has changed */
    @Output() readonly indeterminateChange = new EventEmitter<boolean>(false);

    /**
     * An event emitted when the checked value has changed.
     *
     * Emits the boolean checked value of the changed checkbox.
     */
    @Output() readonly checkedChange = new EventEmitter<boolean>(false);

    /**
     * An event emitted when the checked value has changed.
     *
     * Emits a NxCheckboxChangeEvent.
     */
    @Output() readonly checkboxChange = new EventEmitter<NxCheckboxChangeEvent>();

    /** @docs-private */
    get labelHasContent(): boolean {
        return !!this._checkboxLabelWrapper.nativeElement.innerHTML.trim();
    }

    private readonly _destroyed = new Subject<void>();

    /**
     * Callback for when the content of the label has changed.
     * @docs-private
     */
    labelContentChanged() {
        this._cdr.detectChanges();
    }

    ngControl: NgControl | null = null;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        @Optional() readonly checkboxGroup: NxCheckboxGroupComponent | null,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
        private readonly _focusMonitor: FocusMonitor,
        private injector: Injector,
    ) {}

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        return this.required && control.value !== true ? { required: true } : null;
    }

    /** @docs-private */
    _controlInvalid(): boolean {
        const parent = this._parentFormGroup || this._parentForm;
        let control: FormControl | NgControl | null = null; // TODO this doesn't seem correct

        if (this.checkboxGroup?.ngControl) {
            control = this.checkboxGroup.ngControl;
        } else {
            control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        }
        return this._errorStateMatcher.isErrorState(control as FormControl, parent);
    }

    ngOnInit(): void {
        this.ngControl = this.injector.get(NgControl, null);

        if (this.checkboxGroup) {
            this.name = this.checkboxGroup.name;
            // when relevant properties of the parent like name and disabled change
            // we need to let change detection know that the template needs an update
            this.checkboxGroup._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._cdr.markForCheck();
            });
        }
    }

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._nativeInput);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._nativeInput);
    }

    private _setIndeterminate(value: boolean) {
        this._indeterminate = value;
        this.indeterminateChange.emit(this._indeterminate);
        this._cdr.markForCheck();
    }

    private _setChecked(value: boolean) {
        this._checked = value;
        this._cdr.markForCheck();
    }

    /** Toggles the checked state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
        if (this.checkboxGroup !== null) {
            this.checkboxGroup.change(this);
        }
    }

    writeValue(value: any): void {
        if (value === null) {
            value = false;
        }
        if (value !== this.checked) {
            this.checked = value;
        }
    }

    private onChangeCallback = (_: any) => {};

    registerOnChange(onChange: any): void {
        this.onChangeCallback = onChange;
    }

    private onTouchedCallback = () => {};

    registerOnTouched(onTouched: any): void {
        this.onTouchedCallback = onTouched;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** Focuses the checkbox element. */
    focus(focusOrigin?: FocusOrigin) {
        this._focusMonitor.focusVia(this._nativeInput, focusOrigin as FocusOrigin);
    }

    /** @docs-private */
    touch() {
        this.onTouchedCallback();
    }

    /** @docs-private */
    _onInputClick(event: Event): void {
        // stop the propagation of the native click on the checkbox input so that a click is not triggered twice
        event.stopPropagation();
        if (!this.disabled) {
            this.toggle();
            this.checkedChange.emit(this._checked);
            this.checkboxChange.emit(this._createChangeEvent(this._checked));
        }
    }

    /** @docs-private */
    private _createChangeEvent(checkedValue: boolean): NxCheckboxChangeEvent {
        return new NxCheckboxChangeEvent(checkedValue, this.value, this);
    }
}
