import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

/**
 * This is a table row.
 */
@Component({
    selector: 'tr[nxTableRow]',
    host: {
        class: 'nx-table-row',
        '[class.is-selected]': 'selected',
        '[class.nx-table-row--selectable]': 'selectable',
        '[class.nx-table-row--sticky]': 'mayStick',
        '[attr.aria-selected]': 'selected',
        '(click)': '_onSelect($event)',
        '(keydown.space)': '_onSelect($event)',
    },
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableRowComponent {
    /** Whether this table row is selectable */
    @Input() set selectable(value: BooleanInput) {
        this._selectable = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get selectable(): boolean {
        return this._selectable;
    }
    private _selectable = false;

    /** Whether this table row is selected */
    @Input() set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get selected(): boolean {
        return this._selected;
    }
    private _selected = false;

    @Output() readonly select = new EventEmitter<void>();

    /** Whether this row is rendered "sticky". Only works for `nxHeaderCell` cells. */
    @Input() set mayStick(value: BooleanInput) {
        this._mayStick = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get mayStick(): boolean {
        return this._mayStick;
    }
    private _mayStick = false;

    constructor(
        protected readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
    ) {}

    _onSelect($event: KeyboardEvent) {
        if (!this._selectable || this.isSelectionPrevented($event)) {
            return;
        }

        if ($event.keyCode === SPACE) {
            $event.preventDefault();
        }

        this.select.emit();
    }

    /**
     * Checks if the event would trigger an action or if default action is prevented.
     * Returns `true` if a button, link, input or label are clicked.
     */
    private isSelectionPrevented($event: Event) {
        if ($event.defaultPrevented) {
            return true;
        }

        let parent: HTMLElement = $event.target as HTMLElement;

        while (parent && parent !== this._elementRef.nativeElement) {
            if (['A', 'INPUT', 'BUTTON', 'TEXTAREA'].includes(parent.tagName)) {
                return true;
            } else if (parent.tagName === 'LABEL' && parent.getAttribute('for')) {
                return true;
            }

            parent = parent.parentElement!;
        }

        return false;
    }
}
