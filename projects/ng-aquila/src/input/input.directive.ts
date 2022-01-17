import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Directive, DoCheck, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';

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
        '(blur)': '_focusChanged(false)',
        '(focus)': '_focusChanged(true)',
        '(input)': '_onInput()',
    },
    providers: [{ provide: NxFormfieldControl, useExisting: NxInputDirective }],
})
export class NxInputDirective implements OnInit, DoCheck, OnChanges, OnDestroy, NxFormfieldControl<any> {
    protected _type = 'text';

    protected _id!: string;
    protected _uid = `nx-input-${nextUniqueId++}`;
    protected _previousNativeValue: any;
    protected _disabled = false;
    protected _required = false;
    private _readonly: boolean = false;
    private _inputValueAccessor: { value: any };
    public _ariaDescribedby!: string;
    private _placeholder!: string;

    @Input('nxAriaLabel') _ariaLabel!: string;

    /** @docs-private */
    errorState: boolean = false;

    /**
     * Name of this control that is used inside the formfield component
     * @docs-private
     */
    controlType: string = 'nx-input';

    /**
     * @docs-private
     */
    autofilled = false;

    /** @docs-private */
    stateChanges = new Subject<void>();

    /** @docs-private */
    focused = false;

    /** The id of the input. */
    @Input()
    get id() {
        return this._id;
    }
    set id(value: string) {
        this._id = value || this._uid;
    }

    /** The input element's value. */
    @Input()
    get value(): any {
        return this._inputValueAccessor.value;
    }
    set value(value: any) {
        if (value !== this.value) {
            this._inputValueAccessor.value = value;
        }
    }

    /** Whether the element is readonly. */
    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    /** Whether the input is disabled. */
    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }

    /** Whether the element is required. */
    @Input()
    get required() {
        return this._required;
    }
    set required(value: any) {
        this._required = coerceBooleanProperty(value);
    }

    /** Sets the type of the input element (e.g. password, text etc). */
    @Input()
    get type() {
        return this._type;
    }
    set type(value: string) {
        this._type = value || 'text';
        this._validateType();

        // When using Angular inputs, developers are no longer able to set the properties on the native
        // input element. To ensure that bindings for `type` work, we need to sync the setter
        // with the native property. Textarea elements don't support the type property or attribute.
        if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
            this._elementRef.nativeElement.type = this._type;
        }
    }

    /**
     * Sets the text for the input placeholder
     */
    @Input()
    get placeholder() {
        return this.empty ? this._placeholder : '';
    }
    set placeholder(value: string) {
        this._placeholder = value;
    }

    constructor(
        protected _elementRef: ElementRef,
        protected _platform: Platform,
        /** @docs-private */
        @Optional() @Self() public ngControl: NgControl,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        private _errorStateMatcher: ErrorStateMatcher,
        @Optional() @Self() @Inject(NX_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
        private _autofillMonitor: AutofillMonitor,
    ) {
        this.id = this.id;

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

    ngOnInit() {
        if (this._platform.isBrowser) {
            this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(event => {
                this.autofilled = event.isAutofilled;
                this.stateChanges.next();
            });
        }
    }

    /** @docs-private */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    _onInput() {
        // force to to run change detection so we know about changes in the native form input
    }

    _focusChanged(isFocused: boolean) {
        if (isFocused !== this.focused && !this.readonly) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }

    ngOnChanges() {
        this.stateChanges.next();
    }

    ngOnDestroy() {
        this.stateChanges.complete();

        if (this._platform.isBrowser) {
            this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
        }
    }

    ngDoCheck() {
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
        return validity && validity.badInput;
    }

    /** @docs-private */
    get empty(): boolean {
        return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
    }

    protected _isNeverEmpty() {
        return NEVER_EMPTY.indexOf(this._type) > -1;
    }

    protected _isTextarea() {
        const nativeElement = this._elementRef.nativeElement;
        return nativeElement.nodeName ? nativeElement.nodeName.toLowerCase() === 'textarea' : false;
    }

    protected _validateType() {
        if (INVALID_TYPES.indexOf(this._type) > -1) {
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
