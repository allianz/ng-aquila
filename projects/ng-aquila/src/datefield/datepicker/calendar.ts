import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CdkMonitorFocus, FocusMonitor, LiveAnnouncer } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  afterNextRender,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Injector,
  Input,
  input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NX_DATE_FORMATS, NxDateAdapter, NxDateFormats } from '../adapter/index';
import { DateRange } from '../date-range/date-range.component';
import { createMissingDateImplError } from '../datefield.functions';
import { NxDatepickerIntl } from './datepicker-intl';
import { NxMonthViewComponent } from './month-view';
import { NxMultiYearViewComponent } from './multi-year-view';
import { NxYearViewComponent } from './year-view';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const yearsPerPage = 20;

/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  selector: 'nx-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.scss'],
  host: {
    class: 'nx-calendar',
  },
  exportAs: 'nxCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxIconModule,
    CdkMonitorFocus,
    NxMonthViewComponent,
    NxYearViewComponent,
    NxMultiYearViewComponent,
    NxButtonModule,
  ],
})
export class NxCalendarComponent<D>
  implements AfterContentInit, AfterViewInit, OnDestroy, OnChanges
{
  /** Whether the datepicker should be in date range selection mode */
  isRange = input<boolean>(false);

  /** A date representing the period (month or year) to start the calendar in. */
  @Input() set startAt(value: D | null) {
    this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  get startAt(): D | null {
    return this._startAt;
  }
  private _startAt!: D | null;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  /** The currently selected date. */
  @Input() set selected(value: D | DateRange<D> | null) {
    if (this.isRange()) {
      this._selected.set(this.getValidRangeOrNullDate(value));
    } else {
      this._selected.set(this._getValidDateOrNull(value));
    }
  }
  get selected(): D | DateRange<D> | null {
    return this._selected();
  }
  protected _selected = signal<D | DateRange<D> | null>(null);

  /** Internal state for improved typesafety */
  private _currentRange: DateRange<D> = { start: null, end: null };

  private _inEndDateSelectionMode = false;
  /** The minimum selectable date. */
  @Input() set minDate(value: D | null) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  get minDate(): D | null {
    return this._minDate;
  }
  private _minDate!: D | null;

  /** The maximum selectable date. */
  @Input() set maxDate(value: D | null) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  get maxDate(): D | null {
    return this._maxDate;
  }
  private _maxDate!: D | null;

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter!: (date: D) => boolean;

  /** Determines whether the today button is displayed in the calendar. */
  @Input({ transform: booleanAttribute }) showTodayButton: boolean = false;

  /** Emits when the currently selected date changes. */
  @Output() readonly selectedChange = new EventEmitter<D | DateRange<D>>();

  /**
   * Emits the year chosen in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected = new EventEmitter<D>();

  /**
   * Emits the month chosen in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected = new EventEmitter<D>();

  /** Emits when any date is selected. */
  @Output() readonly _userSelection = new EventEmitter<void>();

  /**
   * Emits when the Today button is clicked.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly todayButtonClick = new EventEmitter<void>();

  /** Reference to the current month view component. */
  @ViewChild(NxMonthViewComponent) monthView!: NxMonthViewComponent<D>;
  /** Reference to the current year view component. */
  @ViewChild(NxYearViewComponent) yearView!: NxYearViewComponent<D>;

  /** Reference to the current multi-year view component. */
  @ViewChild(NxMultiYearViewComponent) multiYearView!: NxMultiYearViewComponent<D>;

  @ViewChild('previousButton') _previousButton!: ElementRef<HTMLElement>;
  @ViewChild('nextButton') _nextButton!: ElementRef<HTMLElement>;
  @ViewChild('changeViewButton') _changeViewButton!: ElementRef<HTMLElement>;
  @ViewChild('todayButton') _todayButton!: ElementRef<HTMLElement>;

  private _injector = inject(Injector);

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  set _activeDate(value: D) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
  }
  get _activeDate(): D {
    return this._clampedActiveDate;
  }
  private _clampedActiveDate!: D;

  /** Whether the calendar is in month view. */
  _currentView!: 'month' | 'year' | 'multi-year';

  /** The label for the current calendar view. */
  get _periodButtonText(): string {
    if (this._currentView === 'month') {
      return this._dateAdapter.format(this._activeDate, this._dateFormats.display.monthYearLabel);
    }
    if (this._currentView === 'year') {
      return this._dateAdapter.getYearName(this._activeDate);
    }
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    const firstYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(activeYear - (activeYear % yearsPerPage), 0, 1),
    );
    const lastYearInView = this._dateAdapter.getYearName(
      this._dateAdapter.createDate(
        activeYear + yearsPerPage - 1 - (activeYear % yearsPerPage),
        0,
        1,
      ),
    );
    return `${firstYearInView} \u2013 ${lastYearInView}`;
  }

  get _periodButtonLabel(): string {
    return this._currentView === 'month'
      ? this._intl.switchToMultiYearViewLabel
      : this._intl.switchToMonthViewLabel;
  }

  /** The label for the the previous button. */
  get _prevButtonLabel(): string {
    return {
      month: this._intl.prevMonthLabel,
      year: this._intl.prevYearLabel,
      'multi-year': this._intl.prevMultiYearLabel,
    }[this._currentView];
  }

  /** The label for the the next button. */
  get _nextButtonLabel(): string {
    return {
      month: this._intl.nextMonthLabel,
      year: this._intl.nextYearLabel,
      'multi-year': this._intl.nextMultiYearLabel,
    }[this._currentView];
  }

  get _isRtl(): boolean {
    return this._dir?.value === 'rtl';
  }

  /** Check whether today button should disable or not */
  get _disableTodayButton(): boolean {
    const today = this._dateAdapter.today();
    return (
      this._currentView === 'month' &&
      this._dateAdapter.getMonth(this._activeDate) === this._dateAdapter.getMonth(today) &&
      this._dateAdapter.getYear(this._activeDate) === this._dateAdapter.getYear(today)
    );
  }

  private readonly _dateAdapter: NxDateAdapter<D>;
  private readonly _dateFormats: NxDateFormats;

  private readonly _destroyed = new Subject<void>();

  constructor(
    protected readonly _intl: NxDatepickerIntl,
    @Optional() _dateAdapter: NxDateAdapter<D> | null,
    @Optional() private readonly _dir: Directionality | null,
    @Optional() @Inject(NX_DATE_FORMATS) _dateFormats: NxDateFormats | null,
    _cdr: ChangeDetectorRef,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _liveAnnouncer: LiveAnnouncer,
    private readonly _elementRef: ElementRef,
  ) {
    if (!_dateAdapter) {
      throw createMissingDateImplError('DateAdapter');
    }
    this._dateAdapter = _dateAdapter;

    if (!_dateFormats) {
      throw createMissingDateImplError('MAT_DATE_FORMATS');
    }
    this._dateFormats = _dateFormats;

    _intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => _cdr.markForCheck());
  }

  ngAfterContentInit(): void {
    this._activeDate = this.startAt || this._dateAdapter.today();
    this._currentView = this.startView;
  }

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._previousButton);
    this._focusMonitor.monitor(this._nextButton);
    this._focusMonitor.monitor(this._changeViewButton);
    if (this._todayButton) {
      this._focusMonitor.monitor(this._todayButton);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._focusMonitor.stopMonitoring(this._previousButton);
    this._focusMonitor.stopMonitoring(this._nextButton);
    this._focusMonitor.stopMonitoring(this._changeViewButton);
    if (this._todayButton) {
      this._focusMonitor.stopMonitoring(this._todayButton);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.minDate || changes.maxDate || changes.dateFilter;

    if (change && !change.firstChange) {
      const view = this.monthView || this.yearView || this.multiYearView;

      if (view) {
        view._init();
      }
    }
  }

  _hoverDateChange(date: D) {
    this._inEndDateSelectionMode = true;
    if (this.isRange() && this._currentRange.start) {
      this._currentRange = {
        start: this._currentRange.start,
        end: date,
      };
      this._selected.set(this._currentRange);
    }
  }

  /** Handles date selection in the month view. */
  _dateSelected(date: D | DateRange<D>): void {
    if (!this.isRange() && !this._dateAdapter.sameDate(date as D, this.selected as D)) {
      this.selected = date;
      this.selectedChange.emit(date);
      this._userSelected();
      return;
    }
    const selectedDate = this._getValidDateOrNull(date);
    if (!selectedDate) {
      return;
    }

    // first step for range selection - select start date
    if (this.isRange() && !this._currentRange.start) {
      this._currentRange = {
        start: selectedDate,
        end: null,
      };
      this._selected.set(this._currentRange);

      this._liveAnnouncer.announce(this._intl.startDateSelectedAnnouncement);

      this.selectedChange.emit(this.selected as DateRange<D>);
      return;
    }

    // case start date is selected but the next date is before the start date -> reset start date
    if (
      this.isRange() &&
      this._currentRange.start &&
      this._dateAdapter.compareDate(selectedDate, this._currentRange.start!) < 0
    ) {
      this._currentRange = {
        start: selectedDate,
        end: null,
      };
      this._selected.set(this._currentRange);

      this.selectedChange.emit(this.selected as DateRange<D>);
      return;
    }

    // final case - if start date is selected and the next date is after the start date -> select end date
    if (
      this.isRange() &&
      this._currentRange.start &&
      (!this._currentRange.end || this._inEndDateSelectionMode)
    ) {
      this._currentRange = {
        start: this._currentRange.start,
        end: selectedDate,
      };
      this._selected.set(this._currentRange);

      this._liveAnnouncer.announce(this._intl.dateRangeSelectionCompleteAnnouncement);
      this.selectedChange.emit(this.selected as DateRange<D>);
      this._userSelected();
    }
  }

  /** Handles year selection in the multiyear view. */
  _yearSelectedInMultiYearView(normalizedYear: D) {
    this.yearSelected.emit(normalizedYear);
  }

  /** Handles month selection in the year view. */
  _monthSelectedInYearView(normalizedMonth: D) {
    this.monthSelected.emit(normalizedMonth);
  }

  _userSelected(): void {
    if (!this.isRange()) {
      this._userSelection.emit();
    }
    const range = this.selected as DateRange<D>;
    if (this.isRange() && range.start && range.end) {
      this._userSelection.emit();
    }
  }

  /** Handles year/month selection in the multi-year/year views. */
  _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void {
    this._activeDate = date;
    this._currentView = view;
  }

  /** Handles user clicks on the period label. */
  _changeViewClicked(): void {
    this._currentView = this._currentView === 'month' ? 'multi-year' : 'month';
  }

  /** Handles user clicks on the previous button. */
  _previousClicked(): void {
    this._activeDate =
      this._currentView === 'month'
        ? this._dateAdapter.addCalendarMonths(this._activeDate, -1)
        : this._dateAdapter.addCalendarYears(
            this._activeDate,
            this._currentView === 'year' ? -1 : -yearsPerPage,
          );
  }

  /** Handles user clicks on the next button. */
  _nextClicked(): void {
    this._activeDate =
      this._currentView === 'month'
        ? this._dateAdapter.addCalendarMonths(this._activeDate, 1)
        : this._dateAdapter.addCalendarYears(
            this._activeDate,
            this._currentView === 'year' ? 1 : yearsPerPage,
          );
  }

  /** Whether the previous period button is enabled. */
  _previousEnabled(): boolean {
    if (!this.minDate) {
      return true;
    }
    return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
  }

  /** Whether the next period button is enabled. */
  _nextEnabled(): boolean {
    return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: D, date2: D): boolean {
    if (this._currentView === 'month') {
      return (
        this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2) &&
        this._dateAdapter.getMonth(date1) === this._dateAdapter.getMonth(date2)
      );
    }
    if (this._currentView === 'year') {
      return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
    }
    // Otherwise we are in 'multi-year' view.
    return (
      Math.floor(this._dateAdapter.getYear(date1) / yearsPerPage) ===
      Math.floor(this._dateAdapter.getYear(date2) / yearsPerPage)
    );
  }

  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */
  private _getValidDateOrNull(obj: any): D | null {
    const returnDate =
      this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj as D)
        ? (obj as D)
        : null;
    return returnDate;
  }

  private getValidRangeOrNullDate(newDate: D | DateRange<D> | null): DateRange<D> | null {
    if (newDate === null) {
      return { start: null, end: null };
    }

    const newDateRange = newDate as DateRange<D>;
    const isStartValid =
      this._dateAdapter.isDateInstance(newDateRange?.start) &&
      this._dateAdapter.isValid(newDateRange.start!);
    const isEndValid =
      this._dateAdapter.isDateInstance(newDateRange?.end) &&
      this._dateAdapter.isValid(newDateRange.end!);

    return {
      start: isStartValid ? newDateRange.start : null,
      end: isEndValid ? newDateRange.end : null,
    };
  }

  /** Handles event on the today button */
  protected todayButtonHandler(): void {
    this._activeDate = this._dateAdapter.today();
    if (this._currentView !== 'month') {
      this._currentView = 'month';
    }

    afterNextRender(
      {
        read: () => {
          const currentDateElement =
            this._elementRef.nativeElement.querySelector('.nx-calendar-body-today');
          if (currentDateElement) {
            currentDateElement.focus();
          }
        },
      },
      { injector: this._injector },
    );

    this.todayButtonClick.emit();
  }

  protected todayButtonKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.todayButtonHandler();
    }
  }
}
