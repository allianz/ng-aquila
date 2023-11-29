import { Highlightable } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxDropdownControl } from '../dropdown.control';
import { NxDropdownGroupComponent } from '../group/dropdown-group';

export class NxDropdownItemChange {
    constructor(
        /** Reference to the option that emitted the event. */
        readonly item: NxDropdownItemComponent,
        /** Whether the change in the option's value was a result of a user action. */
        readonly isUserInput = false,
    ) {}
}

/** The unique id counter */
let nextId = 0;

@Component({
    selector: 'nx-dropdown-item',
    templateUrl: 'dropdown-item.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['dropdown-item.scss'],
    host: {
        '[id]': 'id',
        role: 'option',
        '[attr.tabindex]': '_getTabIndex()',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.aria-selected]': '_getAriaSelected()',
        '[class.nx-hidden]': '_hidden',
        '[class.nx-dropdown-item--active]': 'active',
        '[class.nx-dropdown-item--disabled]': 'disabled',
        '[class.nx-selected]': 'selected',
        '[class.nx-multiselect]': 'multiselect',
        '(click)': '_onClick($event)',
    },
})
export class NxDropdownItemComponent implements Highlightable, OnDestroy, AfterViewChecked {
    _hidden = false;

    private _mostRecentViewValue = '';

    private readonly _id = `nx-dropdown-item-${nextId++}`;

    /**
     * The value of the dropdown item.
     * You can't use undefined, null and '' (empty strings)
     * as they are sentinel values signalling empty data.
     */
    @Input() value: any;

    get label(): string {
        return this._mostRecentViewValue || this.viewValue;
    }

    /** The unique ID of the option. */
    get id(): string {
        return this._id;
    }

    private _disabled = false;

    /** Whether the dropdown item is disabled. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.disabled !== newValue) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
    }

    get disabled(): boolean {
        return this._disabled;
    }

    private _selected = false;

    /** Whether the item is selected. */
    get selected(): boolean {
        return this._selected;
    }

    private _active!: boolean;

    /** Whether the item is active. */
    get active(): boolean {
        return this._active;
    }

    /**
     * Whether the parent dropdown is in multiselect mode.
     * @docs-private
     */
    get multiselect(): boolean {
        return this._dropdown?.isMultiSelect;
    }

    /**
     * Whether the parent dropdown allows item truncation.
     * @docs-private
     */
    get truncateItems(): boolean {
        return !this._dropdown?.ignoreItemTruncation;
    }

    /** Emits whenever the component is destroyed. */
    private readonly _destroyed = new Subject<void>();

    /** Event emitted when the option is selected or deselected. */
    @Output() readonly onSelectionChange = new EventEmitter<NxDropdownItemChange>();

    /** Emits when the state of the option changes and any parents have to be notified. */
    readonly _stateChanges = new Subject<void>();

    /**
     * The wrapping div in the template. Used by dropdown to use the container height for scrolling.
     * @docs-private
     */
    @ViewChild('container', { static: true }) containerElement: any;

    constructor(
        @Inject(NxDropdownControl) private readonly _dropdown: NxDropdownControl,
        /** @docs-private */ @Optional() readonly group: NxDropdownGroupComponent | null,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
    ) {
        this._dropdown.filterChanges.pipe(takeUntil(this._destroyed)).subscribe(value => {
            this._showOrHideByFilter(value);
        });
        // reset the hidden state when dropdown closes that on next open the user is seeing the full list again
        this._dropdown._closedStream.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._hidden = false;
        });
    }

    ngAfterViewChecked(): void {
        // Since the parent dropdown component could be using the item's label to display the selected values
        // and it doesn't have a way of knowing if the item's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        this._updateViewValue();
    }

    private _updateViewValue() {
        if (this._selected) {
            const viewValue = this.viewValue;

            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._stateChanges.complete();
    }

    _onClick(event: Event) {
        /* preventDefault to stop triggering the event twice when you click on the checkbox or the label inside the item */
        event.preventDefault();
        event.stopPropagation();
        this._selectViaInteraction();
    }

    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction(): void {
        if (!this.disabled) {
            this._selected = this.multiselect ? !this._selected : true;
            this._updateViewValue();
            this._cdr.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    }

    /**
     * Gets the `aria-selected` value for the option. The attribute is omitted from the single-select dropdown
     * for the unselected options. Including the `aria-selected="false" attributes adds a lot of of noise to
     * screen-reader users without providing useful information.
     * @docs-private
     */
    _getAriaSelected(): boolean | null {
        return this.multiselect ? this.selected : null;
    }

    /** @docs-private */
    show() {
        this._hidden = false;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    hide() {
        this._hidden = true;
        this._cdr.markForCheck();
    }

    private _showOrHideByFilter(search: string) {
        const constraint = this._dropdown.filterFn(search, this.viewValue);
        this._hidden = !constraint;
        this._cdr.markForCheck();
    }

    get _formattedValue() {
        return this._dropdown.valueFormatter(this.value);
    }

    /** @docs-private */
    get viewValue() {
        return (this._elementRef.nativeElement.textContent || '').trim();
    }

    /** @docs-private */
    get elementRef() {
        return this._elementRef;
    }

    select() {
        if (!this._selected && !this.disabled) {
            this._selected = true;
            this._cdr.markForCheck();
            this._emitSelectionChangeEvent();
        }
    }

    /** @docs-private */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._cdr.markForCheck();
            this._emitSelectionChangeEvent();
        }
    }

    _initSelected(selected: boolean) {
        this._selected = selected;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    focus(): void {
        this._elementRef.nativeElement.focus();
    }

    private _emitSelectionChangeEvent(isUserInput = false) {
        this.onSelectionChange.emit(new NxDropdownItemChange(this, isUserInput));
    }

    /** @docs-private */
    setActiveStyles(): void {
        this._active = true;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    setInactiveStyles(): void {
        this._active = false;
        this._cdr.markForCheck();
    }

    /**
     * Returns the list item's text label. Implemented as a part of the ListKeyManagerOption.
     * @docs-private
     */
    getLabel(): string {
        return this.viewValue;
    }

    _isContentEmpty(element: Element) {
        return element.children.length === 0 && !element.textContent?.trim();
    }

    _onLabelChange() {
        // trigger change detection when the label content changes for the case that ng-content was empty before.
        // this is also important when the label comes in deferred, e.g. by a delayed observable,
        // then first the default label derived from the value is shown
        // and after the value from the async observable is ready we need to trigger change detection that the derived label
        // gets hidden again.
        // Notice(!): the event of (cdkObserveContent) is run outside of the ngZone
        // We run detectChanges directly here as markForCheck wasn't enough to always trigger change detection correctly
        this._cdr.detectChanges();
    }

    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string {
        return this.disabled ? '-1' : '0';
    }
}
