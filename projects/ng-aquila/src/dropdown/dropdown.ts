import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, RIGHT_ARROW, SHIFT, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    ConnectionPositionPair,
    FlexibleConnectedPositionStrategy,
    Overlay,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import {
    AfterContentInit,
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    isDevMode,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { NxFormfieldComponent, NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, map, startWith, take, takeUntil } from 'rxjs/operators';

import { NxDropdownClosedLabelDirective } from './closed-label.directive';
import { NxDropdownControl } from './dropdown.control';
import { getNxDropdownNonArrayValueError } from './dropdown-errors';
import { getPositionOffset, getPositions } from './dropdown-position';
import { NxDropdownGroupComponent } from './group/dropdown-group';
import { NxDropdownItemComponent } from './item/dropdown-item';

let nextUniqueId = 0;

/**
 * An option of the dropdown.
 * Contains a value and an optional label.
 * If no label is specified, the value will be displayed instead.
 */
export interface NxDropdownOption {
    value: any;
    label?: string;
}

export type NxDropdownPanelMinWidth = 'trigger' | 'none';

/** Dropdown data that requires internationalization. */
export class NxDropdownIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes = new Subject<void>();
    /** A label for the multi-select component. */
    selectAll = 'Select all';
    /** A label for the multi-select component. */
    clearAll = 'Clear all';
}

/** Change event object that is emitted when the select value has changed. */
export class NxDropdownSelectChange<T = any> {
    constructor(
        /** Reference to the select that emitted the change event. */
        readonly source: NxDropdownComponent,
        /** Current value of the select that emitted the event. */
        readonly value: T,
    ) {}
}

/** Injection token that determines the scroll handling while a dropdown is open. */
export const NX_DROPDOWN_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-dropdown-scroll-strategy');

/** @docs-private */
export function NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_DROPDOWN_SCROLL_STRATEGY,
    useFactory: NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

export type FilterInputType = 'text' | 'number' | 'tel' | 'search' | 'date' | 'datetime' | 'month' | 'email';

export type NxDropdownFilterFn = (query: string, label: string) => boolean;

const _defaultFilterFn: NxDropdownFilterFn = (query, label) => label.toLocaleLowerCase().includes(query.toLocaleLowerCase()); // TODO why not `toLowerCase()` as in multi-select?

export type NxDropdownCompareWithFn = (o1: any, o2: any) => boolean;

const _defaultCompareWithFn: NxDropdownCompareWithFn = (o1, o2) => o1 === o2;

export type NxDropdownValueFormatterFn = (value: any) => any; // TODO why not return a string?

const _defaultValueFormatterFn: NxDropdownValueFormatterFn = value => (value == null ? '' : value.toString());

