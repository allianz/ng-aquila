import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxRadioToggleComponent } from './radio-toggle.component';
import { NxRadioToggleButtonBaseComponent } from './radio-toggle-button-base.component';

/** @docs-private */
export class NxRadioToggleButtonChange {
    constructor(
        readonly source: NxRadioToggleButtonComponent,
        readonly value: any,
    ) {}
}

@Component({
    selector: 'nx-radio-toggle-button',
    styleUrls: ['radio-toggle-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'radio-toggle-button.component.html',
    providers: [
        {
            provide: NxRadioToggleButtonBaseComponent,
            useExisting: forwardRef(() => NxRadioToggleButtonComponent),
        },
    ],
    host: {
        '[class.has-error]': '_controlInvalid() || null',
        '[attr.aria-invalid]': '_controlInvalid() || null',
    },
})
export class NxRadioToggleButtonComponent extends NxRadioToggleButtonBaseComponent implements AfterViewInit, OnDestroy {
    /** @docs-private */
    // emits when the button is checked to notify the group
    readonly onChecked = new Subject<NxRadioToggleButtonChange>();

    /** @docs-private */
    @Input() set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled || this.radioToggle?.disabled;
    }
    private _disabled = false;

    /** Sets the checked state and notify siblings and the parent group about the change */
    // Only use this if you want the onChecked event to be fired, this will inform the parent about the change!
    // To select a button without firing the event use the select() function
    @Input() set selected(value: boolean) {
        if (this._selected !== value) {
            this._selected = value;
            if (this._selected) {
                this._notifySiblings();
                this._emitCheckedEvent();
            }

            this._cdr.markForCheck();
        }
    }
    get selected(): boolean {
        return this._selected;
    }
    private _selected = false;

    private readonly _destroyed = new Subject<void>();

    /** Unregister function for _expansionDispatcher. */
    private _removeUniqueSelectionListener: () => void = () => {};

    constructor(
        @Inject(forwardRef(() => NxRadioToggleComponent)) private readonly radioToggle: NxRadioToggleComponent,
        /** @docs-private */ renderer: Renderer2,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _toggleDispatcher: UniqueSelectionDispatcher,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        super(renderer);

        this._removeUniqueSelectionListener = this._toggleDispatcher.listen((id: string, radioToggleId: string) => {
            if (this.radioToggle && this.radioToggle.id === radioToggleId && this.id !== id) {
                this._selected = false;
                // need to let change detector know in case that the select() function was called on another button
                this._cdr.markForCheck();
            }
        });

        this.radioToggle._disableChange.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this.toggleInput);
    }

    ngOnDestroy(): void {
        this._removeUniqueSelectionListener();
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this.toggleInput);
    }

    /** @docs-private */
    get toggleId(): string {
        return this.radioToggle.id;
    }

    /** @docs-private */
    get id(): string {
        return this.toggleButtonId;
    }

    private _notifySiblings() {
        const toggleId = this.radioToggle ? this.radioToggle.id : this.id;
        this._toggleDispatcher.notify(this.id, toggleId);
    }

    private _emitCheckedEvent() {
        this.onChecked.next(new NxRadioToggleButtonChange(this, this.value));
    }

    // Does NOT emit the onChecked event. Useful when you need to set initial
    // state. Used by the parent to set checked states on initialization and during
    // writeValue() changes.
    /** @docs-private */
    select(): void {
        if (!this._selected) {
            this._selected = true;
            this._notifySiblings();
        }

        this._cdr.markForCheck();
    }

    /** @docs-private */
    deselect() {
        if (this._selected) {
            this._selected = false;
        }

        this._cdr.markForCheck();
    }

    /** @docs-private */
    @HostListener('keyup.space')
    onKeyupSpace(): void {
        this._selected = false;
        this._notifySiblings();
    }

    /** @docs-private */
    _controlInvalid(): boolean {
        return !!this.radioToggle?.errorState;
    }
}
