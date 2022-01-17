import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    Self,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';

let nextId = 0;
/** Options for placement of the label */
export type POSITION = 'left' | 'right';
/** Options for sizing of the label */
export type LABEL_SIZE = 'small' | 'large';

@Component({
    selector: 'nx-switcher',
    templateUrl: 'switcher.component.html',
    styleUrls: ['./switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        /* the host id should be set to null, otherwise nx-switcher and its <input> get the same id
    and on label click the input click is not triggered (double id problem) */
        '[attr.id]': 'null',
        '[class.is-negative]': 'negative',
        '[class.is-checked]': 'checked',
        '[class.is-big]': 'big',
        '[class.nx-switcher--small-label]': 'labelSize === "small"',
        '[class.nx-switcher--large-label]': 'labelSize === "large"',
        '[class.is-disabled]': 'disabled',
        '[class.is-swapped]': 'labelPosition === "left"',
        '[class.has-error]': 'errorState',
        '[attr.aria-invalid]': 'errorState',
    },
})
export class NxSwitcherComponent implements ControlValueAccessor, DoCheck, AfterViewInit, OnDestroy {
    private _id: string = `nx-switcher-${nextId++}`;
    /** @docs-private */
    errorState: boolean = false;

    /** @docs-private */
    @ViewChild('switcherLabelWrapper', { static: true }) _switcherLabelWrapper!: ElementRef;

    @ViewChild('input') _nativeInput!: ElementRef<HTMLElement>;

    /** Sets the id of the switcher */
    @Input()
    set id(value: string) {
        this._id = value;
        this._cdr.markForCheck();
    }
    get id(): string {
        return this._id;
    }

    private _labelPosition: POSITION = 'right';
    /** Specifies the placement of the label */
    @Input()
    set labelPosition(value: POSITION) {
        this._labelPosition = value;
        this._cdr.markForCheck();
    }
    get labelPosition(): POSITION {
        return this._labelPosition;
    }

    private _name: string | null = null;
    /** Sets the label text of the switcher */
    @Input()
    set name(value: string) {
        this._name = value;
        this._cdr.markForCheck();
    }
    get name(): string {
        return this._name as string;
    }

    private _checked: boolean = false;
    /** Whether the switcher is checked (on) or unchecked (off) */
    @Input()
    set checked(value: boolean) {
        this._checked = value;
        this._cdr.markForCheck();
    }
    get checked(): boolean {
        return this._checked;
    }

    private _big: boolean = false;
    /** Whether the big switcher is used */
    @Input('nxBig')
    set big(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        this._big = newValue;
        this._cdr.markForCheck();
    }
    get big(): boolean {
        return this._big;
    }

    private _labelSize: LABEL_SIZE = 'large';
    /** Sets the size of the label */
    @Input()
    set labelSize(value: LABEL_SIZE) {
        this._labelSize = value;
        this._cdr.markForCheck();
    }
    get labelSize(): LABEL_SIZE {
        return this._labelSize;
    }

    private _negative: boolean = false;
    /** Whether the style for a dark background is used */
    @Input('nxNegative')
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        this._negative = newValue;
        this._cdr.markForCheck();
    }
    get negative(): boolean {
        return this._negative;
    }

    private _disabled: boolean = false;
    /** Whether the switcher is in the disabled state */
    @Input()
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        this._disabled = newValue;
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** An event is dispatched each time the switcher value is changed */
    @Output('checkedChange') checkedChange = new EventEmitter<boolean>();

    private onChangeCallback = (_: any) => {};
    private onTouchedCallback = () => {};

    constructor(
        private _cdr: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        private _errorStateMatcher: ErrorStateMatcher,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        private _focusMonitor: FocusMonitor,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._nativeInput);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._nativeInput);
    }

    /** Allows to toggle between the states */
    toggle() {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onChangeCallback(this.checked);
            this.checkedChange.emit(this.checked);
            if (this.onTouchedCallback) {
                this.onTouchedCallback();
            }
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

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /** @docs-private */
    touch() {
        this.onTouchedCallback();
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
        }
    }

    /** @docs-private */
    get labelHasContent() {
        return !!this._switcherLabelWrapper.nativeElement.innerHTML.trim();
    }

    /** @docs-private
     * Callback for when the content of the label has changed.
     */
    labelContentChanged() {
        this._cdr.detectChanges();
    }
}
