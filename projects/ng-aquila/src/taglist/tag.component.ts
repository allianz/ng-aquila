import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { BACKSPACE, DELETE, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
    selector: 'nx-tag',
    templateUrl: 'tag.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['tag.component.scss'],
    host: {
        '(click)': 'tagClickHandler()',
        '(keydown)': 'removeKeyHandler($event)',
        '[attr.tabindex]': 'tabindex',
    },
})
export class NxTagComponent implements OnDestroy {
    private _removable!: boolean;

    /** Whether the tag is removeable. */
    @Input()
    set removable(value: BooleanInput) {
        this._removable = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get removable() {
        return this._removable;
    }

    private _tabindex = -1;
    /**
     * Sets the tab-index of a tag. Default value: -1.
     *
     * If `allowTagDeletion` of the taglist is set to true, the default value is 0.
     */
    @Input()
    set tabindex(value: NumberInput) {
        this._tabindex = coerceNumberProperty(value);
        this._cdr.markForCheck();
    }
    get tabindex(): number {
        return this.removable ? 0 : this._tabindex;
    }

    private _value!: string;
    /** Sets the value of the tag. */
    @Input()
    set value(value: string) {
        if (this._value !== value) {
            this._value = value;
            this._cdr.markForCheck();
        }
    }
    get value(): string {
        return this._value;
    }

    /** An event is dispatched each time when the tag is clicked. */
    @Output() readonly clicked = new EventEmitter<any>();

    /** An event is dispatched each time when the tag is removed. */
    @Output() readonly removed = new EventEmitter<any>();

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    /** @docs-private */
    // Emit the removed event that the parent can remove the value
    removeClickHandler(event: MouseEvent) {
        event.stopPropagation();
        this.removed.emit(this.value);
    }

    /** @docs-private */
    removeKeyHandler(event: KeyboardEvent) {
        if (this.removable && (event.keyCode === DELETE || event.keyCode === BACKSPACE)) {
            event.preventDefault();
            event.stopPropagation();
            this.removed.emit(this.value);
        }

        if (event.keyCode === ENTER) {
            this.clicked.emit(this.value);
        }
    }

    /** @docs-private */
    tagClickHandler() {
        this.clicked.emit(this.value);
    }
}
