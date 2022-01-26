/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy, RepositionScrollStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    EventEmitter,
    Inject,
    Injectable,
    InjectionToken,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { NxDateAdapter } from '../adapter/date-adapter';
import { NxDatefieldDirective } from '../datefield.directive';
import { NxCalendarComponent } from './calendar';
import { createMissingDateImplError } from './datepicker-errors';
import { NxDatepickerIntl } from './datepicker-intl';
import { NxDatepickerToggleComponent } from './datepicker-toggle';

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;

/** Injection token that determines the scroll handling while the calendar is open. */
export const NX_DATEPICKER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-datepicker-scroll-strategy');

/** @docs-private */
export function NX_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => RepositionScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_DATEPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: NX_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Injectable()
export class DatepickerDefaultOptions {
    /**
     * Stream that emits whenever the default options are changed. Use this to notify
     * components if the default options have changed after initialization.
     */
    changes?: Subject<void>;

    /** Sets the focus on toggle behavior. (optional) */
    toggleIconTabindex?: number;
}

export const DATEPICKER_DEFAULT_OPTIONS = new InjectionToken<DatepickerDefaultOptions>('DATEPICKER_DEFAULT_OPTIONS');

/**
 * @docs-private
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * NxCalendarComponent directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 */
@Component({
    selector: 'nx-datepicker-content',
    templateUrl: 'datepicker-content.component.html',
    styleUrls: ['datepicker-content.component.scss'],
    host: {
        class: 'nx-datepicker-content',
    },
    exportAs: 'nxDatepickerContent',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxDatepickerContentComponent<D> implements AfterContentInit {
    datepicker!: NxDatepickerComponent<D>;

    @ViewChild(NxCalendarComponent, { static: true }) _calendar!: NxCalendarComponent<D>;

    constructor(public _intl: NxDatepickerIntl, public elementRef: ElementRef, private _ngZone: NgZone) {}

    ngAfterContentInit() {
        this._focusActiveCell();
    }

    /** Focuses the active cell after the microtask queue is empty. */
    private _focusActiveCell() {
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    this.elementRef.nativeElement.querySelector('.nx-calendar-body-active').focus();
                });
        });
    }
}

