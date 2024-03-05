import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';

import { CursorInfo, MASK_TYPE, NxMaskConfig } from './mask.model';

export const DEFAULT_SEPARATORS = ['/', '(', ')', '.', ':', '-', ' ', '+', ','];

export const DEFAULT_MASK_CONFIG: Omit<NxMaskConfig, 'mask'> = {
    convertTo: 'lower',
    dropSpecialCharacters: false,
    deactivateMask: false,
};

/**
 * Standalone mask implementation that is not tied to Angular.
 */
export class NxMask {
    private eventHandlers = new Map<keyof HTMLElementEventMap, (event: any) => void>();
    /**
     * _cursor is a helper for saving a position or a selectionRange (selectionStart + selectionEnd)
     * and then apply it later on (in onInput()).
     *
     * _cursor.position is used for saving a position that is then applied without any changes.
     *
     * If the position is saved, selectionStart and selectionEnd will be ignored in onInput().
     * _cursor.selectionStart and selectionEnd is used for saving the current cursor position,
     * and a new cursor position is then calculated with this data.
     */
    private _cursor!: CursorInfo | null;

    /** Helper variable for saving the current value of the input element to compare it then with a new value. */
    private _inputValue!: string;

    /** Helper variable for saving the masked string of a pasted value and then applying it in onInput(). */
    private _pastedData!: string | null;

    private _separators: string[] = [];

    private maskConfig!: NxMaskConfig;

    constructor(
        readonly element: HTMLInputElement,
        maskConfig: NxMaskConfig,
    ) {
        this._inputValue = element.value;
        this.updateConfig(maskConfig, { callOnChange: false });
        // register event handlers
        this.addListener('keydown', this.onKeydown.bind(this));
        this.addListener('input', this.onInput.bind(this));
        this.addListener('paste', this.onPaste.bind(this));
        this.init();
    }

    /** Changes the input value based on the current config. */
    init() {
        if (!this.maskConfig.deactivateMask) {
            this.updateValue(this.getMaskedString(this.element.value), false);
        }
    }

    updateConfig(maskConfig: NxMaskConfig, { callOnChange = true, updateValue = true } = {}) {
        this.maskConfig = { ...DEFAULT_MASK_CONFIG, ...maskConfig };
        this._separators = this.maskConfig.separators ?? DEFAULT_SEPARATORS;

        if (updateValue) {
            const newValue = this.maskConfig.deactivateMask ? this.element.value : this.getMaskedString(this.element.value);
            this.updateValue(newValue, callOnChange);
        }
    }

    private addListener<E extends keyof HTMLElementEventMap>(eventType: E, handler: (event: HTMLElementEventMap[E]) => void) {
        this.element.addEventListener(eventType, handler);
        this.eventHandlers.set(eventType, handler);
    }

    getUnmaskedValue(value: string): string {
        const unmaskedValue = this.maskConfig?.separators?.reduce((unmasked, separator) => unmasked.split(separator).join(''), value);

        return unmaskedValue ?? '';
    }

    private onInput(event: Event) {
        // during browser autofill
        this.maskConfig.hooks?.beforeInput?.forEach(callback => callback(event));

        // _inputValue is updated in updateValue(), so I need to pick it up here to compare it to a new value
        const oldVal = this._inputValue;
        const input: HTMLInputElement = event.target as HTMLInputElement;
        let newVal = this.getMaskedString(input.value);
        if (this.maskConfig.deactivateMask) {
            newVal = input.value;
            this.updateValue(newVal);
            return;
        }
        // if _pastedData was set in onPaste(), use this value
        if (this._pastedData) {
            this.updateValue(this._pastedData);
            input.setSelectionRange(this._cursor!.position!, this._cursor!.position!);
            this._pastedData = null;
            this._cursor = null;
            return;
        }

        // do nothing if mask is already filled up
        if (
            oldVal.length === this.maskConfig.mask.length &&
            newVal.length === this.maskConfig.mask.length &&
            oldVal !== newVal &&
            this._cursor &&
            this._cursor.selectionStart !== undefined &&
            this._cursor.selectionStart === this._cursor.selectionEnd
        ) {
            this.element.value = this.getMaskedString(oldVal);
            input.setSelectionRange(this._cursor.selectionStart, this._cursor.selectionEnd);
            this._cursor = null;
            return;
        }

        this.updateValue(newVal);

        // set new cursor position
        if (this._cursor?.position !== undefined) {
            input.setSelectionRange(this._cursor.position, this._cursor.position);
            this._cursor = null;
        } else if (this._cursor?.selectionStart !== undefined) {
            // only one character can be entered (except pasting, this is calculated in onPaste())
            if (oldVal === input.value) {
                // we always have to set the cursor position here even if nothing changed
                // because otherwise the cursor would jump to the end of the input.
                // if the cursor is placed in front of a separator and the user types a non-allowed character,
                // the cursor is supposed to jump over the separator.
                let currentPosition = this._cursor.selectionStart;
                while (this.isSeparator(this.maskConfig.mask[currentPosition])) {
                    currentPosition++;
                }
                input.setSelectionRange(currentPosition, currentPosition);
                this._cursor = null;
            } else {
                const newPosition = this._cursor.selectionStart + this._calculateCursorShift(this._cursor.selectionStart);
                input.setSelectionRange(newPosition, newPosition);
                this._cursor = null;
            }
        }

        this.maskConfig.hooks?.afterInput?.forEach(callback => callback(event));
    }

