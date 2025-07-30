/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CdkTrapFocus, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { NgClass } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  input,
  model,
  OnDestroy,
  Optional,
  Output,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NxDateAdapter } from '../adapter/date-adapter';
import { DateRange } from '../date-range/date-range.component';
import { createMissingDateImplError } from '../datefield.functions';
import { NxCalendarComponent } from './calendar';
import { NxDatepickerInputInterface } from './datepicker-input.directive';
import { NxDatepickerIntl } from './datepicker-intl';
import { NxDatepickerToggleComponent } from './datepicker-toggle';

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;

/** Injection token that determines the scroll handling while the calendar is open. */
export const NX_DATEPICKER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'nx-datepicker-scroll-strategy',
  {
    providedIn: 'root',
    factory: () => {
      const overlay = inject(Overlay);
      return () => overlay.scrollStrategies.reposition();
    },
  },
);

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
export function NX_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay,
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
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

export const DATEPICKER_DEFAULT_OPTIONS = new InjectionToken<DatepickerDefaultOptions>(
  'DATEPICKER_DEFAULT_OPTIONS',
);

/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * NxCalendarComponent directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
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
  imports: [CdkTrapFocus, NxIconModule, NxCalendarComponent, NgClass, NxButtonModule],
})
export class NxDatepickerContentComponent<D> implements AfterViewInit, OnDestroy {
  datepicker!: NxDatepickerComponent<D>;

  isRange = computed<boolean>(() => this.datepicker.isRange());

  private _afterNextRenderInitial = afterNextRender({
    read: () => {
      this.elementRef.nativeElement.querySelector('.nx-calendar-body-active').focus();
    },
  });

  @ViewChild(NxCalendarComponent, { static: true }) _calendar!: NxCalendarComponent<D>;
  @ViewChild('closeButton') _closeButton!: ElementRef<HTMLElement>;

  constructor(
    readonly _intl: NxDatepickerIntl,
    readonly elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._closeButton);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._closeButton);
    this._afterNextRenderInitial.destroy();
  }
}

