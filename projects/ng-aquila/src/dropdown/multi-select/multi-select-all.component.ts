import { Highlightable, LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

let nextId = 0;

/**
 * A single option witin the multi select.
 * @docs-private
 */
@Component({
    selector: 'nx-multi-select-all',
    styleUrls: ['./multi-select-all.component.scss'],
    templateUrl: './multi-select-all.component.html',
    host: {
        role: 'option',
        '[id]': 'id',
        '[attr.aria-selected]': 'selected || null',
        '[attr.aria-disabled]': 'disabled || null',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxMultiSelectAllComponent<T> implements Highlightable {
    private _active = false;

    id = `nx-multi-select-all-${nextId++}`;

    /**
     * Value of this option.
     */
    @Input() value?: T;

    /**
     * Label of this option.
     */
    @Input() label = '';

    /**
     * Indeterminate
     */
    @Input()
    set indeterminate(value: boolean) {
        this._indeterminate = value;
    }

    get indeterminate() {
        return this._indeterminate;
    }
    _indeterminate = false;

    /**
     * Whether this option is selected.
     */
    @Input() selected = false;

    /**
     * Whether thisoption is disabled.
     */
    @Input() disabled = false;

    /**
     * Emits an event when this option is selected or unselected by the user.
     */
    @Output() readonly selectedAllChange = new EventEmitter<boolean>();

    /**
     * Sets this option active highlighting it to the user.
     */
    set active(value: boolean) {
        this._active = value;
        this._cdr.markForCheck();
    }

    get active() {
        return this._active;
    }

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        private liveAnnouncer: LiveAnnouncer,
    ) {}

    setActiveStyles(): void {
        this.active = true;
    }

    setInactiveStyles(): void {
        this.active = false;
    }

    @HostListener('click', ['$event'])
    _onClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this._onSelect();
    }

    _onSelect() {
        if (!this.disabled) {
            this.selectedAllChange.emit(this.selected);
            this.liveAnnouncer.announce(`${this.label} ${this.selected ? 'selected' : 'unselected'}`);
        }
    }

    /**
     * Selects this option as if the user clicked on it.
     */
    selectViaInteraction() {
        this._onSelect();
        this._cdr.markForCheck();
    }
}