    private onPaste(event: ClipboardEvent) {
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');

        // saving these three values as if something is changed in the _beforePasteHook()
        // which causes the input value to be updated, this values will get lost.
        const selectionStart: number = input.selectionStart!;
        const selectionEnd = input.selectionEnd;
        const oldValue = input.value;
        this.maskConfig.hooks?.beforePaste?.forEach(callback => callback(event));

        const maskedString = this.getMaskedString(pastedData, selectionStart);

        // if mask is already filled up (and no characters are selected with the cursor), do nothing
        if (input.value.length === this.maskConfig.mask.length && maskedString.length > 0 && selectionStart === selectionEnd) {
            input.setSelectionRange(selectionStart, selectionEnd);
            this._cursor = null; // was set in onKeydown(), but will not be used in this case; so reset it
            event.preventDefault();
            return;
        }

        // if length of newValue is >= mask: allow only to enter characters from a pasted value until mask is filled up
        // example: 12:|34: ("|" cursor position, mask: 00:00:00) => when pasting '567', only '56' fits in until input is filled up => 12:56:|34
        // get the pasted unmasked value from the pasted string (to cut all the invalid characters and separators)
        const pastedUnmaskedValue = this.maskConfig.separators!.reduce((unmasked, separator) => unmasked.split(separator).join(''), maskedString);

        let newValue: string = this.getMaskedString(
            oldValue.substring(0, selectionStart) + pastedUnmaskedValue + oldValue.substring(selectionEnd!, oldValue.length),
        );

        if (newValue.length >= this.maskConfig.mask.length) {
            let newPosition = selectionStart;

            let i = 1;
            do {
                newValue = this.getMaskedString(
                    oldValue.substring(0, selectionStart) + pastedUnmaskedValue.substring(0, i) + oldValue.substring(selectionEnd!, oldValue.length),
                );
                newPosition += this._calculateCursorShift(newPosition);

                i++;
            } while (newValue.length < this.maskConfig.mask.length);

            // save value for using it in onInput()
            this._pastedData = newValue;
            this._cursor = {
                position: newPosition,
            };
            return;
        }

        // if pasting is fine: save the cursor position for using them in onInput()
        this._cursor = {
            position: selectionStart + maskedString.length,
        };
    }

    /**
     * this._cursor can be set to a new value in this function;
     * in onInput() it is then used to set the cursor position.
     */
    private onKeydown(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        const input: HTMLInputElement = event.target as HTMLInputElement;
        if (keyCode === BACKSPACE || keyCode === DELETE) {
            this.handleDelete(event);
        } else {
            this._cursor = { selectionStart: input.selectionStart!, selectionEnd: input.selectionEnd! };
        }
    }

