import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { Directive, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { NX_INPUT_VALUE_ACCESSOR } from '@aposin/ng-aquila/input';
import { Subject } from 'rxjs';

type MASK_TYPE = '0' | 'A' | 'S';

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

/** Options for input case sensitivity. */
export type MaskConversionTypes = 'lower' | 'upper';

/** Interface for saving the cursor information. */
interface CursorInfo {
    selectionStart?: number;
    selectionEnd?: number;
    position?: number;
}

@Directive({
    selector: 'input[nxMask]',
    host: {
        '(input)': '_onInputChange($event)',
        '(keydown)': '_onKeydown($event)',
        '(paste)': '_onPaste($event)',
        '(blur)': '_touch()',
    },
    exportAs: 'nxMaskDirective',
    providers: [NX_MASK_VALUE_ACCESSOR, { provide: NX_INPUT_VALUE_ACCESSOR, useExisting: NxMaskDirective }, NX_MASK_VALIDATORS],
})
export class NxMaskDirective implements ControlValueAccessor, Validator {
    private _mask!: string;
    private _separators = ['/', '(', ')', '.', ':', '-', ' ', '+', ','];
    private _dropSpecialCharacters = false;
    private _validateMask = true;
    private _convertTo?: MaskConversionTypes;
    private _deactivateMask?: boolean = false;
    /**
     * _cursor is a helper for saving a position or a selectionRange (selectionStart + selectionEnd)
     * and then apply it later on (in _onInputChange()).
     *
     * _cursor.position is used for saving a position that is then applied without any changes.
     * if the position is saved, selectionStart and selectionEnd will be ignored in _onInputChange().
     * _cursor.selectionStart and selectionEnd is used for saving the current cursor position,
     * and a new cursor position is then calculated with this data.
     */
    private _cursor!: CursorInfo | null;

    /** helper variable for saving the current value of the input element to compare it then with a new value. */
    private _inputValue!: string;

    /** helper variable for saving the masked string of a pasted value and then applying it in _onInputChange(). */
    private _pastedData!: string | null;

    /**
     * Emits the unmasked value before the value changes.
     */
    readonly cvaModelChange = new Subject<string>();

    private _onChangeCallback = (_: any) => {};
    private _onTouchedCallback = () => {};
    private _validatorOnChange = () => {};

    private _callOnChangeCallback() {
        if (!this.dropSpecialCharacters) {
            this._onChangeCallback(this._elementRef.nativeElement.value);
        } else {
            this._onChangeCallback(this.getUnmaskedValue());
        }
    }

    private _afterInputHook = (event: KeyboardEvent) => {};
    private _beforePasteHook = (event: ClipboardEvent) => {};

    /**
     * Registers a function to be executed after the onInput handler.
     * The registered hook receives a `KeyboardEvent` from the onInput event handler as a parameter.
     *
     * **Note:** If you register a `afterInputHook`, you may also register a `beforePasteHook`
     * to perform similar changes for pasting.
     */
    registerAfterInputHook(afterInput: (event: KeyboardEvent) => void): void {
        this._afterInputHook = afterInput;
    }

    /**
     * Registers a function to be executed before the onPaste handler.
     * The registered hook receives a `ClipboardEvent` from the onPaste event handler as a parameter.
     */
    registerBeforePasteHook(beforePaste: (event: ClipboardEvent) => void): void {
        this._beforePasteHook = beforePaste;
    }

    /** Whether the mask validation should be deactivated. */
    @Input()
    set deactivateMask(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._deactivateMask) {
            this._deactivateMask = newValue;
            if (this._deactivateMask) {
                this.updateValue(this.getUnmaskedValue());
            } else {
                this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
            }
            this._callOnChangeCallback();
        }
    }
    get deactivateMask(): boolean {
        return this._deactivateMask as boolean;
    }

    /** Sets the mask. */
    @Input('nxMask')
    set mask(value: string) {
        if (!value) {
            value = '';
        }
        if (value !== this._mask) {
            this._mask = value;
            this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
            this._callOnChangeCallback();
            this._validatorOnChange();
        }
    }
    get mask(): string {
        return this._mask;
    }

    /**
     * Sets the mask (for programmatical use).
     *
     * No `_onChangeCallback()` will be called!
     */
    setMask(value: string) {
        if (!value) {
            value = '';
        }
        if (value !== this._mask) {
            this._mask = value;
            this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
            this._validatorOnChange();
        }
    }

    /** Sets the case sensitivity of the mask. */
    @Input('nxConvertTo')
    set convertTo(value: MaskConversionTypes | null | undefined) {
        this._convertTo = value!; // TODO properly coerce input value
        this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
        this._callOnChangeCallback();
    }
    get convertTo(): MaskConversionTypes {
        return this._convertTo as MaskConversionTypes;
    }

    /**
     * Sets the keys that are recognized as separators.
     * Default separators: / ( ) . : - + , and space.
     */
    @Input()
    set separators(values: string[]) {
        this._separators = values;
        this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
        this._validatorOnChange();
        this._callOnChangeCallback();
    }
    get separators(): string[] {
        return this._separators;
    }

    /** Whether the separators should be dropped in the control value accessor. */
    @Input()
    set dropSpecialCharacters(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._dropSpecialCharacters) {
            this._dropSpecialCharacters = newValue;
            this.updateValue(this.getMaskedString(this._elementRef.nativeElement.value));
            this._callOnChangeCallback();
        }
    }
    get dropSpecialCharacters(): boolean {
        return this._dropSpecialCharacters;
    }

    /** Whether the mask validation should be applied on the input. Default: true. */
    @Input()
    set validateMask(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._validateMask) {
            this._validateMask = newValue;
            this._validatorOnChange();
        }
    }
    get validateMask(): boolean {
        return this._validateMask;
    }

    constructor(private _elementRef: ElementRef) {}

    /** @docs-private */
    get elementRefValue(): string {
        return this._elementRef.nativeElement.value;
    }

    /** Returns the unmasked value. */
    getUnmaskedValue(): string {
        const unmaskedValue = this.separators.reduce(function (unmasked, separator) {
            return unmasked.split(separator).join('');
        }, this._elementRef.nativeElement.value);

        return unmaskedValue;
    }

    /**
     * this._cursor can be set to a new value in this function;
     * in _onInputChange() it is then used to set the cursor position.
     */
    _onKeydown(event: KeyboardEvent) {
        const keyCode = event.keyCode;

        const input: HTMLInputElement = event.target as HTMLInputElement;
        const currentValue = this._elementRef.nativeElement.value;

        if (keyCode === BACKSPACE || keyCode === DELETE) {
            // if backspace pressed, cursor has to move one character to start
            const backspaceShift = keyCode === BACKSPACE ? 1 : 0;
            const lastCharacter = currentValue.substring(input.selectionStart! - backspaceShift, input.selectionEnd! - backspaceShift + 1);
            const selectionAtLastCharacter = input.selectionStart === currentValue.length - 1 + backspaceShift;

            if (input.selectionStart !== input.selectionEnd) {
                let newPosition: number = input.selectionStart as number;
                // jump behind separators, but do not shift after the next character (=> don't use _calculateCursorShift())
                while (this.isSeparator(this.mask[newPosition])) {
                    newPosition++;
                }
                this._cursor = { position: newPosition };
            } else if (selectionAtLastCharacter) {
                // if last character is deleted: only delete last character, do not trigger input event again
                // (here the separator would be added again)
                this.updateValue(currentValue.substring(0, currentValue.length - 1));
                this._callOnChangeCallback();
                event.preventDefault();
            } else if (this.isSeparator(lastCharacter)) {
                // do not delete a separator, only set cursor position
                input.setSelectionRange(input.selectionStart! - backspaceShift, input.selectionEnd! - backspaceShift);
                event.preventDefault();
            } else {
                // for any other character: decrease cursor position by one (backspaceShift).
                // the input is modified and will be validated in _onInputChange().
                this._cursor = { position: input.selectionStart! - backspaceShift };
            }
        } else {
            this._cursor = { selectionStart: input.selectionStart as number, selectionEnd: input.selectionEnd as number };
        }
    }

    /**
     * Returns the cursor position after a letter is entered at `selectionStart` position in the mask.
     * There are two cases to consider ('|' => cursor position where the character is entered, mask: 00:00:00):
     * - before the separators there is space for entering the letter: '12:3|4:5' => '12:30:|45'
     * - the letter has to be shifted and is entered after the separators: '12:34|:5' => '12:34:0|5'
     */
    private _calculateCursorShift(position: number): number {
        let shift = 0;
        // tracks if the entered letter was already placed in the current mask
        // and therefor was considered in the cursor calculation.
        let characterWasEntered = false;

        if (!this.isSeparator(this.mask[position + shift])) {
            shift++;
            characterWasEntered = true;
        }

        while (this.isSeparator(this.mask[position + shift])) {
            shift++;
        }

        if (!characterWasEntered) {
            shift++;
        }

        return shift;
    }

    private _isStringAllowed(value: string, maskedValue: MASK_TYPE) {
        if (
            (maskedValue === '0' && /^[0-9]{1}$/.test(value)) ||
            (maskedValue === 'A' && /^[a-zA-Z0-9]{1}$/.test(value)) ||
            (maskedValue === 'S' && /^[a-zA-Z]{1}$/.test(value))
        ) {
            return true;
        }
        return false;
    }

    /**
     * Handles the onInput event.
     * `_beforeInputHook()` is called before the actual execution.
     *
     */
    _onInputChange(event: KeyboardEvent) {
        // _inputValue is updated in updateValue(), so I need to pick it up here to compare it to a new value
        const oldVal = this._inputValue;
        const input: HTMLInputElement = event.target as HTMLInputElement;
        let newVal = this.getMaskedString(input.value);
        if (this._deactivateMask) {
            newVal = input.value;
            this.updateValue(newVal);
            this._callOnChangeCallback();
            return;
        }
        // if _pastedData was set in _onPaste(), use this value
        if (this._pastedData) {
            this.updateValue(this._pastedData);
            input.setSelectionRange(this._cursor!.position as number, this._cursor!.position as number);
            this._pastedData = null;
            this._cursor = null;
            this._callOnChangeCallback();
            return;
        }

        // do nothing if mask is already filled up
        if (
            oldVal.length === this._mask.length &&
            newVal.length === this._mask.length &&
            oldVal !== newVal &&
            this._cursor &&
            this._cursor.selectionStart !== undefined &&
            this._cursor.selectionStart === this._cursor.selectionEnd
        ) {
            this._elementRef.nativeElement.value = this.getMaskedString(oldVal);
            input.setSelectionRange(this._cursor.selectionStart, this._cursor.selectionEnd);
            this._cursor = null;
            return;
        }

        this.updateValue(newVal);

        // set new cursor position
        if (this._cursor && this._cursor.position !== undefined) {
            input.setSelectionRange(this._cursor.position, this._cursor.position);
            this._cursor = null;
        } else if (this._cursor && this._cursor.selectionStart !== undefined) {
            // only one character can be entered (except pasting, this is calculated in _onPaste())
            if (oldVal !== input.value) {
                const newPosition = this._cursor.selectionStart + this._calculateCursorShift(this._cursor.selectionStart);
                input.setSelectionRange(newPosition, newPosition);
                this._cursor = null;
            } else {
                // we always have to set the cursor position here even if nothing changed
                // because otherwise the cursor would jump to the end of the input.
                // if the cursor is placed in front of a separator and the user types a non-allowed character,
                // the cursor is supposed to jump over the separator.
                let currentPosition = this._cursor.selectionStart;
                while (this.isSeparator(this.mask[currentPosition])) {
                    currentPosition++;
                }
                input.setSelectionRange(currentPosition, currentPosition);
                this._cursor = null;
            }
        }

        this._afterInputHook(event);
        this._callOnChangeCallback();
    }

    /**
     * this._cursor and this._pastedData can be set to a new value in this function;
     * _cursor is used to set the cursor position after checking the masked input in _onInputChange().
     * _pastedData carries the valid part of the pasted value to _inInputChange();
     *
     *`_beforePasteHook()` is called before the actual execution.
     */
    _onPaste(event: ClipboardEvent) {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');

        // saving these three values as if something is changed in the _beforePasteHook()
        // which causes the input value to be updated, this values will get lost.
        const selectionStart: number = input.selectionStart as number;
        const selectionEnd = input.selectionEnd;
        const oldValue = input.value;

        this._beforePasteHook(event);

        const maskedString = this.getMaskedString(pastedData, selectionStart as number);

        // if mask is already filled up (and no characters are selected with the cursor), do nothing
        if (input.value.length === this._mask.length && maskedString.length > 0 && selectionStart === selectionEnd) {
            input.setSelectionRange(selectionStart, selectionEnd);
            this._cursor = null; // was set in _onKeydown(), but will not be used in this case; so reset it
            event.preventDefault();
            return;
        }

        // if length of newValue is >= mask: allow only to enter characters from a pasted value until mask is filled up
        // example: 12:|34: ("|" cursor position, mask: 00:00:00) => when pasting '567', only '56' fits in until input is filled up => 12:56:|34
        // get the pasted unmasked value from the pasted string (to cut all the invalid characters and separators)
        const pastedUnmaskedValue = this.separators.reduce((unmasked, separator) => unmasked.split(separator).join(''), maskedString);

        let newValue: string = this.getMaskedString(
            oldValue.substring(0, selectionStart as number) + pastedUnmaskedValue + oldValue.substring(selectionEnd as number, oldValue.length),
        );

        if (newValue.length >= this._mask.length) {
            let newPosition = selectionStart as number;

            let i = 1;
            do {
                newValue = this.getMaskedString(
                    oldValue.substring(0, selectionStart as number) +
                        pastedUnmaskedValue.substring(0, i) +
                        oldValue.substring(selectionEnd as number, oldValue.length),
                );
                newPosition += this._calculateCursorShift(newPosition as number);

                i++;
            } while (newValue.length < this._mask.length);

            // save value for using it in _onInputChange()
            this._pastedData = newValue;
            this._cursor = {
                position: newPosition as number,
            };
            return;
        }

        // if pasting is fine: save the cursor position for using them in _onInputChange()
        this._cursor = {
            position: (selectionStart as number) + maskedString.length,
        };
    }

    private updateValue(value: string) {
        if (!this._deactivateMask) {
            // Write UpperCase
            if (this._convertTo === 'upper') {
                value = value.toUpperCase();
            } else if (this._convertTo === 'lower') {
                value = value.toLowerCase();
            }
        }
        this._elementRef.nativeElement.value = value;

        // _inputValue is needed for calculating the cursor shift in onInput()
        this._inputValue = value;
    }

    /** @docs-private */
    getMaskedString(inputValue: string, maskStartIndex = 0): string {
        let formattedValue = '';
        let maskIndex = maskStartIndex;
        let inputIndex = 0;

        // insert if next in mask is separator
        while (this.isSeparator(this.mask[maskIndex])) {
            formattedValue += this.mask[maskIndex];
            maskIndex++;
        }

        while (inputIndex < inputValue.length) {
            // test if letters are valid
            if (this._isStringAllowed(inputValue[inputIndex], this.mask[maskIndex] as MASK_TYPE)) {
                formattedValue += inputValue[inputIndex];
                inputIndex++;
                maskIndex++;
            } else {
                inputIndex++;
            }

            // insert if next in mask is separator
            while (this.isSeparator(this.mask[maskIndex])) {
                formattedValue += this.mask[maskIndex];
                maskIndex++;
            }
        }

        return formattedValue;
    }

    private isSeparator(value: string): boolean {
        return this._separators.indexOf(value) !== -1;
    }

    // control value accessor
    writeValue(value: any): void {
        if (!value) {
            value = '';
        }

        this.cvaModelChange.next(value);
        if (this.deactivateMask) {
            this.updateValue(this.getUnmaskedValue());
        } else {
            this.updateValue(this.getMaskedString(value));
        }
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

    _validateFn() {
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
