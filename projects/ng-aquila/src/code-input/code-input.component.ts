import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, ElementRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';

import { NxCodeInputIntl } from './code-input-intl';

const DEFAULT_INPUT_LENGTH = 6;
const TAG_NAME_INPUT = 'INPUT';
const AUTO_UPPERCASE = 'upper';
const AUTO_LOWERCASE = 'lower';
const INPUT_FIELD_GAP = 'nx-code-input--field-with-gap';
export type NxConversionTypes = 'lower' | 'upper';

@Component({
    selector: 'nx-code-input',
    templateUrl: 'code-input.component.html',
    styleUrls: ['code-input.scss'],
    host: {
        '[class.nx-code-input]': 'true',
        '[class.has-error]': 'errorState',
        '[class.is-negative]': 'negative',
        '[class.is-disabled]': 'disabled',
        '[attr.tabindex]': '-1',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxCodeInputComponent implements ControlValueAccessor, DoCheck {
    /** Whether the current input of the component has an error. */
    errorState = false;

    /** The length of the code input. Default: 6. */
    @Input('length') set codeLength(value: number) {
        this._codeLength = value;
        this.setInputLength();
    }
    get codeLength() {
        return this._codeLength;
    }
    private _codeLength: number = DEFAULT_INPUT_LENGTH;

    /** The type of HTML input */
    @Input() set type(value: string) {
        this._type = value;
    }
    get type() {
        return this._type;
    }
    private _type = 'text';

    /** Sets the tabindex of the contained input elements. */
    @Input() set tabindex(value: number) {
        this._tabindex = value;
    }
    get tabindex(): number {
        return this._tabindex;
    }
    private _tabindex = 0;

    /** Whether the form should auto capitalize or lowercase (optional). */
    @Input() set convertTo(value: NxConversionTypes) {
        this._convertTo = value;
    }
    get convertTo() {
        return this._convertTo!;
    }
    private _convertTo?: NxConversionTypes;

    /** The user input in array form */
    _keyCode: string[] = new Array(DEFAULT_INPUT_LENGTH).fill('');
    private _focused = false;

    /** Whether the code input uses the negative set of styling. */
    @Input() set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._negative !== newValue) {
            this._negative = newValue;
        }
    }
    get negative() {
        return this._negative;
    }
    private _negative = false;

    /** Whether the code input is disabled. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._disabled !== newValue) {
            this._disabled = newValue;
        }
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    private _isUpDown = false;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _el: ElementRef,
        @Optional() @Self() readonly _control: NgControl | null,
        readonly _intl: NxCodeInputIntl,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    ) {
        if (this._control) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this._control.valueAccessor = this;
        }
    }

    ngDoCheck(): void {
        if (this._control) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    /** Sets the length of the input fields. */
    setInputLength(): void {
        if (this.codeLength) {
            this._keyCode = new Array(this.codeLength);
        } else {
            this._keyCode = new Array(DEFAULT_INPUT_LENGTH);
        }
        this._keyCode.fill('');
    }

    /** Converts to upper or lowercase when enabled. */
    _convertLetterSize(value: any): string {
        if (value === 'ß') {
            return value;
        }

        if (typeof value === 'string') {
            if (this.convertTo === AUTO_UPPERCASE) {
                return value.toUpperCase();
            } else if (this.convertTo === AUTO_LOWERCASE) {
                return value.toLowerCase();
            }

            return value;
        }
        return '';
    }

    /** Reacts to keydown event. */
    _keydownAction(event: KeyboardEvent) {
        const targetElement: HTMLInputElement = event.target as HTMLInputElement;
        const previousInputField: HTMLInputElement = targetElement.previousElementSibling as HTMLInputElement;
        const nextInputField: HTMLInputElement = targetElement.nextElementSibling as HTMLInputElement;

        switch (event.keyCode) {
            case SPACE:
                return false;

            case BACKSPACE:
                if (targetElement.value === '') {
                    if (previousInputField && previousInputField.tagName === TAG_NAME_INPUT) {
                        this.selectInput(previousInputField);
                    }
                }
                break;

            case LEFT_ARROW:
                if (previousInputField && previousInputField.tagName === TAG_NAME_INPUT) {
                    event.preventDefault();
                    this.selectInput(previousInputField);
                }
                break;

            case RIGHT_ARROW:
                if (nextInputField && nextInputField.tagName === TAG_NAME_INPUT) {
                    this.selectInput(nextInputField);
                }
                event.preventDefault();
                break;

            case DOWN_ARROW:
                this._isUpDown = true;
                if (this._type === 'number' && (targetElement.value === '' || targetElement.value === '0')) {
                    event.preventDefault();
                }
                break;

            case UP_ARROW:
                this._isUpDown = true;
                if (this._type === 'number' && targetElement.value === '9') {
                    event.preventDefault();
                }
                break;

            default:
                this.selectInput(targetElement);
                break;
        }
        return true;
    }

    /** Selects the value on click of an input field. */
    _selectText(event: Event): void {
        this.selectInput(event.target as HTMLInputElement);
        event.preventDefault();
    }

    /** Automatically focuses and selects the next input on key input. */
    _handleInput(event: Event): void {
        const eventTarget: HTMLInputElement = event.target as HTMLInputElement;

        // some event types have the data property populated, e.g. "inputType: insertCompositionText"
        // these type of events should be fired e.g. when using the clipboard on an android device
        // so we can either use the data property or the target value as fallback
        const eventData = (event as InputEvent).data?.trim() || eventTarget.value.trim();
        const filteredData = this.type === 'number' ? this._filterNumbers(eventData) : eventData;
        const currentIndex = Number(this._getFocusedInputIndex(event));

        this._setKeyCodes(currentIndex, filteredData);

        // needed that we do not end up with multiple characters in one input field as
        // we had to remove the maxlength="1" attribute
        eventTarget.value = this._keyCode[currentIndex] ?? '';
        this.propagateChange(this._keyCode.join(''));

        // don't jump to next input if the user uses UP/DOWN arrow (native behaviour)
        const shouldMoveFocus = !(this._isUpDown && this.type === 'number');

        if (filteredData && shouldMoveFocus) {
            this.moveFocus(currentIndex, filteredData.length);
        }

        this._isUpDown = false;
    }

    private _setKeyCodes(start: number, value: string) {
        if (value.length <= 1) {
            this._keyCode[start] = this._convertLetterSize(value);
        } else {
            for (let i = start, valueIndex = 0; i < this.codeLength; i++, valueIndex++) {
                this._keyCode[i] = this._convertLetterSize(value[valueIndex]?.[0] ?? '');
                this._el.nativeElement.children[i].value = this._keyCode[i];
            }
        }
    }

    /** Focus the next input depending on the the currently focused index and the length of the value that gets added. */
    private moveFocus(start: number, valueLength: number) {
        if (start + valueLength < this.codeLength) {
            this.selectInput(this._el.nativeElement.children.item(start + valueLength));
        } else {
            this._el.nativeElement.children.item(this.codeLength - 1).focus();
        }
    }

    /** Returns the index of the code input, which is currently focused. */
    private _getFocusedInputIndex(event: Event) {
        let inputIndex;
        for (let i = 0; i < this._el.nativeElement.children.length; i++) {
            if (event.target === this._el.nativeElement.children.item(i)) {
                inputIndex = i;
            }
        }
        return inputIndex;
    }

    /** Removes all characters from the input except for numbers [0-9]. */
    private _filterNumbers(value: string) {
        let formattedInput = '';
        for (const char of value) {
            if (char.match(/\d$/)) {
                formattedInput += char;
            }
        }

        return formattedInput;
    }

    /** Triggers when an input field is blurred. */
    _onBlur(): void {
        this._focused = false;
        setTimeout(() => {
            if (!this._focused) {
                this.propagateTouch(this._keyCode.join(''));
            }
            this._cdr.markForCheck();
        });
    }

    /** Sets _focused state and makes valid. */
    _setFocusState(): void {
        this._focused = true;
    }

    /**
     * Disables the code input. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
    }

    /** Sets initial value, used by ControlValueAccessor. */
    writeValue(value: string): void {
        if (value) {
            const valueAsArray = value.split('').slice(0, this.codeLength);

            for (let i = 0; i < this.codeLength; i++) {
                this._keyCode[i] = valueAsArray[i];
            }
        } else {
            this.setInputLength();
        }

        this._cdr.markForCheck();
    }

    _trackByKeyCode(index: number, item: string): number {
        return index;
    }

    /** Adds a gap to input fields when appropriate. */
    _inputGap(index: number): string {
        switch (this.codeLength) {
            case 4:
            case 6:
            case 8:
                if (index === this.codeLength / 2) {
                    return INPUT_FIELD_GAP;
                }
                return '';

            default:
                return '';
        }
    }

    /** @docs-private */
    propagateChange = (_: any) => {};

    /** @docs-private */
    propagateTouch = (_: any) => {};

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.propagateTouch = fn;
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this._control ? (this._control.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
        }
    }

    getAriaLabel(keyIndex: number) {
        return `${this._intl.inputFieldAriaLabel} ${keyIndex + 1} ${this._intl.ofLabel} ${this._keyCode.length}`;
    }

    /**
     * Workaround preventing the selection error because the `setSelectionRange` is not supported on input['type=number']
     * @docs-private
     */
    selectInput(input: HTMLInputElement) {
        input.focus();
        try {
            input.setSelectionRange(0, input.value.length);
        } catch (err) {
            if (err instanceof DOMException && err.name === 'InvalidStateError') {
                // setSelectionRange does not apply
            } else {
                throw err;
            }
        }
    }
}