/** Component responsible for managing the datepicker popup/dialog. */
@Component({
    selector: 'nx-datepicker',
    template: '',
    exportAs: 'nxDatepicker',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxDatepickerComponent<D> implements OnDestroy {
    /** The date to open the calendar initially. */
    @Input()
    get startAt(): D | null {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    set startAt(value: D | null) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    private _startAt!: D | null;

    /** The view that the calendar should start in. */
    @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

    /**
     * Whether the datepicker pop-up should be disabled.
     * The datepicker is also disabled if the belonging input is readonly.
     */
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined && this._datepickerInput ? this._datepickerInput.disabled || this._datepickerInput.readonly : !!this._disabled;
    }
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    private _disabled!: boolean;

    /** @docs-private */
    selectedChanged: EventEmitter<D> = new EventEmitter<D>();

    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     */
    @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     */
    @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

    /** Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`. */
    @Input() panelClass!: string | string[];

    /** Emits when the datepicker has been opened. */
    @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>();

    /** Emits when the datepicker has been closed. */
    @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>();

    /** Whether the calendar is open. */
    @Input()
    get opened(): boolean {
        return this._opened;
    }
    set opened(value: boolean) {
        value ? this.open() : this.close();
    }
    private _opened = false;

    /**
     * @docs-private
     * The id for the datepicker calendar.
     */
    id = `nx-datepicker-${datepickerUid++}`;

    /**
     * @docs-private
     * The currently selected date.
     */
    get selected(): D | null {
        return this._validSelected;
    }
    set selected(value: D | null) {
        this._validSelected = value;
    }
    private _validSelected: D | null = null;

    /**
     * @docs-private
     * The minimum selectable date.
     */
    get minDate(): D | null {
        return this._datepickerInput?.min;
    }

    /**
     * @docs-private
     * The maximum selectable date.
     */
    get maxDate(): D | null {
        return this._datepickerInput?.max;
    }

    /** @docs-private */
    get dateFilter(): (date: D | null) => boolean {
        return this._datepickerInput?._dateFilter;
    }

    /** A reference to the overlay when the calendar is opened as a popup. */
    private _popupRef!: OverlayRef | null;

    /** A portal containing the calendar for this datepicker. */
    private _calendarPortal!: ComponentPortal<NxDatepickerContentComponent<D>> | null;

    /** Reference to the component instantiated in popup mode. */
    private _popupComponentRef!: ComponentRef<NxDatepickerContentComponent<D>> | null;

    /** The element that was focused before the datepicker was opened. */
    private _focusedElementBeforeOpen: HTMLElement | null = null;

    /** Subscription to value changes in the associated input element. */
    private _inputSubscription = Subscription.EMPTY;

    /** The input element this datepicker is associated with. */
    _datepickerInput!: NxDatefieldDirective<D>;

    _toggleButton!: NxDatepickerToggleComponent<D>;

    _dirChangeSubscription: Subscription;

    /** Emits when the datepicker is disabled. */
    readonly _disabledChange = new Subject<boolean>();

    constructor(
        private _overlay: Overlay,
        private _ngZone: NgZone,
        private _viewContainerRef: ViewContainerRef,
        @Inject(NX_DATEPICKER_SCROLL_STRATEGY) private _scrollStrategy: any,
        @Optional() private _dateAdapter: NxDateAdapter<D>,
        @Optional() private _dir: Directionality,
        @Optional() @Inject(DOCUMENT) private _document: any,
    ) {
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._dirChangeSubscription = this._dir.change.subscribe(() => {
            this.close();
            this._destroyPopup();
        });
    }

    ngOnDestroy() {
        this.close();
        this._inputSubscription.unsubscribe();
        this._dirChangeSubscription.unsubscribe();
        this._disabledChange.complete();

        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupComponentRef = null;
        }
    }

    /**
     * @docs-private
     * Selects the given date
     */
    select(date: D): void {
        const oldValue = this.selected;
        this.selected = date;
        if (!this._dateAdapter.sameDate(oldValue, this.selected)) {
            this.selectedChanged.emit(date);
        }
    }

    /**
     * @docs-private
     * Emits the selected year in multiyear view
     */
    selectYear(normalizedYear: D): void {
        this.yearSelected.emit(normalizedYear);
    }

    /**
     * @docs-private
     * Emits selected month in year view
     */
    selectMonth(normalizedMonth: D): void {
        this.monthSelected.emit(normalizedMonth);
    }

    /**
     * @docs-private
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    registerInput(input: NxDatefieldDirective<D>): void {
        if (this._datepickerInput) {
            throw Error('A NxDatepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription = this._datepickerInput._valueChange.subscribe((value: D | null) => (this.selected = value));
    }

    /**
     * @docs-private
     * Register an input toggle with this datepicker.
     */
    registerToggle(toggle: NxDatepickerToggleComponent<D>) {
        if (this._toggleButton) {
            throw Error('A NxDatepicker can only be associated with a single toggle button.');
        }
        this._toggleButton = toggle;
    }

    /**
     * @docs-private
     * Open the calendar.
     */
    open(): void {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error('Attempted to open an NxDatepicker with no associated input.');
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }

        this._openAsPopup();

        this._opened = true;
        this.openedStream.emit();
    }

    /**
     * @docs-private
     * Close the calendar.
     */
    close(): void {
        if (!this._opened) {
            return;
        }

        if (this._popupRef?.hasAttached()) {
            this._popupRef.detach();
        }

        if (this._calendarPortal?.isAttached) {
            this._calendarPortal.detach();
        }

        const completeClose = () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        };

        if (this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        } else {
            completeClose();
        }

        // if the datepicker toggle button is not focusable, focus the associated input.
        if (this._toggleButton && this._toggleButton.tabindex < 0) {
            this._datepickerInput._focus();
        }
    }

    /** Open the calendar as a popup. */
    private _openAsPopup(): void {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal<NxDatepickerContentComponent<D>>(NxDatepickerContentComponent, this._viewContainerRef);
        }

        if (!this._popupRef) {
            this._createPopup();
        }

        if (!this._popupRef!.hasAttached()) {
            this._popupComponentRef = this._popupRef!.attach(this._calendarPortal);
            this._popupComponentRef.instance.datepicker = this;

            // Update the position once the calendar has rendered.
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    this._popupRef!.updatePosition();
                });
        }
    }

    /** Create the popup. */
    private _createPopup(): void {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'nx-overlay-transparent-backdrop',
            direction: this._dir?.value || 'ltr',
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'nx-datepicker-popup',
        });

        this._popupRef = this._overlay.create(overlayConfig);

        merge(this._popupRef.backdropClick(), this._popupRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))).subscribe(() => this.close());
    }

    /** Destroy popup */
    private _destroyPopup(): void {
        if (this._popupRef) {
            this._popupRef = null;
            this._popupComponentRef = null;
            this._calendarPortal = null;
        }
    }

    /** Create the popup PositionStrategy. */
    private _createPopupPositionStrategy(): PositionStrategy {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.nx-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                },
            ]);
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
