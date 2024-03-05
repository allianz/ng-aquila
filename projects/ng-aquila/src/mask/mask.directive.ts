import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { NX_INPUT_VALUE_ACCESSOR } from '@aposin/ng-aquila/input';
import { Subject } from 'rxjs';

import { NxMask } from './mask';
import { MASK_TYPE, MaskConversionTypes, NxMaskConfig } from './mask.model';

export const NX_MASK_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NxMaskDirective),
    multi: true,
};

export const NX_MASK_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NxMaskDirective),
    multi: true,
};

@Directive({
    selector: 'input[nxMask]',
    host: {
        '(blur)': '_touch()',
    },
    exportAs: 'nxMaskDirective',
    providers: [NX_MASK_VALUE_ACCESSOR, { provide: NX_INPUT_VALUE_ACCESSOR, useExisting: NxMaskDirective }, NX_MASK_VALIDATORS],
})
export class NxMaskDirective implements ControlValueAccessor, Validator, OnInit {
    /**
     * Emits the unmasked value before the value changes.
     */
    readonly cvaModelChange = new Subject<string>();

    /** Whether the mask validation should be deactivated. */
    @Input() set deactivateMask(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._deactivateMask) {
            this._deactivateMask = newValue;
            this.updateNxMask();
        }
    }
    get deactivateMask(): boolean {
        return this._deactivateMask!;
    }
    private _deactivateMask?: boolean = false;

    /** Sets the mask. */
    @Input('nxMask') set mask(value: string) {
        if (!value) {
            value = '';
        }
        if (value !== this._mask) {
            this._mask = value;
            this.updateNxMask();
            this._validatorOnChange();
        }
    }
    get mask(): string {
        return this._mask;
    }
    private _mask = '';

    /** Sets the case sensitivity of the mask. */
    @Input('nxConvertTo') set convertTo(value: MaskConversionTypes | null | undefined) {
        this._convertTo = value!; // TODO properly coerce input value
        this.updateNxMask();
    }
    get convertTo(): MaskConversionTypes {
        return this._convertTo!;
    }
    private _convertTo?: MaskConversionTypes;

    /**
     * Sets the keys that are recognized as separators.
     * Default separators: / ( ) . : - + , and space.
     */
    @Input() set separators(values: string[]) {
        this._separators = values;
        this._validatorOnChange();
        this.updateNxMask();
    }
    get separators(): string[] {
        return this._separators;
    }
    private _separators = ['/', '(', ')', '.', ':', '-', ' ', '+', ','];

    /** Whether the separators should be dropped in the control value accessor. */
    @Input() set dropSpecialCharacters(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._dropSpecialCharacters) {
            this._dropSpecialCharacters = newValue;
            this.updateNxMask();
        }
    }
    get dropSpecialCharacters(): boolean {
        return this._dropSpecialCharacters;
    }
    private _dropSpecialCharacters = false;

    /** Whether the mask validation should be applied on the input. Default: true. */
    @Input() set validateMask(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._validateMask) {
            this._validateMask = newValue;
            this._validatorOnChange();
        }
    }
    get validateMask(): boolean {
        return this._validateMask;
    }
    private _validateMask = true;

    /** @docs-private */
    get elementRefValue(): string {
        return this._elementRef.nativeElement.value;
    }

    nxMask?: NxMask;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        this.nxMask = new NxMask(this._elementRef.nativeElement, this.maskConfig);
    }

    private updateNxMask({ callOnChange = true, updateValue = true } = {}) {
        this.nxMask?.updateConfig(this.maskConfig, { callOnChange, updateValue });

        if (this._onChangeCallback && callOnChange && this.nxMask) {
            const valueToSend =
                this.dropSpecialCharacters || this.deactivateMask ? this.nxMask.getUnmaskedValue(this.nxMask.element.value) : this.nxMask.element.value;
            this._onChangeCallback(valueToSend);
        }
    }

    private get maskConfig(): NxMaskConfig {
        return {
            mask: this.mask,
            convertTo: this.convertTo,
            separators: this.separators,
            dropSpecialCharacters: this.dropSpecialCharacters,
            deactivateMask: this.deactivateMask,
            hooks: {
                onChange: [this.handleMaskChange.bind(this)],
                beforeInput: [this._beforeInputHook],
                afterInput: [this._afterInputHook],
                beforePaste: [this._beforePasteHook],
            },
        };
    }

    private handleMaskChange(value: string) {
        if (this.dropSpecialCharacters) {
            value = this.nxMask?.getUnmaskedValue(value) as string;
        }

        this.cvaModelChange.next(value);
        this._onChangeCallback?.(value);
        // this seems to be necessary in cases like our documentation examples where views are created dynamically
        // if we don't run change detection here Angular is not properly updating the dynamic view
        // to reproduce: open the documentation, open the mask example, paste a valid mask, like the DE example
        // then paste another valid mask on top of it. the view will still show an error that is related to the former IBAN
        // until you trigger a new CD cycle, like blurring the field.
        this._cdr.detectChanges();
    }

    ngOnDestroy() {
        this.nxMask?.onDestroy();
    }

    private _onChangeCallback?: (_: any) => void;
    private _onTouchedCallback = () => {};
    private _validatorOnChange = () => {};
    private _beforeInputHook = (event: Event) => {};
    private _afterInputHook = (event: Event) => {};
    private _beforePasteHook = (event: ClipboardEvent) => {};

    /**
     * Registers a function to be executed before the onInput handler.
     */
    registerBeforeInputHook(beforeInput: (event: Event) => void): void {
        this._beforeInputHook = beforeInput;
        this.updateNxMask();
    }
    /**
     * Registers a function to be executed after the onInput handler.
     * The registered hook receives a `KeyboardEvent` from the onInput event handler as a parameter.
     *
     * **Note:** If you register a `afterInputHook`, you may also register a `beforePasteHook`
     * to perform similar changes for pasting.
     */
    registerAfterInputHook(afterInput: (event: Event) => void): void {
        this._afterInputHook = afterInput;
        this.updateNxMask();
    }

    /**
     * Registers a function to be executed before the onPaste handler.
     * The registered hook receives a `ClipboardEvent` from the onPaste event handler as a parameter.
     */
    registerBeforePasteHook(beforePaste: (event: ClipboardEvent) => void): void {
        this._beforePasteHook = beforePaste;
        this.updateNxMask();
    }

    // /** Returns the unmasked value. */
    getUnmaskedValue(): string {
        const unmaskedValue = this.separators.reduce((unmasked, separator) => unmasked.split(separator).join(''), this._elementRef.nativeElement.value);

        return unmaskedValue;
    }

    /**
     * Sets the mask (for programmatical use). Use `withUpdate = false` to not call
     * the internal updateValue function if needed.
     *
     * No `_onChangeCallback()` will be called!
     */
    setMask(value: string, withUpdate = true) {
        if (!value) {
            value = '';
        }
        if (value !== this._mask) {
            this._mask = value;
            this.updateNxMask({ updateValue: withUpdate, callOnChange: false });
            this._validatorOnChange();
        }
    }

    private _isStringAllowed(value: string, maskedValue: MASK_TYPE) {
        if (
            (maskedValue === '0' && /^\d$/.test(value)) ||
            (maskedValue === 'A' && /^[\dA-Z]$/i.test(value)) ||
            (maskedValue === 'S' && /^[A-Z]$/i.test(value))
        ) {
            return true;
        }
        return false;
    }

    /** @docs-private */
    getMaskedString(inputValue: string, maskStartIndex = 0): string {
        return this.nxMask?.getMaskedString(inputValue, maskStartIndex) || '';
    }

    private isSeparator(value: string): boolean {
        return this._separators.includes(value);
    }

    // control value accessor
    writeValue(value: any): void {
        const newValue = value === undefined || value === null ? '' : value;

        // this has to be fired before we set the value next, that the iban mask
        // can be set correctly to the country first
        this.cvaModelChange.next(newValue);
        this.nxMask?.setValue(this.getMaskedString(newValue));
    }

    registerOnChange(onChange: any): void {
        this._onChangeCallback = onChange;
    }

    registerOnTouched(onTouched: any): void {
        this._onTouchedCallback = onTouched;
    }

    /** @docs-private */
    registerOnValidatorChange(fn: () => void): void {
        this._validatorOnChange = fn;
    }

    private isEmptyInputValue(value: any): boolean {
        return value == null || (typeof value === 'string' && value.length === 0);
    }

    _validateFn() {
        const value = this._elementRef.nativeElement.value;
        if (this.isEmptyInputValue(value)) {
            return null;
        }
        const inputLength = this._elementRef.nativeElement.value.length;
        const maskLength = this._mask.length;
        if (inputLength !== maskLength && !this.deactivateMask) {
            return { nxMaskLengthError: { length: maskLength, actual: inputLength } };
        }
        return null;
    }

    /** @docs-private */
    validate() {
        return this.validateMask ? this._validateFn() : null;
    }

    _touch() {
        this._onTouchedCallback();
    }
}
