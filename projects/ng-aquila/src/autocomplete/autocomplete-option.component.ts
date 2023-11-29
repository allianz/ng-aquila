import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

/** Option selected event */
export class NxAutocompleteOptionSelected {
    constructor(
        /** The option that is selected or deselected. */
        readonly source: NxAutocompleteOptionComponent,
        /** Whether the input was triggered by the user. */
        readonly isUserInput = false,
    ) {}
}

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;

@Component({
    selector: 'nx-autocomplete-option',
    templateUrl: 'autocomplete-option.component.html',
    styleUrls: ['autocomplete-option.component.scss'],
    host: {
        role: 'option',
        '[attr.tabindex]': '_getTabIndex()',
        '[id]': 'id',
        '[attr.aria-selected]': 'selected.toString()',
        '[attr.aria-disabled]': 'disabled.toString()',
        '(click)': '_selectViaInteraction()',
        '(keydown)': '_handleKeydown($event)',
        '[class.nx-active]': 'active',
        '[class.nx-disabled]': 'disabled',
        '[style.display]': '"block"', // needed for to be able to calculate offset height
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxAutocompleteOptionComponent {
    /** Id of the autocomplete option. By default it is set to an incremented value. */
    get id(): string {
        return this._id;
    }
    private readonly _id = `nx-autocomplete-option-${_uniqueIdCounter++}`;

    /** Whether or not the option is currently selected. */
    get selected(): boolean {
        return this._selected;
    }
    private _selected = false;

    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    get active(): boolean {
        return this._active;
    }
    private _active = false;

    /** Whether the option is disabled. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._disabled !== newValue) {
            this._disabled = newValue;
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** The value of the autocomplete option. */
    @Input() value: any;

    /** Event emitted when the option is selected or deselected. */
    @Output() readonly onSelectionChange = new EventEmitter<NxAutocompleteOptionSelected>();

    constructor(
        /** @docs-private */ readonly elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event: KeyboardEvent): void {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this._selectViaInteraction();

            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    }

    /**
     * Selects the option while indicating the selection came from the user.
     *
     * Used to determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction(): void {
        if (!this.disabled) {
            this._selected = true;
            this._cdr.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    }

    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string {
        return this.disabled ? '-1' : '0';
    }

    /** Emits the selection change event. */
    private _emitSelectionChangeEvent(isUserInput = false): void {
        this.onSelectionChange.emit(new NxAutocompleteOptionSelected(this, isUserInput));
    }

    /** @docs-private */
    get viewValue(): string {
        return (this.elementRef.nativeElement.textContent || '').trim();
    }

    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @docs-private
     */
    setActiveStyles(): void {
        if (!this._active) {
            this._active = true;
            this._cdr.markForCheck();
        }
    }

    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     * @docs-private
     */
    setInactiveStyles(): void {
        if (this._active) {
            this._active = false;
            this._cdr.markForCheck();
        }
    }

    /**
     * Gets the label to be used when determining whether the option should be focused.
     * @docs-private
     */
    getLabel(): string {
        return this.viewValue;
    }

    /** Selects the option. */
    select(): void {
        this._selected = true;
        this._cdr.markForCheck();
        this._emitSelectionChangeEvent();
    }

    /** Deselects the option. */
    deselect(): void {
        this._selected = false;
        this._cdr.markForCheck();
        this._emitSelectionChangeEvent();
    }

    /**
     * Sets focus onto this option.
     * @docs-private
     */
    focus(): void {
        const element = this.elementRef.nativeElement;

        if (typeof element.focus === 'function') {
            element.focus();
        }
    }
}
