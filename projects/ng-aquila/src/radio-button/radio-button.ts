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
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import { ErrorStateMatcher, randomString } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** The change event object emitted by the radio group and radio button. */
export class NxRadioChange {
    /** The NxRadioComponent that emits the change event. NxRadioChange object can be instantiated with source radio component and a value. */
    constructor(
        readonly source: NxRadioComponent,
        readonly value: any,
    ) {}
}

/** Label Size Types */
export type LabelSize = 'small' | 'big';

let nextId = 0;

@Component({
    selector: 'nx-radio-group',
    templateUrl: './radio-group.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'radiogroup',
        '[attr.id]': 'id',
        '[attr.required]': 'required',
        '[class.nx-radio-group--negative]': 'negative',
        '[attr.aria-labelledby]': 'this._label?.id  || null',
    },
    styleUrls: ['radio-button-group.scss'],
})
export class NxRadioGroupComponent implements ControlValueAccessor, AfterContentInit, OnDestroy, DoCheck {
    @ContentChild(forwardRef(() => NxLabelComponent)) _label!: NxLabelComponent;

    /** @docs-private */
    errorState = false;

    // emits when the internal state changes on properties which are relevant
    // for the radio buttons so that they can mark themself for check
    readonly _stateChanges = new Subject<void>();

    /** Sets the Id of the radio group. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }
    private _id = `nx-radio-group-${nextId++}`;

    /** Whether every radio button in this group should be disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        // inform childs about the change where CD should be triggered
        this._stateChanges.next();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Whether the radio group should have negative styling. */
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get negative(): boolean {
        return this._negative;
    }
    private _negative = false;

