import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, ElementRef } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter } from '@angular/core';
import { SPACE } from '@angular/cdk/keycodes';

/**
 * This is a table row.
 */
@Component({
    selector: 'tr[nxTableRow]',
    host: {
        class: 'nx-table-row',
        '[class.is-selected]': 'selected',
        '[class.nx-table-row--selectable]': 'selectable',
        '[attr.aria-selected]': 'selected',
        '(click)': '_onSelect($event)',
        '(keydown.space)': '_onSelect($event)',
    },
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTableRowComponent {
    /** Whether this table row is selectable */
    @Input()
    set selectable(value: boolean) {
        this._selectable = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get selectable(): boolean {
        return this._selectable;
    }
    private _selectable: boolean = false;

    /** Whether this table row is selected */
    @Input()
    set selected(value: boolean) {
        this._selected = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get selected(): boolean {
        return this._selected;
    }
    private _selected: boolean = false;

    @Output()
    select: EventEmitter<void> = new EventEmitter();

    constructor(protected _changeDetectorRef: ChangeDetectorRef, private _elementRef: ElementRef) {}

    _onSelect($event: KeyboardEvent) {
        if (!this._selectable || this.isActionEvent($event)) {
            return;
        }

        if ($event.keyCode === SPACE) {
            $event.preventDefault();
        }

        this.select.emit();
    }

    /**
     * Checks if the event would trigger an action.
     * Return `true` if a button, link, input or label are clicked.
     */
    private isActionEvent($event: Event) {
        let parent: HTMLElement = $event.target as HTMLElement;

        while (parent && parent !== this._elementRef.nativeElement) {
            if (['A', 'INPUT', 'BUTTON', 'TEXTAREA'].indexOf(parent.tagName) >= 0) {
                return true;
            } else if (parent.tagName === 'LABEL' && parent.getAttribute('for')) {
                return true;
            }

            parent = parent.parentElement as HTMLElement;
        }

        return false;
    }

    static ngAcceptInputType_selectable: BooleanInput;
    static ngAcceptInputType_selected: BooleanInput;
}