/** Component responsible for managing the datepicker popup/dialog. */
@Component({
  selector: 'nx-datepicker',
  template: '',
  exportAs: 'nxDatepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NxDatepickerComponent<D> implements OnDestroy {
  private _injector = inject(Injector);

  isRange = computed<boolean>(() => this.rangeMode());

  /** The date to open the calendar initially. */
  @Input() set startAt(value: D | null) {
    this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  get startAt(): D | null {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this.getStartAtDate();
  }
  private _startAt!: D | null;

  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  /** Determines whether the today button is displayed in the calendar. */
  @Input() showTodayButton: boolean = false;

  /**
   * Whether the datepicker pop-up should be disabled.
   * The datepicker is also disabled if the belonging input is readonly.
   */
  readonly disabledInput = model<boolean | undefined>(undefined, { alias: 'disabled' });
  readonly disabled = computed(() => {
    if (this.disabledInput() !== undefined) {
      return this.disabledInput();
    }
    return (
      this._datepickerInput?.readonlyState() ||
      this._datepickerInputStartDate?.readonlyState() ||
      false
    );
  });

  /**
   * Event emitter for selection changes.
   *
   * Emits <D> if the datepicker is in single date selection mode.
   * Emits DateRange<D> if the datepicker is in range selection mode.
   * Never emits any other type. `any` is used here to avoid breaking changes and will be removed in Angular NDBX v20 major release.
   */
  readonly selectedChanged = new EventEmitter<D | DateRange<D> | any>();

  /**
   * Emits selected year in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected = new EventEmitter<D | DateRange<D>>();

  /**
   * Emits selected month in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected = new EventEmitter<D | DateRange<D>>();

  /** Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`. */
  @Input() panelClass!: string | string[];

  /** Emits when the datepicker has been opened. */
  @Output('opened') readonly openedStream = new EventEmitter<void>();

  /** Emits when the datepicker has been closed. */
  @Output('closed') readonly closedStream = new EventEmitter<void>();

  /**
   * Emits when the Today button is clicked.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly todayButtonClick = new EventEmitter<void>();

  /** Whether the calendar is open. */
  @Input() set opened(value: boolean) {
    value ? this.open() : this.close();
  }
  get opened(): boolean {
    return this._opened;
  }
  private _opened = false;

  /**
   * The id for the datepicker calendar.
   * @docs-private
   */
  id = `nx-datepicker-${datepickerUid++}`;

  /**
   * The currently selected date.
   * @docs-private
   */
  set selected(value: D | DateRange<D> | null) {
    this._selected.set(value);
  }
  get selected(): D | DateRange<D> | null {
    return this._selected();
  }
  // private _validSelected: D | DateRange<D> | null = null;

  _selected = signal<D | DateRange<D> | null>(null);
  selectedComputed = computed<D | DateRange<D> | null>(() => this._selected());

  /**
   * The minimum selectable date.
   * @docs-private
   */
  get minDate(): D | null {
    return this._datepickerInput?.min || this._datepickerInputStartDate?.min || null;
  }

  /**
   * The maximum selectable date.
   * @docs-private
   */
  get maxDate(): D | null {
    return this._datepickerInput?.max || this._datepickerInputEndDate?.max || null;
  }

  set dateFilter(value: (date: D | null) => boolean) {
    this._dateFilter = value;
  }
  get dateFilter(): (date: D | null) => boolean {
    return this._datepickerInput?.dateFilter || this._dateFilter;
  }
  private _dateFilter!: (date: D | null) => boolean;

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef!: OverlayRef | null;

  /** A portal containing the calendar for this datepicker. */
  private _calendarPortal!: ComponentPortal<NxDatepickerContentComponent<D>> | null;

  /** Reference to the component instantiated in popup mode. */
  private _popupComponentRef!: ComponentRef<NxDatepickerContentComponent<D>> | null;

  /** The element that was focused before the datepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null;

  /** The input element this datepicker is associated with. */
  _datepickerInput!: NxDatepickerInputInterface<D>;

  _datepickerInputStartDate?: NxDatepickerInputInterface<D>;
  _datepickerInputEndDate?: NxDatepickerInputInterface<D>;

  _toggleButton!: NxDatepickerToggleComponent<D>;

  /** Strategy factory that will be used to handle scrolling while the datepicker panel is open. */
  private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

  /** Emits when the datepicker is disabled. */
  readonly _disabledChange = new Subject<boolean>();

  private readonly _dateAdapter: NxDateAdapter<D>;

  private readonly _destroyed = new Subject<void>();
  rangeMode = input<boolean>(false);

  constructor(
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef,
    @Inject(NX_DATEPICKER_SCROLL_STRATEGY)
    private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
    @Optional() _dateAdapter: NxDateAdapter<D> | null,
    @Optional() private readonly _dir: Directionality | null,
    @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
  ) {
    if (!_dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }
    this._dateAdapter = _dateAdapter;

    this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this.close();
      this._destroyPopup();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.close();
    this._disabledChange.complete();

    if (this._popupRef) {
      this._popupRef.dispose();
      this._popupComponentRef = null;
    }
  }

  /**
   * Selects the given date.
   * @docs-private
   */
  select(date: D | DateRange<D> | null): void {
    const oldValue = this._selected();
    this._selected.set(date);

    if (
      this.isRange() ||
      (!this.isRange() && !this._dateAdapter.sameDate(oldValue as D, this.selected as D))
    ) {
      this.selectedChanged.emit(this._selected()!);
    }
  }

  /**
   * Emits the selected year in multiyear view.
   * @docs-private
   */
  selectYear(normalizedYear: D | DateRange<D> | null): void {
    this.yearSelected.emit(normalizedYear || undefined);
  }

  /**
   * Emits selected month in year view.
   * @docs-private
   */
  selectMonth(normalizedMonth: D | DateRange<D> | null): void {
    this.monthSelected.emit(normalizedMonth || undefined);
  }

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   * @docs-private
   */
  registerInput(input: NxDatepickerInputInterface<D>, inputDateMode: string = 'single'): void {
    if (this._datepickerInput && !this.isRange()) {
      throw Error('A NxDatepicker can only be associated with a single input.');
    }

    if (inputDateMode === 'start') {
      this._datepickerInputStartDate = input;
      this._datepickerInputStartDate._valueChange
        .pipe(takeUntil(this._destroyed))
        .subscribe((value: D | DateRange<D> | null) => {
          // this._selected.set((value as DateRange<D>)?.start)
          this._selected.set({
            start: value as D,
            end: (this._selected() as DateRange<D>)?.end as D,
          });
        });
    } else if (inputDateMode === 'end') {
      this._datepickerInputEndDate = input;
      this._datepickerInputEndDate._valueChange
        .pipe(takeUntil(this._destroyed))
        .subscribe((value: D | DateRange<D> | null) => {
          // this._selected.set((value as DateRange<D>)?.end)
          this._selected.set({
            start: (this._selected() as DateRange<D>)?.start as D,
            end: value as D,
          });
        });
    } else {
      this._datepickerInput = input;
      this._datepickerInput._valueChange
        .pipe(takeUntil(this._destroyed))
        .subscribe((value: D | DateRange<D> | null) => {
          this._selected.set(value);
        });
    }
  }

  /**
   * Register an input toggle with this datepicker.
   * @docs-private
   */
  registerToggle(toggle: NxDatepickerToggleComponent<D>) {
    if (this._toggleButton) {
      throw Error('A NxDatepicker can only be associated with a single toggle button.');
    }
    this._toggleButton = toggle;
  }

  /**
   * Open the calendar.
   * @docs-private
   */
  open(): void {
    if (this._opened || this.disabled()) {
      return;
    }
    if (
      (!this.isRange() && !this._datepickerInput) ||
      (this.isRange() && (!this._datepickerInputStartDate || !this._datepickerInputEndDate))
    ) {
      throw Error('Attempted to open an NxDatepicker with no associated input.');
    }
    if (this._document) {
      this._focusedElementBeforeOpen = _getFocusedElementPierceShadowDom() as HTMLElement | null;
    }

    this._openAsPopup();

    this._opened = true;
    this.openedStream.emit();
  }

  /**
   * Close the calendar.
   * @docs-private
   */
  close(): void {
    const inRangeModeAndOnlyStartDateSelected =
      this.isRange() &&
      (this.selected as DateRange<D>)?.start &&
      !(this.selected as DateRange<D>)?.end;
    if (inRangeModeAndOnlyStartDateSelected) {
      this.select({
        start: (this.selected as DateRange<D>)?.start as D,
        end: (this.selected as DateRange<D>)?.start as D,
      });
    }

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

    if (
      this._focusedElementBeforeOpen &&
      typeof this._focusedElementBeforeOpen.focus === 'function'
    ) {
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
      this._calendarPortal = new ComponentPortal<NxDatepickerContentComponent<D>>(
        NxDatepickerContentComponent,
        this._viewContainerRef,
      );
    }

    if (!this._popupRef) {
      this._createPopup();
    }

    if (!this._popupRef!.hasAttached()) {
      this._popupComponentRef = this._popupRef!.attach(this._calendarPortal);
      this._popupComponentRef.instance.datepicker = this;

      afterNextRender(
        {
          write: () => {
            this._popupRef!.updatePosition();
          },
        },
        { injector: this._injector },
      );
    }
  }

  /** Create the popup. */
  private _createPopup(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: 'nx-overlay-transparent-backdrop',
      direction: this._dir?.value || 'ltr',
      scrollStrategy: this._scrollStrategyFactory(),
      panelClass: 'nx-datepicker-popup',
    });

    this._popupRef = this._overlay.create(overlayConfig);

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.keydownEvents().pipe(filter((event) => event.keyCode === ESCAPE)),
    )
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this.close());
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
    const dateInputPositionAnchor: NxDatepickerInputInterface<D> = this.isRange()
      ? this._datepickerInputEndDate!
      : this._datepickerInput!;
    return this._overlay
      .position()
      .flexibleConnectedTo(dateInputPositionAnchor.getConnectedOverlayOrigin())
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

  getStartAtDate() {
    if (this._startAt) {
      return this._startAt;
    }
    if (!this.isRange()) {
      return this._datepickerInput.value;
    }
    return this._datepickerInputStartDate?.value as D;
  }

  handleTodayButtonClick() {
    this.todayButtonClick.emit();
  }
}