    private handleDelete(event: KeyboardEvent) {
        const keyCode = event.keyCode;
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const currentValue = this.element.value;

        // if backspace pressed, cursor has to move one character to start
        const backspaceShift = keyCode === BACKSPACE ? 1 : 0;
        const lastCharacter = currentValue.substring(input.selectionStart! - backspaceShift, input.selectionEnd! - backspaceShift + 1);
        const selectionAtLastCharacter = input.selectionStart === currentValue.length - 1 + backspaceShift;
        if (input.selectionStart !== input.selectionEnd) {
            let newPosition: number = input.selectionStart!;
            // jump behind separators, but do not shift after the next character (=> don't use _calculateCursorShift())
            while (this.isSeparator(this.maskConfig.mask[newPosition])) {
                newPosition++;
            }
            this._cursor = { position: newPosition };
        } else if (selectionAtLastCharacter) {
            // if last character is deleted: only delete last character, do not trigger input event again
            // (here the separator would be added again)
            this.updateValue(currentValue.substring(0, currentValue.length - 1));
            event.preventDefault();
        } else if (this.isSeparator(lastCharacter)) {
            // do not delete a separator, only set cursor position
            input.setSelectionRange(input.selectionStart! - backspaceShift, input.selectionEnd! - backspaceShift);
            event.preventDefault();
        } else {
            // for any other character: decrease cursor position by one (backspaceShift).
            // the input is modified and will be validated in onInput().
            this._cursor = { position: input.selectionStart! - backspaceShift };
        }
    }

    /** When you want to programmatically update the value. */
    setValue(value: string) {
        this.updateValue(value, false);
    }

    private updateValue(value: string, callOnChange = true) {
        let newValue = value === undefined || value === null ? '' : value.toString();
        newValue = this.maskConfig.deactivateMask ? this.getUnmaskedValue(value) : value;
        if (!this.maskConfig.deactivateMask) {
            if (this.maskConfig.convertTo === 'upper') {
                newValue = newValue.toUpperCase();
            } else if (this.maskConfig.convertTo === 'lower') {
                newValue = newValue.toLowerCase();
            }
        }

        if (this.element.value !== newValue) {
            this.element.value = newValue;
        }

        // _inputValue is needed for calculating the cursor shift in onInput()
        this._inputValue = newValue;
        if (callOnChange) {
            this.maskConfig.hooks?.onChange?.forEach(callback => callback(newValue));
        }
    }

    private isSeparator(value: string): boolean {
        return this._separators.includes(value);
    }

    /**
     * Returns the cursor position after a letter is entered at `selectionStart` position in the mask.
     * There are two cases to consider ('|' => cursor position where the character is entered, mask: 00:00:00):
     * - before the separators there is space for entering the letter: '12:3|4:5' => '12:30:|45'
     * - the letter has to be shifted and is entered after the separators: '12:34|:5' => '12:34:0|5'.
     */
    private _calculateCursorShift(position: number): number {
        let shift = 0;
        // tracks if the entered letter was already placed in the current mask
        // and therefor was considered in the cursor calculation.
        let characterWasEntered = false;

        if (!this.isSeparator(this.maskConfig.mask[position + shift])) {
            shift++;
            characterWasEntered = true;
        }

        while (this.isSeparator(this.maskConfig.mask[position + shift])) {
            shift++;
        }

        if (!characterWasEntered) {
            shift++;
        }

        return shift;
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

    getMaskedString(inputValue: string, maskStartIndex = 0): string {
        // inputValue could actually be a number, so we need to convert it
        const transformedValue = inputValue.toString();
        let formattedValue = '';
        let maskIndex = maskStartIndex;
        let inputIndex = 0;

        // insert if next in mask is separator
        while (this.isSeparator(this.maskConfig.mask[maskIndex])) {
            formattedValue += this.maskConfig.mask[maskIndex];
            maskIndex++;
        }

        while (inputIndex < transformedValue.length) {
            // test if letters are valid
            if (this._isStringAllowed(transformedValue[inputIndex], this.maskConfig.mask[maskIndex] as MASK_TYPE)) {
                formattedValue += transformedValue[inputIndex];
                inputIndex++;
                maskIndex++;
            } else {
                inputIndex++;
            }

            // insert if next in mask is separator
            while (this.isSeparator(this.maskConfig.mask[maskIndex])) {
                formattedValue += this.maskConfig.mask[maskIndex];
                maskIndex++;
            }
        }

        return formattedValue;
    }

    onDestroy() {
        this.eventHandlers.forEach((handler, eventType) => {
            this.element.removeEventListener(eventType, handler);
        });
    }
}