    /** Sets if at least an option should be selected. */
    @Input() set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this._stateChanges.next();
    }
    get required(): boolean {
        return this._required;
    }
    private _required = false;

    /** An event is dispatched on each group value change. */
    @Output() readonly groupValueChange = new EventEmitter<NxRadioChange>();

    // The currently selected radio button; should match _value
    private _selected: NxRadioComponent | null = null;

    @ContentChildren(forwardRef(() => NxRadioComponent), { descendants: true }) _radios!: QueryList<NxRadioComponent>;

    // this is also the name attribute, which is mandatory in conjunction with ngModel, hence no nx prefix
    /** Sets the name of this radio group, which is mandatory in conjunction with ngModel (Default: null). */
    @Input() set name(value: string) {
        this._name = value;
        this._stateChanges.next();
    }
    get name(): string {
        return this._name;
    }
    private _name = `nx-radio-group-${nextId++}`;

    /** Sets the value of the selected radion button in this group (Default: null). */
    @Input() set value(newValue: any) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;

            this._updateSelectedRadioFromValue();
            this._checkSelectedRadioButton();
        }
    }
    get value(): any {
        return this._value;
    }
    private _value: any = null;

    private _onChange: (value: any) => void = () => {};
    private _onTouched: () => void = () => {};

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        @Optional() @Self() readonly ngControl: NgControl | null,
        @Optional() readonly _parentForm: NgForm | null,
        @Optional() readonly _parentFormGroup: FormGroupDirective | null,
        readonly _errorStateMatcher: ErrorStateMatcher,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterContentInit(): void {
        if (this.ngControl) {
            // prevent group overwrite radio buttons since there is no value from group
            this._updateSelectedRadioFromValue();
        }
        this._checkSelectedRadioButton();
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
        this._stateChanges.complete();
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /** @docs-private this is meant to be called by the radio buttons in this group */
    change(value: any) {
        this.value = value;
        this._onChange(value);
        this.groupValueChange.emit(new NxRadioChange(this._selected!, this._value));
    }

    /** @docs-private this is meant to be called by the radio buttons in this group. */
    touch() {
        if (this._onTouched) {
            this._onTouched();
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private _updateSelectedRadioFromValue(): void {
        // If the value already matches the selected radio, do nothing.
        const isAlreadySelected = this._selected != null && this._selected.value === this._value;

        if (this._radios != null && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(radio => {
                radio.checked = this.value === radio.value;
                if (radio.checked) {
                    this._selected = radio;
                }
            });
        }
    }

    private _checkSelectedRadioButton() {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
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
            this._cdr.markForCheck();
        }
    }
}

@Component({
    selector: 'nx-radio',
    templateUrl: 'radio-button.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['radio-button.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxRadioComponent),
            multi: true,
        },
    ],
    host: {
        '[attr.required]': 'required',
        '[class.nx-radio-button--small-label]': 'labelSize === "small"',
        '[class.nx-radio-button--big-label]': 'labelSize === "big"',
        '[class.nx-radio--negative]': 'negative',
        '[class.has-error]': '_controlInvalid() || null',
        '[attr.aria-invalid]': '_controlInvalid() || null',
    },
})
export class NxRadioComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    /** @docs-private */
    @ViewChild('radioLabelWrapper', { static: true }) _radioLabelWrapper!: ElementRef;
    @ViewChild('input') _nativeInput!: ElementRef<HTMLElement>;

    /** Sets the id of the radio component. */
    @Input() set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }

    private _id = `nx-radio-${nextId++}-${randomString()}`;

    /** @docs-private */
    get inputId(): string {
        return `${this.id}-input`;
    }

    /** @docs-private */
    get labelId(): string {
        return `${this.id}-label`;
    }

    // this is also the name attribute, which is mandatory in conjunction with ngModel, hence no nx prefix
    /** Sets the name of this radio component, which is mandatory in conjunction with ngModel (Default: null). */
    @Input() set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this._cdr.markForCheck();
        }
    }
    get name(): string {
        return this.radioGroup?.name || this._name!;
    }
    private _name: string | null = null;

    /**
     * Sets the label size of the radio button.
     * The default value is `big`.
     */
    @Input() set labelSize(value: LabelSize) {
        if (this._labelSize !== value) {
            this._labelSize = value;
            this._cdr.markForCheck();
        }
    }
    get labelSize(): LabelSize {
        return this._labelSize;
    }
    private _labelSize: LabelSize = 'big';

    /**
     * Whether the negative set of styles should be used.
     *
     * If the radio button is placed in a radio group, the negative value
     * is overwritten by the group's negative value.
     */
    @Input() set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._negative !== newValue) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this.radioGroup ? this.radioGroup.negative : this._negative;
    }
    private _negative = false;

    /** An event is dispatched on each value change. */
    @Output() readonly valueChange = new EventEmitter<NxRadioChange>();

    /** @docs-private */
    get labelHasContent(): boolean {
        return !!this._radioLabelWrapper.nativeElement.innerHTML.trim();
    }

    /** Sets the value of the form control element (Default: null). */
    @Input() set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }
    get value(): any {
        return this._value;
    }
    private _value: any = null;

    /** Whether the radio component is selected. */
    @Input() set checked(value: boolean) {
        if (this._checked !== value) {
            this._checked = value;
            this._cdr.markForCheck();
        }
    }
    /** @docs-private */
    get checked(): boolean {
        return this._checked;
    }
    private _checked = false;

    /** Whether the radio button should be disabled or not. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    /** @docs-private */
    get disabled(): boolean {
        return this._disabled || !!this.radioGroup?.disabled;
    }
    private _disabled = false;

    /** Sets if at least a radio button should be selected. */
    @Input() set required(value: boolean) {
        this._required = value;
        // needed when the outer component is set to onPush because it is a native property
        // on the host element
        this._cdr.markForCheck();
    }
    /** @docs-private */
    get required(): boolean {
        return this._required || !!this.radioGroup?.required;
    }
    private _required = false;

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Optional() readonly radioGroup: NxRadioGroupComponent | null,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngOnInit(): void {
        if (this.radioGroup) {
            this.name = this.radioGroup.name;
            // when relevant properties of the parent like name and disabled change
            // we need to let change detection know that the template needs an update
            this.radioGroup._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._cdr.markForCheck();
            });

            if (this.radioGroup.value === this._value) {
                this._checked = true;
            }
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

    /**
     * Callback for when the content of the label has changed.
     * @docs-private
     */
    labelContentChanged() {
        this._cdr.detectChanges();
    }

    writeValue(value: any): void {
        if (value === this._value) {
            this._checked = true;
            this._cdr.markForCheck();
        }
    }

    private onChangeCallback: (value: any) => void = () => {};

    registerOnChange(onChange: (value: any) => void): void {
        this.onChangeCallback = onChange;
    }

    private onTouchedCallback: () => void = () => {};

    registerOnTouched(onTouched: () => void): void {
        this.onTouchedCallback = onTouched;
    }

    /** Focuses the radio button element. */
    focus(focusOrigin?: FocusOrigin) {
        this._focusMonitor.focusVia(this._nativeInput, focusOrigin as FocusOrigin);
    }

    /** @docs-private */
    touch() {
        this.onTouchedCallback();

        if (this.radioGroup) {
            this.radioGroup.touch();
        }
    }

    _onInputChange(event: Event) {
        event.stopPropagation();
        this._checked = true;
        this.valueChange.emit(new NxRadioChange(this, this._value));
        this.onChangeCallback(this.value);

        if (this.radioGroup && this.value !== this.radioGroup.value) {
            this.radioGroup.change(this.value);
        }
    }

    _onInputClick(event: Event) {
        // make sure click event propagation on the visually hidden input
        // are stopped to prevent multiple events bubbling up.
        event.stopPropagation();
    }

    /** @docs-private */
    _controlInvalid(): boolean {
        const form = this.radioGroup && (this.radioGroup._parentFormGroup || this.radioGroup._parentForm);
        const control = this.radioGroup?.ngControl ? (this.radioGroup.ngControl.control as FormControl) : null;
        if (this.radioGroup?._errorStateMatcher) {
            return this.radioGroup._errorStateMatcher.isErrorState(control, form);
        }
        return !!(control?.invalid && (control.touched || form?.submitted));
    }
}