@Component({
    selector: 'nx-dropdown',
    templateUrl: 'dropdown.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['dropdown.scss'],
    providers: [
        { provide: NxDropdownControl, useExisting: NxDropdownComponent },
        { provide: NxFormfieldControl, useExisting: NxDropdownComponent },
        { provide: NxAbstractControl, useExisting: NxDropdownComponent },
    ],
    host: {
        role: 'combobox',
        '[class.nx-dropdown]': 'true',
        '[class.is-filled]': 'hasValue',
        '[class.is-readonly]': 'readonly',
        '[class.has-focus]': 'focused',
        '[class.nx-dropdown--negative]': '_negative',
        '[class.nx-dropdown--disabled]': 'disabled',
        '[attr.aria-describedby]': 'ariaDescribedby || null',
        '[attr.aria-required]': 'required',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-labelledby]': '_getAriaLabelledBy()',
        '[attr.aria-controls]': 'modalId',
        '[attr.aria-invalid]': 'errorState',
        'aria-haspopup': 'listbox',
        '[attr.aria-expanded]': 'panelOpen',
        '[attr.readonly]': 'readonly || null',
        '[attr.disabled]': 'disabled || null',
        '[attr.tabindex]': 'tabIndex',
        '(keydown)': '_handleKeydown($event)',
        '(focus)': '_onFocus()',
        '(blur)': '_onBlur()',
        '(click)': 'openPanel($event)',
    },
})
export class NxDropdownComponent
    implements NxAbstractControl, NxDropdownControl, ControlValueAccessor, OnInit, AfterViewInit, AfterContentInit, OnDestroy, DoCheck
{
    /** Whether the dropdown is readonly. */
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

    private _selectionModel!: SelectionModel<NxDropdownOption>;

    /** The ID of rendered dropdown html element. */
    readonly renderedValueId: string = `nx-dropdown-rendered-${nextUniqueId++}`;
    readonly modalId: string = `nx-dropdown-modal-${nextUniqueId++}`;

    private _focused = false;

    /** Whether or not the overlay panel is open. */
    private _panelOpen = false;

    /** @docs-private */
    errorState = false;

    _tooltipText = '';

    /** Width of the overlay panel. */
    _overlayWidth: string | number = '';

    /**
     * Name of this control that is used inside the formfield component.
     * @docs-private
     */
    controlType = 'nx-dropdown';

    /** The minimal space between the viewport and the overlay */
    _overlayViewportMargin: number = this.dir === 'rtl' ? 0 : 16;

    /** Holds the panelWidth after panel was attached. */
    _panelWidth?: number;

    _positions: ConnectionPositionPair[] = getPositions('auto', 0);

    /**
     * Emits when internal state changes to inform formfield about it.
     * @docs-private
     */
    readonly stateChanges = new Subject<any>();

    /** @docs-private */
    ariaDescribedby?: string;

    /** @docs-private */
    currentFilter = '';

    /**
     * Array of options for the dropdown.
     */
    @Input() set options(value: NxDropdownOption[]) {
        this._options.next(value);
    }
    get options(): NxDropdownOption[] {
        return this._options.value;
    }
    // @ts-expect-error TODO: refactor to be TS compatible
    private readonly _options = new BehaviorSubject<NxDropdownOption[]>(null);

    /**
     * Type of filter input (default: text).
     */
    @Input() set filterInputType(value: FilterInputType) {
        this._filterInputType = value;
    }
    get filterInputType(): FilterInputType {
        return this._filterInputType;
    }
    private _filterInputType: FilterInputType = 'text';

    @Input() set tabIndex(value: number) {
        // If the specified tabIndex value is null or undefined, fall back to the default value.
        this._tabIndex = value != null ? value : 0;
    }
    get tabIndex(): number {
        return this.disabled || this.readonly ? -1 : this._tabIndex;
    }
    private _tabIndex = 0;

    /** Selected value */
    @Input() set value(newValue: any) {
        if (newValue !== this._value) {
            this.writeValue(newValue);
            this._value = newValue;
            this._onChange(newValue);
        }
    }
    get value(): any {
        return this._value;
    }
    /** Holds the value from nxValue. */
    private _value: any;

    /** Whether the dropdown is disabled. */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }
    protected _disabled = false;

    /**
     * Whether the dropdown should allow multi selection and additional checkboxes are shown.
     * Note: Please make sure the value you bind is an array.
     * @throws Error if true and the bound value is not an array.
     * @deprecated Please use the new `<nx-multi-select>` component instead.
     */
    @Input() isMultiSelect = false;

    /** The id of the input. */
    get id() {
        return this.renderedValueId;
    }

    /** Whether the component is required. This adds an aria-required label to the component. */
    @Input() set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return this._required;
    }

    protected _required = false;

    private _style = '';
    /** Whether the dropdown should render in its negative style or not. */
    _negative = false;

    /** If set to 'negative', the component is displayed with the negative set of styles. */
    @Input('variant') set styles(value: string) {
        if (this._style === value) {
            return;
        }

        this._style = value;
        this._negative = !!this._style.match(/negative/);
    }

    /** Placeholder to be shown if no value has been selected. */
    @Input() set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get placeholder(): string {
        return this._placeholder;
    }
    private _placeholder = '';

    /**
     * Disable truncation of long item texts.
     * We recommend following UX guidelines and always truncating long items.
     * Please only disable truncation if it's impossible to use short descriptions.
     */
    @Input() set ignoreItemTruncation(value: BooleanInput) {
        this._ignoreItemTruncation = coerceBooleanProperty(value);
    }
    get ignoreItemTruncation(): boolean {
        return this._ignoreItemTruncation;
    }
    private _ignoreItemTruncation = false;

    /** Whether the dropdown should be shown with an additional filter input. */
    @Input() showFilter = false;

    /** Text displayed as placeholder for the filter. */
    @Input() filterPlaceholder = '';

    /** Text that is displayed at the top of the overlay. If not set the formfield label is used by default. */
    @Input() overlayLabel = '';

    /**
     * Sets how the panel min width will be determined.
     * 'trigger' will set the panels min-width to the trigger width.
     * 'none' will not set a min-width and will let the panel grow naturally with its content so it can be smaller than the trigger.
     * This is mostly for special use cases like the country code dropdown in the phone input.
     */
    @Input() panelMinWidth: NxDropdownPanelMinWidth = 'trigger';

    /** Event emitted when the select panel has been toggled. */
    @Output() readonly openedChange = new EventEmitter<boolean>();

    /** Event emitted when the select panel has been focus out. */
    @Output() readonly focusOut = new EventEmitter<boolean>();

    /** Event emitted when the dropdown items get filtered. Returns the currently visible dropdown items. */
    @Output('filterResult') readonly filterResultChange = new EventEmitter<NxDropdownItemComponent[]>();

    /** Event emitted when the select has been opened. */
    @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(
        filter(o => o),
        map(() => {}),
    );

    /** Event emitted when the select has been closed. */
    @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(
        filter(o => !o),
        map(() => {}),
    );

    /** Event emitted when the user types in the filter input. */
    @Output('filterInput') readonly filterChanges = new EventEmitter<any>();

    /**
     * Event that emits whenever the raw value of the select changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * @docs-private
     */
    @Output() readonly valueChange = new EventEmitter<any>();

    /** Event emitted when the selected value has been changed. */
    @Output() readonly selectionChange = new EventEmitter<NxDropdownSelectChange>();

    /**
     * Panel containing the select options.
     * @docs-private
     */
    @ViewChild('panel') panel?: ElementRef;

    /** @docs-private */
    @ViewChild('panelBody') panelBody?: ElementRef;

    /** @docs-private */
    @ViewChild('trigger', { static: true }) trigger!: ElementRef;

    /** @docs-private */
    @ViewChild('fallbackOrigin') fallbackOrigin!: ElementRef | CdkOverlayOrigin;

    /** @docs-private */
    @ViewChild('filterInput') filterInput?: ElementRef;

    /**
     * Overlay pane containing the options.
     * @docs-private
     */
    @ViewChild(CdkConnectedOverlay, { static: true }) overlayDir!: CdkConnectedOverlay;

    @ContentChildren(NxDropdownItemComponent, { descendants: true }) _contentDropdownItems!: QueryList<NxDropdownItemComponent>;

    /** @docs-private */
    @ContentChildren(NxDropdownGroupComponent) groups: any;

    @ContentChild(NxDropdownClosedLabelDirective) _customClosedDropdownLabel!: NxDropdownClosedLabelDirective;

    @ViewChild('defaultClosedDropdownLabel', { static: true }) private _defaultClosedDropdownLabel!: TemplateRef<any>;

    @ViewChildren(NxDropdownItemComponent) _lazyDropdownItems!: QueryList<NxDropdownItemComponent>;

    get dropdownItems(): QueryList<NxDropdownItemComponent> {
        return this._isLazy ? this._lazyDropdownItems : this._contentDropdownItems;
    }

    /** @docs-private */
    get closedDropdownLabel(): TemplateRef<any> {
        return this._closedDropdownLabel;
    }
    private _closedDropdownLabel!: TemplateRef<any>;

    private readonly _destroyed = new Subject<void>();

    private _keyManager!: ActiveDescendantKeyManager<NxDropdownItemComponent>;

    set panelOpen(value: boolean) {
        this._panelOpen = value;
    }
    /** @docs-private */
    get panelOpen(): boolean {
        return this._panelOpen;
    }

    /** Strategy factory that will be used to handle scrolling while the dropdown panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    /** Strategy that will be used to handle scrolling while the dropdown panel is open. */
    _scrollStrategy = this._scrollStrategyFactory();

    /** @docs-private */
    get label(): string {
        if (this._isInOutlineField) {
            return '';
        }

        return this.overlayLabel ? this.overlayLabel : this.formFieldComponent?.label ?? '';
    }

    /**
     * Function that transforms the value into a string.
     * This function is used for displaying and filtering the content.
     *
     * Default: `(value: any) => value == null ? '' : value.toString()`.
     */
    @Input() set valueFormatter(value: NxDropdownValueFormatterFn | null | undefined) {
        this.#valueFormatter = value;
    }
    get valueFormatter(): NxDropdownValueFormatterFn {
        return this.#valueFormatter ?? _defaultValueFormatterFn;
    }
    #valueFormatter?: NxDropdownValueFormatterFn | null;

    /**
     * Function to compare the option values with the selected values. The first argument
     * is a value from an option. The second is a value from the selection. A boolean
     * should be returned.
     *
     * Defaults to object equality.
     */
    @Input() set compareWith(value: NxDropdownCompareWithFn | null | undefined) {
        this.#compareWith = value;
        if (this._selectionModel) {
            // A different comparator means the selection could change.
            this._initializeSelection();
        }
    }
    get compareWith(): NxDropdownCompareWithFn {
        return this.#compareWith ?? _defaultCompareWithFn;
    }
    #compareWith?: NxDropdownCompareWithFn | null;

    /**
     * Function to be used when the user types into the search filter. The first argument is the user input,
     * the second argument is the dropdown item value as displayed. The dropdown items will use this function
     * to set their visibility state. A boolean should be returned.
     *
     * Defaults to lower case inclusion.
     */
    @Input() set filterFn(value: NxDropdownFilterFn | null | undefined) {
        this.#filterFn = value;
    }
    get filterFn(): NxDropdownFilterFn {
        return this.#filterFn ?? _defaultFilterFn;
    }
    #filterFn?: NxDropdownFilterFn | null;

    /**
     * Whether the select is focused.
     * @docs-private
     */
    get focused(): boolean {
        return this._focused || this.panelOpen;
    }

    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void = () => {};

    /** `View -> model callback called when select has been touched` */
    _onTouched = () => {};

    /** @docs-private */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _ngZone: NgZone,
        @Attribute('tabindex') tabIndex: string,
        @Optional() private readonly formFieldComponent: NxFormfieldComponent | null,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
        @Optional() private readonly _dir: Directionality | null,
        @Inject(NX_DROPDOWN_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
        private readonly liveAnnouncer: LiveAnnouncer,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        this.tabIndex = parseInt(tabIndex, 10) || 0;
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

    ngOnInit(): void {
        this._selectionModel = new SelectionModel(this.isMultiSelect);
    }

    ngAfterViewInit(): void {
        this._initKeyManager();
    }

    ngAfterContentInit(): void {
        this._closedDropdownLabel = this._customClosedDropdownLabel?.templateRef || this._defaultClosedDropdownLabel;

        this._selectionModel.changed.pipe(takeUntil(this._destroyed)).subscribe(event => {
            event.added.forEach(({ value }) => {
                this.dropdownItems.filter(option => option.value === value).forEach(option => option.select());
            });

            event.removed.forEach(({ value }) => {
                this.dropdownItems.filter(option => option.value === value).forEach(option => option.deselect());
            });
        });

        if (this._isLazy) {
            this._options.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._initializeSelection();
            });
        } else {
            this.dropdownItems.changes.pipe(startWith<any, any>(null), takeUntil(this._destroyed)).subscribe(() => {
                this._subscribeToOptionChanges();
                this._initializeSelection();
            });
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
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

    private _updateTooltipText() {
        if (!this.trigger) {
            return;
        }
        const [label, icon] = this.trigger.nativeElement.children;
        const { paddingLeft, paddingRight } = getComputedStyle(this.trigger.nativeElement);
        const triggerContentWidth = this.trigger.nativeElement.clientWidth - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10);

        if (triggerContentWidth - icon.offsetWidth < label.scrollWidth) {
            this._tooltipText = this.triggerValue;
        } else {
            this._tooltipText = '';
        }
    }

    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager<NxDropdownItemComponent>(this.dropdownItems)
            .withTypeAhead(500)
            .withHomeAndEnd()
            .withVerticalOrientation()
            .withHorizontalOrientation('ltr')
            .skipPredicate(item => item._hidden || item.disabled);

        this._keyManager.tabOut.pipe(takeUntil(this._closedStream), takeUntil(this._destroyed)).subscribe(() => {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            this.closePanel();
        });

        this._keyManager.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            if (this._panelOpen && this.panel) {
                this._scrollActiveOptionIntoView();
            } else if (!this._panelOpen && !this.isMultiSelect && this._keyManager.activeItem) {
                this._keyManager.activeItem._selectViaInteraction();
            }
        });
    }

    private _initActiveItem() {
        if (!this.isMultiSelect && this._selectionModel.selected[0]) {
            const option = this.dropdownItems.find(o => o.value === this._selectionModel.selected[0].value);

            if (option) {
                this._keyManager.setActiveItem(option);
                this._scrollActiveOptionIntoCenter();
            }
        } else {
            this._keyManager.setFirstItemActive();
        }
    }

    private _subscribeToOptionChanges(): void {
        merge(...this.dropdownItems.map(option => option.onSelectionChange))
            .pipe(takeUntil(this.dropdownItems.changes), takeUntil(this._destroyed))
            .subscribe(event => {
                this._onSelect(event.item, event.isUserInput);
            });

        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        merge(...this.dropdownItems.map(option => option._stateChanges))
            .pipe(takeUntil(this.dropdownItems.changes), takeUntil(this._destroyed))
            .subscribe(() => {
                // defer it for the next cycle to not run in changed after checked errors
                // the combination of dropdown-item notifying parent and when the parent
                // tries to fetch the triggerValue from the child throws these errors
                setTimeout(() => {
                    if (this._panelOpen) {
                        this._initActiveItem();
                    }
                    this._cdr.markForCheck();
                    this.stateChanges.next();
                });
            });
    }

    /** Invoked when an option is clicked. */
    _onSelect(option: NxDropdownItemComponent, isUserInput: boolean, item?: NxDropdownOption): void {
        const wasSelected = this._selectionModel.isSelected(option);
        const selectedOption = item || option;

        if (option.value === null && !this.isMultiSelect) {
            option.deselect();
            this._selectionModel.clear();
            this._propagateChanges(selectedOption.value);
        } else {
            if (option.selected) {
                this._selectionModel.select(selectedOption);
            } else {
                this._selectionModel.deselect(selectedOption);
            }

            if (isUserInput) {
                this._keyManager?.setActiveItem(option);
            }

            if (this.isMultiSelect) {
                this._sortValues();
            }
        }

        const isSelected = this._selectionModel.isSelected(selectedOption);

        if (wasSelected !== isSelected) {
            this._propagateChanges();

            this._tooltipText = '';
            setTimeout(() => {
                this._updateTooltipText();
            });
        }

        this.stateChanges.next();

        if (isUserInput && !this.isMultiSelect && this._panelOpen) {
            this.closePanel();
        }
    }

    private _initializeSelection(): void {
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(() => {
            this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
        });
    }

    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue(value: any | any[]): void {
        if (!this._selectionModel) {
            return;
        }

        this._selectionModel.clear();

        if (this.isMultiSelect && value) {
            if (!Array.isArray(value)) {
                throw getNxDropdownNonArrayValueError();
            }

            value.forEach(v => this._selectValue(v));
            this._sortValues();
        } else {
            this._selectValue(value);
        }

        this._cdr.markForCheck();
    }

    /**
     * Finds and selects and option based on its value.
     */
    private _selectValue(value: any) {
        const filterFn = (o: NxDropdownOption) => {
            try {
                // Treat null as a special reset value.
                return o.value !== null && this.compareWith(o.value, value);
            } catch (error) {
                if (isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        };

        const options = this._isLazy ? this.options : this.dropdownItems.toArray();
        const option = options.find(filterFn);

        if (option) {
            this._selectionModel.select(option);
        }
    }

    /** Emits change event to set the model value. */
    private _propagateChanges(fallbackValue?: any): void {
        let valueToEmit: any = null;

        if (this.isMultiSelect) {
            valueToEmit = this._selectionModel.selected.map(option => option.value);
        } else {
            const selectedOption = this._selectionModel.selected[0];
            valueToEmit = selectedOption ? selectedOption.value : fallbackValue;
        }

        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this.selectionChange.emit(new NxDropdownSelectChange(this, valueToEmit));
        this._cdr.markForCheck();
    }

    /** Sorts the selected values in the selected based on their order in the panel. */
    private _sortValues() {
        if (this.isMultiSelect) {
            const options = this._isLazy ? this.options : this.dropdownItems.toArray();
            this._selectionModel.sort((a, b) => options.findIndex(o => o.value === a.value) - options.findIndex(o => o.value === b.value));
            this.stateChanges.next();
        }
    }

    /** Adds a offset to the overlay position, so the formfield label and the dropdown panel header are vertically aligned. */
    private _updatePosition(): void {
        if (this.formFieldComponent) {
            const panelHeader = this.overlayDir.overlayRef.overlayElement.querySelector('.nx-dropdown__panel-header');
            const offset = getPositionOffset(this._elementRef.nativeElement, this.formFieldComponent.elementRef.nativeElement, panelHeader);
            this._positions = getPositions(this.formFieldComponent.appearance, offset);
        }
    }

    /** Focuses the select element. */
    focus() {
        this._elementRef.nativeElement.focus();
    }

    get overlayOrigin() {
        return this.formFieldComponent ? this.formFieldComponent.getConnectedOverlayOrigin() : this.fallbackOrigin;
    }

    /** Opens the panel of the dropdown. */
    openPanel($event: Event) {
        if (this.disabled || this.readonly || !(this.dropdownItems?.length || this.options?.length) || this._panelOpen) {
            return;
        }

        $event.preventDefault();
        this._panelOpen = true;

        setTimeout(() => {
            this._selectionModel.selected.forEach(selectedOption => {
                const option = this.dropdownItems.find(o => o.value === selectedOption.value);
                if (option) {
                    option._initSelected(true);
                }
            });
            this._initActiveItem();
        });

        this._overlayWidth = this.getOverlayWidth();
        this._cdr.markForCheck();
    }

    private getOverlayWidth() {
        if (this.panelMinWidth === 'trigger') {
            const origin = this.overlayOrigin;
            const ref = origin instanceof CdkOverlayOrigin ? origin.elementRef : origin;
            return ref.nativeElement.getBoundingClientRect().width;
        }
        // Empty string will let the cdk overlay not set a min-width
        return '';
    }

    /** Closes the panel of the dropdown. */
    closePanel() {
        if (this._panelOpen) {
            this._panelOpen = false;
            this._cdr.markForCheck();
            this._onTouched();
            this.openedChange.emit(false);
            // defer the focus if the dropdown triggers actions that detach
            // a template/view from the DOM to prevent changed after checked errors
            this._ngZone.runOutsideAngular(() => {
                setTimeout(() => this.focus());
            });
        }
    }

    private _scrollActiveOptionIntoCenter() {
        if (!this.panelBody) {
            return;
        }
        // reset the scrolltop to make calculation easier
        this.panelBody.nativeElement.scrollTop = 0;

        if (!this.empty) {
            const offset = this._getItemOffset(this._keyManager.activeItem);
            const panelHeight = this.panelBody.nativeElement.offsetHeight;
            const panelRect = this.panelBody.nativeElement.getBoundingClientRect();
            const middleOfPanel = panelRect.top + panelHeight / 2;

            if (offset > middleOfPanel) {
                // because we reset the scrollTop to 0 at the top we can simply take the middleOfPanel which is our
                // target position for the item and subtract it from the offset (which is now always relative to the viewport)
                this.panelBody.nativeElement.scrollTop = offset - middleOfPanel;
            }
        }
    }

    /** Scrolls the active option into view. */
    private _scrollActiveOptionIntoView(): void {
        if (!this.panelBody || !this.panelOpen || !this._keyManager.activeItem) {
            return;
        }

        const activeItem = this._keyManager.activeItem.containerElement.nativeElement;
        this.liveAnnouncer.announce(activeItem.textContent); // force screen reader to speak active option
        const panel = this.panelBody.nativeElement;
        const panelOffset = panel.offsetTop; // how much the overlay is repositioned on the page
        const panelTopScrollPosition = panel.scrollTop;
        const panelHeight = panel.clientHeight;
        const itemTop = activeItem.offsetTop - panelOffset;
        const itemBottom = activeItem.offsetTop - panelOffset + activeItem.getBoundingClientRect().height;

        // item half or less visible on top
        if (itemTop < panelTopScrollPosition) {
            this.panelBody.nativeElement.scrollTop = itemTop;
            // item half or less visible on bottom
        } else if (itemBottom > panelTopScrollPosition + panelHeight) {
            this.panelBody.nativeElement.scrollTop = itemBottom - panelHeight;
        }
    }

    private _getItemOffset(item: NxDropdownItemComponent | null): number {
        if (!item) {
            return 0;
        }

        const itemRect = item.containerElement.nativeElement.getBoundingClientRect();
        return itemRect.top + itemRect.height / 2; // get position of the item's center
    }

    /**
     * Formfield implementation.
     * @docs-private
     */
    setDescribedByIds(ids: string[]): void {
        this.ariaDescribedby = ids.join(' ');
    }

    /**
     * Support for aria-label removed in favor of aria-labelledby
     * The NxFormfieldControl abstract class requires implementation
     * of below method.
     * @docs-private
     */
    setAriaLabel(value: string) {
        return value;
    }

    /**
     * Returns html ids of dropdown rendered value and label (if available),
     * separated by space.
     * @docs-private
     */
    _getAriaLabelledBy(): string {
        const valueId = this.renderedValueId;
        const labelId = this.formFieldComponent?.labelId;
        if (labelId) {
            return labelId;
        }
        return valueId;
    }

    get _isInOutlineField(): boolean {
        return this.formFieldComponent !== null && this.formFieldComponent.appearance === 'outline';
    }

    /**
     * Whether the select has a value.
     * @docs-private
     */
    get empty(): boolean {
        return !this._selectionModel || this._selectionModel.isEmpty();
    }

    /** @docs-private */
    get hasValue() {
        return this._selectionModel.hasValue();
    }

    /** @docs-private */
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty || !!(this.placeholder && this.placeholder.length > 0);
    }
    /** End Formfield */

    /** ControlValueAccessor */
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * Function `setTimeout()` allows to write value after ngOnInit (happens before it right now),
     * so that we have the input `options` set, and it's shown properly in the dropdown
     * https://github.com/angular/angular/issues/29218#issuecomment-592015773
     * It can be removed after the Angular issue is resolved
     * @param value New value to be written to the model.
     */
    writeValue(value: any): void {
        Promise.resolve().then(() => {
            this._setSelectionByValue(value);
        });
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
        this.stateChanges.next();
    }
    /** End ControlValueAccessor */

    _handleKeydown(event: KeyboardEvent) {
        this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }

    private get _isLazy(): boolean {
        return Array.isArray(this.options);
    }

    private setNextItemActive() {
        const options = this._isLazy ? this.options : this.dropdownItems.toArray();
        let curIndex = options.indexOf(this._selectionModel.selected[0] as NxDropdownItemComponent);
        for (curIndex++; curIndex < options.length; curIndex++) {
            if (this._isSelectable(options[curIndex] as NxDropdownItemComponent, this._isLazy)) {
                this._selectionModel.select(options[curIndex]);
                this.liveAnnouncer.announce(options[curIndex].label || '');
                this._propagateChanges();
                return;
            }
        }
    }

    private setPreviousItemActive() {
        const options = this._isLazy ? this.options : this.dropdownItems.toArray();
        let curIndex = options.indexOf(this._selectionModel.selected[0] as NxDropdownItemComponent);
        for (curIndex--; curIndex >= 0; curIndex--) {
            if (this._isSelectable(options[curIndex] as NxDropdownItemComponent, this._isLazy)) {
                this._selectionModel.select(options[curIndex]);
                this.liveAnnouncer.announce(options[curIndex].label || '');
                this._propagateChanges();
                return;
            }
        }
    }

    private _isSelectable(option: NxDropdownItemComponent, isLazy?: boolean) {
        return isLazy || (option && !option?.disabled && !option.selected);
    }

    private _handleClosedKeydown(event: KeyboardEvent) {
        if (this.disabled || this.readonly) {
            event.preventDefault();
            return;
        }

        // TODO use event.code after removing IE11 support
        const keyCode = event.keyCode;
        const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isOpenKey = keyCode === ENTER || keyCode === SPACE;

        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.isMultiSelect || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.openPanel(event);
        } else if (!this.isMultiSelect) {
            switch (keyCode) {
                case DOWN_ARROW:
                    this.setNextItemActive();
                    event.preventDefault();
                    break;
                case UP_ARROW:
                    this.setPreviousItemActive();
                    event.preventDefault();
                    break;
                default:
                    this._keyManager.onKeydown(event);
            }
        }
    }

    private _handleOpenKeydown(event: KeyboardEvent) {
        // TODO use event.code after removing IE11 support
        const keyCode = event.keyCode;
        // if has filter all events other than the listed ones should be ignored or handled in _onFilter()
        if (![DOWN_ARROW, UP_ARROW, HOME, END, ENTER, LEFT_ARROW, RIGHT_ARROW, SHIFT, SPACE, TAB].includes(keyCode) && this.showFilter) {
            return;
        }

        const isUpDown = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
        const isLeftRight = keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
        const isHomeEnd = keyCode === HOME || keyCode === END;
        const manager = this._keyManager;

        const allHidden = this.dropdownItems.map(option => option._hidden).every(option => Boolean(option));

        // navigate filter input field
        if ((isLeftRight || isHomeEnd) && this.showFilter) {
            return;
        }

        if (isHomeEnd) {
            event.preventDefault();
            keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
        } else if (isUpDown && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.closePanel();
        } else if (keyCode === ENTER && manager.activeItem && !allHidden) {
            event.preventDefault();

            manager.activeItem._selectViaInteraction();
        } else if (keyCode === ENTER && allHidden) {
            event.preventDefault();

            this.closePanel();
        } else if (!this.showFilter && keyCode === SPACE && manager.activeItem) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
        } else if (keyCode === TAB) {
            this.closePanel();
        } else {
            const previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);

            if (this.isMultiSelect && isUpDown && event.shiftKey && manager.activeItem && manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    }

    /** @docs-private */
    formatValue(value: any): string {
        return this.valueFormatter(value);
    }

    /** Called when the user types in the filter input */
    _onFilter(event: Event) {
        event.preventDefault();
        this.currentFilter = (event.target as HTMLInputElement).value;
        this.filterChanges.next((event.target as HTMLInputElement).value);
        const allHidden = this.dropdownItems.toArray().every(option => option._hidden);
        if (allHidden) {
            // @ts-expect-error: not possible according to TS, but has been working already
            this._keyManager.setActiveItem(null);
        } else {
            this._keyManager.setFirstItemActive();
        }

        const visibleItems = this.dropdownItems.filter(option => !option._hidden);
        this.filterResultChange.next(visibleItems);
    }

    /**
     * The value displayed in the trigger.
     * @docs-private
     */
    get triggerValue(): string {
        if (this.empty) {
            return '';
        }

        if (this.isMultiSelect) {
            return this._selectionModel.selected.map(option => this._getLabel(option)).join(', ');
        }
        return this._getLabel(this._selectionModel.selected[0]);
    }

    _getLabel(option: NxDropdownOption) {
        return option.label || this.formatValue(option.value);
    }

    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    _onAttached(): void {
        this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
            const overlayRef = this.overlayDir.overlayRef;
            const positionStrategy = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;

            this._updatePosition();
            positionStrategy.withPositions(this._positions);
            overlayRef.updatePosition();

            this._cdr.markForCheck();
            this.openedChange.emit(true);

            if (this.showFilter) {
                this.filterInput?.nativeElement.focus();
            } else {
                this.panelBody?.nativeElement.focus();
            }
        });
    }

    _onFocus() {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    }

    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur() {
        this._focused = false;

        if (this.filterInput && this.showFilter) {
            this._clearFilter();
        }

        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._cdr.markForCheck();
            this.focusOut.emit(true);
            this.stateChanges.next();
        }
    }

    /** @docs-private */
    get isFilterEmpty() {
        return this.currentFilter.length === 0;
    }

    _clearFilter() {
        if (!this.filterInput) {
            return;
        }
        this.filterInput.nativeElement.value = '';
        this.currentFilter = '';
        this.filterChanges.next('');
    }

    /** Determines the `aria-activedescendant` to be set on the host. */
    _getAriaActiveDescendant(): string | null {
        if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
            return this._keyManager.activeItem.id;
        }

        return null;
    }
}
