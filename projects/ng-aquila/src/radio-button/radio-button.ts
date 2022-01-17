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
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Subject, Subscription } from 'rxjs';

/** The change event object emitted by the radio group and radio button. */
export class NxRadioChange {
    source: NxRadioComponent;
    value: any;

    /** The NxRadioComponent that emits the change event. NxRadioChange object can be instantiated with source radio component and a value. */
    constructor(source: NxRadioComponent, value: any) {
        this.source = source;
        this.value = value;
    }
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
    @ContentChild(forwardRef(() => NxLabelComponent))
    _label!: NxLabelComponent;

    /** @docs-private */
    errorState: boolean = false;

    // emits when the internal state changes on properties which are relevant
    // for the radio buttons so that they can mark themself for check
    readonly _stateChanges = new Subject<void>();

    private _id: string = `nx-radio-group-${nextId++}`;
    /** Sets the Id of the radio group. */
    @Input('id')
    set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }
    private _disabled: boolean = false;

    /** Whether every radio button in this group should be disabled. */
    @Input('nxDisabled')
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        // inform childs about the change where CD should be triggered
        this._stateChanges.next();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    private _negative: boolean = false;
    /** Whether the radio group should have negative styling. */
    @Input()
    set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get negative(): boolean {
        return this._negative;
    }

    private _required: boolean = false;
    /** Sets if at least an option should be selected. */
    @Input()
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this._stateChanges.next();
    }
    get required(): boolean {
        return this._required;
    }

    /** An event is dispatched on each group value change. */
    @Output('nxGroupValueChange') groupValueChange: EventEmitter<NxRadioChange> = new EventEmitter<NxRadioChange>();
    private _name: string = `nx-radio-group-${nextId++}`;
    private _value: any = null;
    // The currently selected radio button; should match _value
    private _selected: NxRadioComponent | null = null;

    @ContentChildren(forwardRef(() => NxRadioComponent), { descendants: true })
    _radios!: QueryList<NxRadioComponent>;

    private _onChange: (value: any) => void = () => {};
    private _onTouched: Function = () => {};

    get name(): string {
        return this._name;
    }

    // this is also the name attribute, which is mandatory in conjunction with ngModel, hence no nx prefix
    /** Sets the name of this radio group, which is mandatory in conjunction with ngModel (Default: null). */
    @Input()
    set name(value: string) {
        this._name = value;
        this._stateChanges.next();
    }

    get value(): any {
        return this._value;
    }

    /** Sets the value of the selected radion button in this group (Default: null). */
    @Input('nxValue')
    set value(newValue: any) {
        if (this._value !== newValue) {
            // Set this before proceeding to ensure no circular loop occurs with selection.
            this._value = newValue;

            this._updateSelectedRadioFromValue();
            this._checkSelectedRadioButton();
        }
    }

    constructor(
        private _cdr: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() public _parentForm: NgForm,
        @Optional() public _parentFormGroup: FormGroupDirective,
        private _errorStateMatcher: ErrorStateMatcher,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterContentInit() {
        this._updateSelectedRadioFromValue();
        this._checkSelectedRadioButton();
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnDestroy() {
        this._stateChanges.complete();
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this._onTouched = fn;
    }

    /** @docs-private this is meant to be called by the radio buttons in this group */
    change(value: any) {
        this.value = value;
        this._onChange(value);
        this.groupValueChange.emit(new NxRadioChange(this._selected as NxRadioComponent, this._value));
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
    private _parentChangeSubscription!: Subscription;

    private _id: string = `nx-radio-${nextId++}`;
    /** Sets the id of the radio component. */
    @Input('id')
    set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }

    /** @docs-private */
    get inputId(): string {
        return `${this.id}-input`;
    }

    /** @docs-private */
    get labelId(): string {
        return `${this.id}-label`;
    }

    private _name: string | null = null;
    // this is also the name attribute, which is mandatory in conjunction with ngModel, hence no nx prefix
    /** Sets the name of this radio component, which is mandatory in conjunction with ngModel (Default: null). */
    @Input('name')
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this._cdr.markForCheck();
        }
    }
    get name(): string {
        return this.radioGroup && this.radioGroup.name ? this.radioGroup.name : (this._name as string);
    }

    private _labelSize: LabelSize = 'big';
    /** Sets the label size of the radio button.
     * The default value is `big`.
     */
    @Input()
    set labelSize(value: LabelSize) {
        if (this._labelSize !== value) {
            this._labelSize = value;
            this._cdr.markForCheck();
        }
    }
    get labelSize(): LabelSize {
        return this._labelSize;
    }

    private _negative: boolean = false;
    /**
     * Whether the negative set of styles should be used.
     *
     * If the radio button is placed in a radio group, the negative value
     * is overwritten by the group's negative value.
     */
    @Input()
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._negative !== newValue) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this.radioGroup ? this.radioGroup.negative : this._negative;
    }

    /** An event is dispatched on each value change. */
    @Output('nxValueChange') valueChange: EventEmitter<NxRadioChange> = new EventEmitter<NxRadioChange>();

    private _value: any = null;
    private _checked: boolean = false;
    private _disabled: boolean = false;
    private _required: boolean = false;

    get value(): any {
        return this._value;
    }

    /** @docs-private */
    get labelHasContent(): boolean {
        return !!this._radioLabelWrapper.nativeElement.innerHTML.trim();
    }

    /** @docs-private
     * Callback for when the content of the label has changed.
     */
    labelContentChanged() {
        this._cdr.detectChanges();
    }

    /** Sets the value of the form control element (Default: null). */
    @Input('nxValue')
    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }

    /** @docs-private */
    get checked(): boolean {
        return this._checked;
    }

    /** Whether the radio component is selected. */
    @Input('nxChecked')
    set checked(value: boolean) {
        if (this._checked !== value) {
            this._checked = value;
            this._cdr.markForCheck();
        }
    }

    /** @docs-private */
    get disabled(): boolean {
        return this._disabled || (this.radioGroup && this.radioGroup.disabled);
    }

    /** Whether the radio button should be disabled or not. */
    @Input('nxDisabled')
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }

    /** @docs-private */
    get required(): boolean {
        return this._required || (this.radioGroup && this.radioGroup.required);
    }

    /** Sets if at least a radio button should be selected. */
    @Input()
    set required(value: boolean) {
        this._required = value;
        // needed when the outer component is set to onPush because it is a native property
        // on the host element
        this._cdr.markForCheck();
    }

    constructor(@Optional() public radioGroup: NxRadioGroupComponent, private _cdr: ChangeDetectorRef, private _focusMonitor: FocusMonitor) {}

    ngOnInit() {
        if (this.radioGroup) {
            this.name = this.radioGroup.name;
            // when relevant properties of the parent like name and disabled change
            // we need to let change detection know that the template needs an update
            this._parentChangeSubscription = this.radioGroup._stateChanges.subscribe(() => {
                this._cdr.markForCheck();
            });

            if (this.radioGroup.value === this._value) {
                this._checked = true;
            }
        }
    }

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._nativeInput);
    }

    ngOnDestroy() {
        if (this._parentChangeSubscription) {
            this._parentChangeSubscription.unsubscribe();
        }
        this._focusMonitor.stopMonitoring(this._nativeInput);
    }

    writeValue(value: any): void {
        if (value === this._value) {
            this._checked = true;
            this._cdr.markForCheck();
        }
    }

    private onChangeCallback: Function = () => {};

    registerOnChange(onChange: Function): void {
        this.onChangeCallback = onChange;
    }

    private onTouchedCallback: Function = () => {};

    registerOnTouched(onTouched: Function): void {
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
        return !!(
            this.radioGroup &&
            this.radioGroup.ngControl &&
            this.radioGroup.ngControl.invalid &&
            (this.radioGroup.ngControl.touched || (form && form.submitted))
        );
    }
}
