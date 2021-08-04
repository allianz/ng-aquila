import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
  ElementRef,
  Self,
  Optional,
  DoCheck
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { NxCodeInputIntl } from './code-input-intl';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { BACKSPACE, LEFT_ARROW, RIGHT_ARROW, SPACE, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

const DEFAULT_INPUT_LENGTH = 6;
const TAG_NAME_INPUT = 'INPUT';
const AUTO_UPPERCASE = 'upper';
const AUTO_LOWERCASE = 'lower';
const INPUT_FIELD_GAP = 'nx-code-input--field-with-gap';
export type NxConversionTypes = 'lower' | 'upper';

@Component({
  selector: 'nx-code-input',
  templateUrl: 'code-input.component.html',
  styleUrls: [
    'code-input.scss'
  ],
  host: {
    '[class.nx-code-input]': 'true',
    '[class.has-error]': 'errorState',
    '[class.is-negative]': 'negative',
    '[class.is-disabled]': 'disabled',
    '[attr.tabindex]': '-1'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxCodeInputComponent implements ControlValueAccessor, DoCheck {

  /** Whether the current input of the component has an error. */
  errorState: boolean = false;

  /** The length of the code input. Default: 6. */
  @Input('length')
  set codeLength(value: number) {
    this._codeLength = value;
    this.setInputLength();
    this._changeDetectorRef.markForCheck();
  }
  get codeLength() {
    return this._codeLength;
  }
  private _codeLength: number = DEFAULT_INPUT_LENGTH;

  /** The type of HTML input */
  @Input()
  set type(value: string) {
    this._type = value;
    this._changeDetectorRef.markForCheck();
  }
  get type() {
    return this._type;
  }
  private _type: string = 'text';
  private _isUpDown: boolean = false;

  /** Sets the tabindex of the contained input elements. */
  @Input()
  set tabindex(value: number) {
    this._tabindex = value;
    this._changeDetectorRef.markForCheck();
  }
  get tabindex(): number {
    return this._tabindex;
  }
  private _tabindex: number = 0;

  /** Whether the form should auto capitalize or lowercase (optional). */
  @Input('nxConvertTo')
  set convertTo(value: NxConversionTypes) {
    this._convertTo = value;
    this._changeDetectorRef.markForCheck();
  }
  get convertTo() {
    return this._convertTo!;
  }
  private _convertTo?: NxConversionTypes;

  /** The user input in array form */
  _keyCode: string[] = new Array(DEFAULT_INPUT_LENGTH);
  private _focused: boolean = false;

  /** Whether the code input uses the negative set of styling. */
  @Input()
  set negative(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this._negative !== newValue) {
      this._negative = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  get negative() {
    return this._negative;
  }

  private _negative: boolean = false;

  /** Whether the code input is disabled. */
  @Input()
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  get disabled() {
    return this._disabled;
  }

  private _disabled: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _el: ElementRef,
    @Self() @Optional() public _control: NgControl,
    public _intl: NxCodeInputIntl,
    private _errorStateMatcher: ErrorStateMatcher,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective) {
    if (this._control) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this._control.valueAccessor = this;
    }
  }

  ngDoCheck() {
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
  }

  /** Converts to upper or lowercase when enabled. */
  _convertLetterSize(value: any): string | undefined {
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
  }

  /** Reacts to keydown event. */
  _keydownAction(event: KeyboardEvent): void | false {
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
        break;
    }
  }

  /** Selects the value on click of an input field. */
  _selectText(event: Event): void {
    this.selectInput(event.target as HTMLInputElement);
  }

  /** Automatically focuses and selects the next input on key input. */
  _selectNextInput(event: Event): void {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    eventTarget.value = this._convertLetterSize(eventTarget.value.slice(0, 1)) as string;
    const currentIndex: number = Number(this._getFocusedInputIndex(event));
    // save in model with uppercase if needed
    this._keyCode[currentIndex] = eventTarget.value;
    this.propagateChange(this._keyCode.join(''));

    // don't jump to next input if the user uses UP/DOWn arrow (native behaviour)
    const focusNextInput = !(this._isUpDown && this.type === 'number');

    if (eventTarget.value && focusNextInput) {
      const nextInputField = eventTarget.nextSibling as HTMLInputElement;

      if (nextInputField !== null && nextInputField.tagName === TAG_NAME_INPUT) {
        nextInputField.focus();
        if (nextInputField.value !== '') {
          this.selectInput(nextInputField);
        }
      }
    }

    this._isUpDown = false;
  }

  /** Paste event to distribute content in input fields. */
  _pasteClipboard(event: ClipboardEvent): void {
    let copiedText = (event.clipboardData || (window as any).clipboardData).getData('text');
    let copiedTextIndex = 0;
    const inputIndex: number = Number(this._getFocusedInputIndex(event));

    copiedText = this.type === 'number' ? this._formatNumberInput(copiedText) : copiedText;

    for (let i: number = inputIndex; i < this.codeLength; i++) {
      this._keyCode[i] = this._convertLetterSize(copiedText[copiedTextIndex]) as string;
      copiedTextIndex++;
    }

    this.propagateChange(this._keyCode.join(''));

    if (inputIndex + copiedText.length < this.codeLength) {
      this._el.nativeElement.children.item(inputIndex + copiedText.length).focus();
    } else {
      this._el.nativeElement.children.item(this.codeLength - 1).focus();
    }

    event.preventDefault();
  }

  /** Returns the index of the code input, which is currently focused. */
  private _getFocusedInputIndex(event: Event) {
    let inputIndex;
    for (let i = 0; i < this._el.nativeElement.children.length; i++) {
      if (event.srcElement === this._el.nativeElement.children.item(i)) {
        inputIndex = i;
      }
    }
    return inputIndex;
  }

  /** Removes all characters from the input except for numbers [0-9]. */
  private _formatNumberInput(copiedText: string) {
    let formattedInput = '';
    for (let i = 0; i < copiedText.length; i++) {
      if (copiedText[i].match(/[0-9]{1}$/)) {
        formattedInput += copiedText[i];
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
      this._changeDetectorRef.markForCheck();
    });
  }

  /** Sets _focused state and makes valid. */
  _setFocusState(): void {
    this._focused = true;
  }

  /**
   * Disables the code input. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
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

    this._changeDetectorRef.markForCheck();
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
        } else {
          return '';
        }
      default:
        return '';
    }
  }

  /** @docs-private */
  propagateChange = (_: any) => {
  }

  /** @docs-private */
  propagateTouch = (_: any) => {
  }

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
    const control = this._control ? this._control.control as FormControl : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
    }
  }

  getAriaLabel(keyIndex: number) {
    return `${this._intl.inputFieldAriaLabel} ${keyIndex + 1} ${this._intl.ofLabel} ${this._keyCode.length}`;
  }

 /** @docs-private
  * Workaround preventing the selection error because the `setSelectionRange` is not supported on input['type=number']
  * */
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

 static ngAcceptInputType_negative: BooleanInput;
 static ngAcceptInputType_disabled: BooleanInput;
}
