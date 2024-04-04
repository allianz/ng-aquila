import { ActiveDescendantKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, ConnectionPositionPair, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { AppearanceType, NxFormfieldComponent, NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { NxDropdownIntl } from '../dropdown';
import { getPositionOffset, getPositions } from '../dropdown-position';
import { NxMultiSelectAllComponent } from './multi-select-all.component';
import { NxMultiSelectOptionComponent } from './multi-select-option.component';

let id = 0;

const OVERLAY_MIN_WIDTH = 260;

export type NxMultiSelectFilterFn = (query: string, label: string) => boolean;

const _defaultFilterFn: NxMultiSelectFilterFn = (query, label) => label.toLowerCase().includes(query.toLowerCase());

/**
 * Multi Select component.
 * @typeParam S Type of the items in the options array
 * @typeParam T Type of the ngModel value
 */
@Component({
    selector: 'nx-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss'],
    providers: [{ provide: NxFormfieldControl, useExisting: NxMultiSelectComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-readonly]': 'readonly',
        '[attr.readonly]': 'readonly || null',
    },
})
export class NxMultiSelectComponent<S, T> implements ControlValueAccessor, NxFormfieldControl<T[]>, DoCheck, OnDestroy, AfterViewInit {
    get value(): T[] {
        return this.options.filter(option => this.selectedItems.has(option)).map(option => this._selectValue(option));
    }

    get _isOutline() {
        return this._appearance === 'outline';
    }

    get _appearance(): AppearanceType {
        return this._formFieldComponent?.appearance as unknown as AppearanceType; // TODO this is not ideal
    }

    get _overlayLabel(): string | null | undefined {
        return this._formFieldComponent?.label;
    }

    /**
     * Whether the value is empty.
     */
    get empty(): boolean {
        return this.selectedItems.size === 0;
    }

    get focused(): boolean {
        return this._isOpen || this._inputFocused;
    }

    // @Input()
    // selectValue(value: string | () )

    @Input() set required(value: boolean) {
        this._required = value;
    }
    get required() {
        return this._required;
    }
    private _required = false;

    /** Whether the multi select is disabled. */
    @Input() set disabled(value: boolean) {
        this._disabled = value;
    }
    get disabled() {
        return this._disabled;
    }
    private _disabled = false;

    /** Whether the multi select should be read only. */
    @Input() set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get readonly(): boolean {
        return this._readonly;
    }
    private _readonly = false;

    /** The placeholder shown in the multi select field. */
    @Input() set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get placeholder() {
        return this._placeholder;
    }
    private _placeholder = '';

    /**
     * Whether this multi select can be filtered.
     */
    @Input() set filter(value: BooleanInput) {
        this._filter = coerceBooleanProperty(value);
    }
    get filter(): boolean {
        return this._filter;
    }
    private _filter = false;

    /** Whether the (select all / clear all) should be disabled and hidden. */
    @Input() set disableSelectAll(value: BooleanInput) {
        const coercedValue = coerceBooleanProperty(value);
        if (this.#disableSelectAll !== coercedValue) {
            this.#disableSelectAll = coercedValue;
            this._cdr.markForCheck();
        }
    }
    get disableSelectAll(): boolean {
        return this.#disableSelectAll;
    }
    #disableSelectAll = false;

    /**
     * Function to be used when the user types into the search filter. The first argument is the user input,
     * the second argument is the dropdown item value as displayed. The dropdown items will use this function
     * to set their visibility state. A boolean should be returned.
     *
     * Defaults to lower case inclusion.
     */
    @Input() set filterFn(value: NxMultiSelectFilterFn | null | undefined) {
        this.#filterFn = value;
    }
    get filterFn(): NxMultiSelectFilterFn {
        return this.#filterFn ?? _defaultFilterFn;
    }
    #filterFn?: NxMultiSelectFilterFn | null;

    /** @docs-private */
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty || !!(this.placeholder && this.placeholder.length > 0);
    }

    /** @docs-private */
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    get _allSelected(): boolean {
        return this.selectedItems.size === this.options.filter(option => !this._isDisabled(option)).length;
    }

    get _someSelected(): boolean {
        return this.selectedItems.size > 0 && !this._allSelected;
    }

    private get _isActiveItemFiltered(): boolean {
        return (
            typeof this._keyManager.activeItem !== 'undefined' &&
            !this.listItems.some(option => this._selectValue(option) === this._keyManager.activeItem?.value)
        );
    }

    @ViewChildren('selectAllCheckbox,option') private _options!: QueryList<NxMultiSelectAllComponent<T> | NxMultiSelectOptionComponent<T>>;

    /** Event emitted when the select panel has been toggled. */
    @Output() readonly openedChange = new EventEmitter<boolean>();

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

    private _openedBy: FocusOrigin = 'mouse';

    /** @docs-private */
    _divider = 0;

    @ViewChild('trigger') private _trigger?: ElementRef;
    @ViewChild('filterInput') private _filterInput?: ElementRef;
    @ViewChild('itemsList') private _optionsList?: ElementRef;
    @ViewChild('panelHeader') private _panelHeader?: ElementRef;
    @ViewChild('panelContent') private _panelContent?: ElementRef;

    @ViewChild(CdkConnectedOverlay, { static: true }) private _overlayDir?: CdkConnectedOverlay;

    /** Event emitted when the selected value has been changed. */
    @Output() readonly selectionChange = new EventEmitter<T[]>();

    /** Event emitted when the select panel has been focus out. */
    @Output() readonly focusOut = new EventEmitter<boolean>();

    /** @docs-private */
    readonly controlType: string = 'nx-multi-select';

    /** @docs-private */
    errorState = false;

    _positions: ConnectionPositionPair[] = getPositions('auto', 0);

    _inputFocused = false;

    _ariaDescribedby = '';

    _width = 0;

    _filterValue = '';

    _tooltipText = '';

    listItems: S[] = [];

    selectedItems = new Set<S>();

    id = `nx-multi-select-${id++}`;

    _comboboxId = `${this.id}-combobox`;

    readonly stateChanges = new Subject<any>();

    _keyManager!: ActiveDescendantKeyManager<NxMultiSelectOptionComponent<T> | NxMultiSelectAllComponent<T>>;

    /**
     * List of options to choose from.
     */
    private _option: S[] = [];
    @Input() set options(value: S[]) {
        this._option = value;
        this.writeValue(this.ngControl?.value);
    }
    get options() {
        return this._option;
    }

    /**
     * Placeholder for the filter input.
     */
    @Input() filterPlaceholder = 'Type to filter';

    /**
     * Selector to get the value of an option.
     * Can be either a property name or a selector function.
     * When empty the whole option is treated as the value.
     */
    @Input() selectValue: string | ((option: S) => T) = '';

    /**
     * Selector to get the label of an option.
     * Can be either a property name or a selector function.
     * When empty the whole option is treated as the label.
     */
    @Input() selectLabel: string | ((option: S) => string) = '';

    /**
     * Selector to get the disabled state of an option.
     * Can be either a property name or a selector function.
     */
    @Input() selectDisabled?: string | ((option: S) => boolean);

    @HostBinding('class.is-open') _isOpen = false;

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly _intl: NxDropdownIntl,
        private readonly _elementRef: ElementRef,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly _formFieldComponent: NxFormfieldComponent | null,
        @Optional() @Self() readonly ngControl: NgControl | null,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
        this._isDisabled = this._isDisabled.bind(this);

        _intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => _cdr.markForCheck());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdr.markForCheck();
        this.stateChanges.next();
    }

    private _onChange: (value: T[]) => void = () => {};

    private _onTouched: () => void = () => {};

    private sortSelectedToTop = (a: S, b: S) => {
        const aSelected = this.selectedItems.has(a);
        const bSelected = this.selectedItems.has(b);
        if (aSelected && !bSelected) {
            return -1;
        } else if (!aSelected && bSelected) {
            return 1;
        }
        return 0;
    };

    _selectValue(option: S): T {
        if (!this.selectValue) {
            return option as unknown as T;
        }

        if (typeof this.selectValue === 'string') {
            return (option as any)[this.selectValue] as T;
        }

        return this.selectValue(option);
    }

    _selectLabel(option: S): string {
        if (!this.selectLabel) {
            return String(this._selectValue(option));
        }

        if (typeof this.selectLabel === 'string') {
            return String((option as any)[this.selectLabel]);
        }

        return this.selectLabel(option);
    }

    private _updatePositions() {
        if (this._formFieldComponent) {
            const offset = getPositionOffset(
                this._elementRef.nativeElement,
                this._formFieldComponent.elementRef.nativeElement,
                this._panelHeader?.nativeElement,
            );
            this._positions = getPositions(this._appearance, offset);
        }
    }

    _isDisabled(option: S): boolean {
        if (typeof this.selectDisabled === 'string') {
            return (option as any)[this.selectDisabled];
        }

        if (typeof this.selectDisabled === 'function') {
            return this.selectDisabled(option);
        }

        return false;
    }

    /**
     * Returns html ids of multi select rendered value and label (if available),
     * separated by space.
     */
    _getAriaLabelledBy(): string {
        const valueId = this.id;
        const labelId = this._formFieldComponent?.labelId;

        if (labelId) {
            return `${valueId} ${labelId}`;
        }
        return valueId;
    }

    /** @docs-private */
    setDescribedByIds(ids: string[]): void {
        this._ariaDescribedby = ids.join(' ');
    }

    ngAfterViewInit(): void {
        this._initKeyManager();
    }

    open($event: Event, origin: FocusOrigin) {
        this._open($event, origin);
    }

    _open($event: Event, origin: FocusOrigin) {
        if (this._isOpen || this.disabled || this.readonly) {
            return;
        }

        $event.preventDefault();
        this._filterValue = '';
        this._width = Math.max(OVERLAY_MIN_WIDTH, this._trigger?.nativeElement.getBoundingClientRect().width);
        this._isOpen = true;
        this.listItems = this.options.slice().sort(this.sortSelectedToTop);
        this._divider = this.selectedItems.size - 1;
        this._openedBy = origin;
        this._cdr.markForCheck();
    }

    _close() {
        this._isOpen = false;
        this.openedChange.emit(false);
        this._updateTooltipText();
        this._trigger?.nativeElement.focus();
    }

    _onSelect(item: S, selected: boolean) {
        if (selected) {
            this.selectedItems.add(item);
        } else {
            this.selectedItems.delete(item);
        }
        this._onChange(this.value);
        this.selectionChange.emit(this.value);
    }

    _onKeydown($event: KeyboardEvent) {
        if (this.disabled || this.readonly) {
            return;
        }

        const altKey = $event.altKey;
        const key = $event.key;

        const isArrowKey = key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight';

        if (!this._isOpen) {
            if (altKey && isArrowKey) {
                this._open($event, 'keyboard');
                $event.preventDefault();
            }
        } else {
            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Home' || key === 'End') {
                this._keyManager.onKeydown($event);
                this._scrollActiveOptionIntoView();
                $event.preventDefault();
            }

            if ((window.navigator.platform.match('Mac') ? $event.metaKey : $event.ctrlKey) && key === 'a') {
                this._onSelectAll();
                $event.preventDefault();
            }

            if (key === 'Tab') {
                this._keyManager.onKeydown($event);
            }

            if (key === 'Enter' || (this._filterValue.trim() === '' && key === ' ')) {
                this._keyManager.activeItem?.selectViaInteraction();
                $event.preventDefault();
            }
        }
    }

    _onTriggerBlur() {
        if (!this._isOpen && !this.disabled && !this.readonly) {
            this._onTouched();
            this.focusOut.emit(true);
        }
    }

    _onFocusWithinOverlay($event: Event) {
        // Keeps focus on the filter when clicking around in the overlay
        if (this._filterInput && $event.target !== this._filterInput.nativeElement) {
            this._filterInput.nativeElement.focus();
        }
    }

    _getAriaActiveDescendant(): string | null {
        if (this._keyManager.activeItem) {
            return this._keyManager.activeItem.id;
        }

        return null;
    }

    _onFilterChange(query: string | null | undefined) {
        if (query) {
            this.listItems = [...this.options].sort(this.sortSelectedToTop).filter(item => this.filterFn(query, this._selectLabel(item)));
        } else {
            this.listItems = [...this.options].sort(this.sortSelectedToTop).slice();
        }

        this._divider = this.listItems.filter(element => this.selectedItems.has(element)).length - 1;

        if (this._isActiveItemFiltered) {
            setTimeout(() => {
                this._keyManager.setActiveItem(1);
            });
        }

        this._optionsList?.nativeElement.scrollTo(0, 0);
    }

    _getValueText() {
        return this.options
            .filter(option => this.selectedItems.has(option))
            .map(option => this._selectLabel(option))
            .join(', ');
    }

    _onAttach() {
        this._overlayDir?.positionChange.pipe(take(1)).subscribe(() => {
            const overlayRef = this._overlayDir!.overlayRef;
            const positionStrategy = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;

            this._updatePositions();
            positionStrategy.withPositions(this._positions);
            overlayRef.updatePosition();

            this._filterInput?.nativeElement.focus();
            this._panelContent?.nativeElement.focus();

            if (this._openedBy === 'keyboard') {
                this._keyManager.setActiveItem(1);
                this._scrollActiveOptionIntoView();
            }
            this.openedChange.emit(true);
            this._cdr.markForCheck();
        });
    }

    _onDetach() {
        this._close();
    }

    _onSelectAll() {
        if (this._filterValue) {
            const filterList = this.listItems.filter(option => !this._isDisabled(option));
            const isSelectAll = filterList.every(option => this.selectedItems.has(option));
            if (isSelectAll) {
                filterList.forEach(option => this.selectedItems.delete(option));
            } else {
                filterList.forEach(option => this.selectedItems.add(option));
            }
        } else if (this._allSelected) {
            this.selectedItems.clear();
        } else {
            this.listItems.filter(option => !this._isDisabled(option)).forEach(option => this.selectedItems.add(option));
        }
        this._onChange(this.value);
        this.selectionChange.emit(this.value);
    }

    _clear() {
        this.selectedItems.clear();
        this._onChange(this.value);
        this.selectionChange.emit(this.value);
    }

    _clearFilter() {
        this._filterValue = '';
        this._onFilterChange(this._filterValue);
    }

    writeValue(value: T[]): void {
        setTimeout(() => {
            this.selectedItems.clear();

            if (Array.isArray(value)) {
                for (const item of value) {
                    const selectedItem = this.options.find(option => this._selectValue(option) === item);
                    if (selectedItem) {
                        this.selectedItems.add(selectedItem);
                    } else {
                        console.warn('NxMultiSelect: Model contains value that does not exist in given options', item);
                    }
                }
            }
            this._updateTooltipText();
            this._cdr.markForCheck();
        });
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }

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
        if (!this._trigger) {
            return;
        }

        const [label, suffix, icon] = this._trigger.nativeElement.children;
        const { paddingLeft, paddingRight } = getComputedStyle(this._trigger.nativeElement);
        const triggerContentWidth = this._trigger.nativeElement.clientWidth - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10);

        if (triggerContentWidth - suffix.offsetWidth - icon.offsetWidth < label.scrollWidth) {
            this._tooltipText = this._getValueText();
        } else {
            this._tooltipText = '';
        }
    }

    private _scrollActiveOptionIntoView() {
        if (!this._keyManager.activeItem) {
            return;
        }

        const activeItem = this._keyManager.activeItem.elementRef.nativeElement;
        const list = this._optionsList?.nativeElement;
        const listTopScrollPosition = list.scrollTop;
        const listHeight = list.clientHeight;
        const itemTop = activeItem.offsetTop;
        const itemBottom = activeItem.offsetTop + activeItem.offsetHeight;

        // item half or less visible on top
        if (itemTop < listTopScrollPosition) {
            list.scrollTop = itemTop;
            // item half or less visible on bottom
        } else if (itemBottom > listTopScrollPosition + listHeight) {
            list.scrollTop = itemBottom - listHeight;
        }
    }

    private _initKeyManager() {
        this._keyManager = new ActiveDescendantKeyManager<NxMultiSelectAllComponent<T> | NxMultiSelectOptionComponent<T>>(this._options)
            .withHomeAndEnd()
            .withVerticalOrientation()
            .withHorizontalOrientation('ltr')
            .skipPredicate(item => item?.disabled);

        this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => this._close());
    }
}
