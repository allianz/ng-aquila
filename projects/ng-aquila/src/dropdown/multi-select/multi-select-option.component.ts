import { Highlightable, LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AppearanceType } from '@aposin/ng-aquila/formfield';

let optionId = 0;

/**
 * A single option witin the multi select.
 * @docs-private
 */
@Component({
    selector: 'nx-multi-select-option',
    styleUrls: ['./multi-select-option.component.scss'],
    templateUrl: './multi-select-option.component.html',
    host: {
        role: 'option',
        '[id]': 'id',
        '[attr.aria-selected]': 'selected || null',
        '[attr.aria-disabled]': 'disabled || null',
        '[class.is-outline]': 'appearance === "outline"',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxMultiSelectOptionComponent<T> implements Highlightable {
    private _active = false;

    id = `nx-multi-select-option-${optionId++}`;

    @Input() appearance: AppearanceType = 'auto';

    /**
     * Value of this option.
     */
    @Input() value?: T;

    /**
     * Label of this option.
     */
    @Input() label = '';

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
    @Output() readonly selectedChange = new EventEmitter<boolean>();

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

    @HostListener('click')
    _onClick() {
        if (!this.disabled) {
            this.selected = !this.selected;
            this.selectedChange.emit(this.selected);
            this.liveAnnouncer.announce(`${this.label} ${this.selected ? 'selected' : 'unselected'}`);
        }
    }

    /**
     * Selects this option as if the user clicked on it.
     */
    selectViaInteraction() {
        this._onClick();
        this._cdr.markForCheck();
    }
}
