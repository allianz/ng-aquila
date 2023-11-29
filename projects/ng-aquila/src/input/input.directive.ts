import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, DoCheck, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm, Validators } from '@angular/forms';
import { NxFormfieldControl, NxFormfieldUpdateEventType } from '@aposin/ng-aquila/formfield';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const NX_INPUT_VALUE_ACCESSOR = new InjectionToken<{ value: any }>('NX_INPUT_VALUE_ACCESSOR');

const INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'];

const NEVER_EMPTY = ['date', 'datetime', 'datetime-local', 'month', 'time', 'week'].filter(t => getSupportedInputTypes().has(t));

let nextUniqueId = 0;

@Directive({
    selector: 'input[nxInput], textarea[nxInput], select[nxInput]',
    exportAs: 'nxInput',
    host: {
        '[class.c-input]': 'true',
        '[class.nx-input]': 'true',
        '[attr.id]': 'id',
        '[class.is-filled]': 'empty === false',
        '[class.is-disabled]': 'disabled',
        '[class.has-error]': 'errorState',
        '[class.is-focused]': 'focused',
        '[attr.disabled]': 'disabled || null',
        '[attr.readonly]': 'readonly || null',
        '[attr.required]': 'required || null',
        '[attr.aria-label]': '_ariaLabel || null',
        '[attr.aria-describedby]': '_ariaDescribedby || null',
        '[attr.aria-invalid]': 'errorState',
        '[attr.aria-required]': 'required.toString()',
        '[attr.placeholder]': 'placeholder || null',
        '(focusout)': '_focusChanged(false)',
        '(focus)': '_focusChanged(true)',
    },
    providers: [
        { provide: NxFormfieldControl, useExisting: NxInputDirective },
        { provide: NxAbstractControl, useExisting: NxInputDirective },
    ],
})
export class NxInputDirective implements OnInit, DoCheck, OnChanges, OnDestroy, NxFormfieldControl<any>, NxAbstractControl {
    protected _uid = `nx-input-${nextUniqueId++}`;
    protected _previousNativeValue: any;
    private _inputValueAccessor: { value: any };
    _ariaDescribedby!: string;

    @Input('nxAriaLabel') _ariaLabel!: string;

    /** @docs-private */
    errorState = false;

    /**
     * Name of this control that is used inside the formfield component
     * @docs-private
     */
    controlType = 'nx-input';

    /** @docs-private */
    autofilled = false;

    /** @docs-private */
    readonly stateChanges = new Subject<void>();

    /** @docs-private */
    focused = false;

    /** The id of the input. */
    @Input() set id(value: string) {
        this._id = value || this._uid;
    }
    get id() {
        return this._id;
    }
    protected _id!: string;

    /** The input element's value. */
    @Input() set value(value: any) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
        }
    }
    get value(): any {
        return this._inputValueAccessor.value;
    }

    /** Whether the element is readonly. */
    @Input() set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get readonly(): boolean {
        return this._readonly;
    }
    private _readonly = false;

    /** set readonly state */
    setReadonly(value: boolean) {
        this.readonly = value;
    }

    /** Whether the input is disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    get disabled(): boolean {
        if (this.ngControl?.disabled != null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    protected _disabled = false;

    /** Whether the element is required. */
    @Input() set required(value: any) {
        this._required = coerceBooleanProperty(value);
    }
    get required() {
        return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
    }
    protected _required: boolean | undefined;

    /** Sets the type of the input element (e.g. password, text etc). */
    @Input() set type(value: string) {
        this._type = value || 'text';
        this._validateType();

        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }
    get type() {
        return this._type;
    }
    protected _type = 'text';

    /**
     * Sets the text for the input placeholder.
     */
    @Input() set placeholder(value: string) {
        this._placeholder = value;
    }
    get placeholder() {
        return this.empty ? this._placeholder : '';
    }
    private _placeholder!: string;

    /**
     *
     * Sets the event that triggers change detection in the input.
     */
    @Input() set updateOn(value: NxFormfieldUpdateEventType) {
        if (this._updateOn !== value) {
            this._updateOn = value;
        }
    }
    get updateOn(): NxFormfieldUpdateEventType {
        return this._updateOn;
    }
    private _updateOn: NxFormfieldUpdateEventType = 'change';

    private readonly _destroyed = new Subject<void>();

    constructor(
        protected readonly _elementRef: ElementRef,
        protected readonly _platform: Platform,
        /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() @Inject(NX_INPUT_VALUE_ACCESSOR) inputValueAccessor: { value: any } | null,
        private readonly _autofillMonitor: AutofillMonitor,
    ) {
        const id = this.id;
        this.id = id; // invoke setter

        // This will enable other directives to plugin itself as the value accessor
        // by using the NX_INPUT_VALUE_ACCESSOR Token. Default is the given input field.
        // TODO eliminate injected dateValueAccessor once we have intra-package support in ng-packagr
        // See the datefield for details.
        this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
        this._previousNativeValue = this.value;

        if (this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea') {
            this.controlType = 'textarea';
        }
    }

    ngOnInit(): void {
        if (this._platform.isBrowser) {
            this._autofillMonitor
                .monitor(this._elementRef.nativeElement)
                .pipe(takeUntil(this._destroyed))
                .subscribe(event => {
                    this.autofilled = event.isAutofilled;
                    this.stateChanges.next();
                });
        }
    }

    /** @docs-private */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    _focusChanged(isFocused: boolean) {
        if (isFocused !== this.focused && !this.readonly) {
            this.focused = isFocused;
            this.stateChanges.next();

            if (this._updateOn === 'blur') {
                this._detectInputChanges();
            }
        }
    }

    _detectInputChanges() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }

        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    }

    ngOnChanges(): void {
        this.stateChanges.next();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this.stateChanges.complete();

        if (this._platform.isBrowser) {
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    }

    ngDoCheck(): void {
        if (this._updateOn === 'change') {
            this._detectInputChanges();
        }
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

    /**
     * Set a list of ids that is currently describing this input
     * (if you have hints and errors for example).
     */
    setDescribedByIds(ids: string[]) {
        this._ariaDescribedby = ids.join(' ');
    }

    // allow to set a arial label value in case there
    // is not possibility to display a proper label
    /**
     * Method to set the aria label.
     * This is required if you use the input outside of a formfield
     * where you don't have a label connected.
     */
    setAriaLabel(value: string) {
        this._ariaLabel = value;
    }

    protected _isBadInput() {
        // The `validity` property won't be present on platform-server.
        const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
        return validity?.badInput;
    }

    /** @docs-private */
    get empty(): boolean {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
    }

    protected _isNeverEmpty() {
        return NEVER_EMPTY.includes(this._type);
    }

    protected _isTextarea() {
        const nativeElement = this._elementRef.nativeElement;
        return nativeElement.nodeName ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    }

    protected _validateType() {
        if (INVALID_TYPES.includes(this._type)) {
            throw new Error(`Input of type '${this._type}' is not supported`);
        }
    }

    /** @docs-private */
    get shouldLabelFloat(): boolean {
        return !!(this.focused || !this.empty || (this.placeholder && this.placeholder.length > 0));
    }

    protected _dirtyCheckNativeValue() {
        const newValue = this.value;

        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    }
}
