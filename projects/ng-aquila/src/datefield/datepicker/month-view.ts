import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    input,
    model,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';

import { NX_DATE_FORMATS } from '../adapter/date-formats';
import { NxDateAdapter, NxDateFormats } from '../adapter/index';
import { DateRange } from '../date-range/date-range.component';
import { createMissingDateImplError } from '../datefield.functions';
import { NxCalendarBodyComponent, NxCalendarCell } from './calendar-body';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const DAYS_PER_WEEK = 7;
const TOTAL_DAYS_TO_DISPLAY = 6 * DAYS_PER_WEEK;

/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */
@Component({
    selector: 'nx-month-view',
    templateUrl: 'month-view.html',
    exportAs: 'nxMonthView',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['month-view.scss'],
    imports: [NxCalendarBodyComponent],
})
export class NxMonthViewComponent<D> implements AfterContentInit {
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     */
    @Input() set activeDate(value: D) {
        const oldActiveDate = this._activeDate;
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate as D, this.minDate, this.maxDate);
        if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this._init();
        }
    }
    get activeDate(): D {
        return this._activeDate;
    }
    private _activeDate: D;

    isRange = input(false);

    /** The currently selected date. */
    @Input() set selected(value: D | DateRange<D> | null) {
        this._selected = this._getValidDateOrNull(value);
        this.selectedDateInMonth.set(this._getDateInCurrentMonth((value as DateRange<D>)?.start || (this._selected as D)));
        if (this.isRange()) {
            this.selectedEndDate.set(this._getDateInCurrentMonth((value as DateRange<D>)?.end || (this._selected as D)));
            this.betweenRange.set(this.getRangeInMonth(value as DateRange<D>));
        }
    }
    get selected(): D | DateRange<D> | null {
        return this._selected;
    }
    private _selected!: D | DateRange<D> | null;

    /** The minimum selectable date. */
    @Input() set minDate(value: D | null) {
        this._minDate = this._getValidSingleDateOrNull(this._dateAdapter.deserialize(value)) as D; // todo: fix this
    }
    get minDate(): D | null {
        return this._minDate;
    }
    private _minDate!: D | null;

    /** The maximum selectable date. */
    @Input() set maxDate(value: D | null) {
        this._maxDate = this._getValidSingleDateOrNull(this._dateAdapter.deserialize(value)) as D; // todo: fix this
    }
    get maxDate(): D | null {
        return this._maxDate;
    }
    private _maxDate!: D | null;

    /** A function used to filter which dates are selectable. */
    @Input() dateFilter!: (date: D) => boolean;

    /** Emits when a new date is selected. */
    @Output() readonly selectedChange = new EventEmitter<D | DateRange<D> | null>();

    /** Emits when any date is selected. */
    @Output() readonly _userSelection = new EventEmitter<void>();

    /** Emits when any date is activated. */
    @Output() readonly activeDateChange = new EventEmitter<D>();

    /** Emits when user is hovering on date cell or navigating on date cells by keyboard */
    @Output() readonly hoverDateChange = new EventEmitter<D>();

    /** The body of calendar table */
    @ViewChild(NxCalendarBodyComponent, { static: true }) _nxCalendarBody: any;

    /** The label for this month (e.g. "January 2017"). */
    _monthLabel!: string;

    /** Grid of calendar cells representing the dates of the month. */
    _weeks!: NxCalendarCell[][];

    /** The number of blank cells in the first row before the 1st of the month. */
    _firstWeekOffset!: number;

    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     */
    protected readonly selectedDateInMonth = model<number | null>(null);

    __selectedDate!: number | null;

    /** The selected end date */
    protected readonly selectedEndDate = model<number | null>(null);

    /** The range between the selected start and end date */
    protected readonly betweenRange = model<number[]>([]);

    /** The date of the month that today falls on. Null if today is in another month. */
    _todayDate!: number | null;

    /** The names of the weekdays. */
    _weekdays: { long: string; narrow: string }[];

    /** Number of days that should be displayed in one row. */
    _numCols = 7;

    readonly _dateAdapter: NxDateAdapter<D>;
    private readonly _dateFormats: NxDateFormats;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        @Optional() @Inject(NX_DATE_FORMATS) _dateFormats: NxDateFormats | null,
        @Optional() _dateAdapter: NxDateAdapter<D> | null,
        @Optional() private readonly _dir?: Directionality | null,
    ) {
        if (!_dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._dateAdapter = _dateAdapter;

        if (!_dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this._dateFormats = _dateFormats;

        const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

        // Rotate the labels for days of the week based on the configured first day of the week.
        const weekdays = longWeekdays.map((long, i) => ({ long, narrow: narrowWeekdays[i] }));
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));

        this._activeDate = this._dateAdapter.today();
    }

    ngAfterContentInit(): void {
        this._init();
        this._focusActiveCell();
    }

    handleHoverChange(date: number, monthsToAdd = 0) {
        const selectedYear = this._dateAdapter.getYear(this._dateAdapter.addCalendarMonths(this.activeDate, monthsToAdd));
        const selectedMonth = this._dateAdapter.getMonth(this._dateAdapter.addCalendarMonths(this.activeDate, monthsToAdd));
        const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);

        this.hoverDateChange.emit(selectedDate);
    }

    private calcDate(date: number, monthsToAdd = 0): D {
        const selectedYear = this._dateAdapter.getYear(this._dateAdapter.addCalendarMonths(this.activeDate, monthsToAdd));
        const selectedMonth = this._dateAdapter.getMonth(this._dateAdapter.addCalendarMonths(this.activeDate, monthsToAdd));
        const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);
        return selectedDate;
    }

    /** Handles when a new date is selected. */
    _dateSelected(date: number, monthsToAdd = 0) {
        if (!this.isRange() && this.selectedDateInMonth() !== date) {
            this.selectedChange.emit(this.calcDate(date, monthsToAdd));
        }

        if (this.isRange()) {
            this.selectedChange.emit(this.calcDate(date, monthsToAdd));
        }
    }

    /** Handles keydown events on the calendar body when calendar is in month view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.

        const oldActiveDate = this._activeDate;

        const isRtl = this._isRtl();
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -this._numCols);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._numCols);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarDays(
                    this._activeDate,
                    this._dateAdapter.getNumDaysInMonth(this._activeDate) - this._dateAdapter.getDate(this._activeDate),
                );
                break;
            case PAGE_UP:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, -1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, 1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this._dateSelected(this._dateAdapter.getDate(this._activeDate));

                    // Emit the selected date if the user selected a date. Range will be emitted in _dateSelected method if selection is complete
                    if (!this.isRange()) {
                        this._userSelection.emit();
                    }

                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }

        if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }

        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    }

    /** Initializes this month view. */
    _init() {
        const initDateStart: D | null = this.selected && this.isRange() ? (this.selected as DateRange<D>).start : (this.selected as D);
        this.selectedDateInMonth.set(this._getDateInCurrentMonth(initDateStart));
        if (this.isRange() && this.selected) {
            this.selectedEndDate.set(this._getDateInCurrentMonth((this.selected as DateRange<D>)?.end || (this.selected as D)));
            this.betweenRange.set(this.getRangeInMonth(this.selected as DateRange<D>));
        }
        this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
        this._monthLabel = this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase();

        const firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset = (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) - this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

        this._createWeekCells();
        this._cdr.markForCheck();
    }

    /** Focuses the active cell after the microtask queue is empty. */
    private _focusActiveCell() {
        this._nxCalendarBody._focusActiveCell();
    }

    /** Creates NxCalendarCells for the dates in this month. */
    private _createWeekCells() {
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        const dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            const enabled = this._shouldEnableDate(date);
            const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1].push(new NxCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    }

    /** Date filter for the month */
    private _shouldEnableDate(date: D): boolean {
        return (
            !!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0)
        );
    }

    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    private _getDateInCurrentMonth(date: D | DateRange<D> | null): number | null {
        const startDate = this.getInitialSelectionDate(date);
        const isInSameMonth = date && this._hasSameMonthAndYear(startDate, this.activeDate);
        return date && isInSameMonth ? this._dateAdapter.getDate(startDate) : null;
    }

    /**
     * Gets the range of dates in this month that the given DateRange falls on.
     * Returns an empty array if the given DateRange is exclusively in another month.
     * @param value The DateRange to check.
     * @returns The range of dates in this month that the DateRange falls on.
     */
    private getRangeInMonth(value: DateRange<D>): number[] {
        const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

        const isCompleteRange = value.start && value.end && this._dateAdapter.isValid(value.start!) && this._dateAdapter.isValid(value.end!);
        if (!isCompleteRange) {
            return [];
        }

        const isValidRange = this._dateAdapter.compareDate(value.start!, value.end!) < 0;
        if (!isValidRange) {
            return [];
        }

        const intersectStart = this._hasSameMonthAndYear(value.start!, this.activeDate);
        const intersectEnd = this._hasSameMonthAndYear(value.end!, this.activeDate);

        if (intersectStart && intersectEnd) {
            const start = this._dateAdapter.getDate(value.start!);
            const end = this._dateAdapter.getDate(value.end!);
            return range(start + 1, end - 1);
        }

        if (intersectStart && !intersectEnd) {
            const start = this._dateAdapter.getDate(value.start!);
            const end = 31;
            return range(start + 1, end);
        }

        if (!intersectStart && intersectEnd) {
            const start = 1;
            const end = this._dateAdapter.getDate(value.end!);
            return range(start, end - 1);
        }

        const currentMonthIsLaterThenStart = this._dateAdapter.compareDate(this.activeDate, value.start!) > 0;
        const currentMonthIsEarlierThenEnd = this._dateAdapter.compareDate(this.activeDate, value.end!) < 0;
        const isBetween = currentMonthIsLaterThenStart && currentMonthIsEarlierThenEnd;
        if (isBetween) {
            return range(1, 31);
        }

        return [];
    }

    /**
     * Gets the date to mark as selected. If the given date is null, it returns today's date
     */
    private getInitialSelectionDate(date: D | DateRange<D> | null): D {
        if (this._dateAdapter.isDateInstance(date)) {
            return date as D;
        }
        return (date as DateRange<D>)?.start as D;
    }

    /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
    private _hasSameMonthAndYear(d1: D | null, d2: D | null): boolean {
        return !!(
            d1 &&
            d2 &&
            this._dateAdapter.getMonth(d1) === this._dateAdapter.getMonth(d2) &&
            this._dateAdapter.getYear(d1) === this._dateAdapter.getYear(d2)
        );
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | DateRange<D> | null {
        if (this.isRange() && !this._dateAdapter.isDateInstance(obj)) {
            const dateRangeObject = obj as DateRange<D>;
            return {
                start: this._dateAdapter.isDateInstance(dateRangeObject?.start) && this._dateAdapter.isValid(dateRangeObject!.start!) ? obj.start : null,
                end: this._dateAdapter.isDateInstance(dateRangeObject?.end) && this._dateAdapter.isValid(dateRangeObject!.end!) ? obj.end : null,
            };
        }
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    private _getValidSingleDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    /** Determines whether the user has the RTL layout direction. */
    private _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }

    /**
     * Fill up the last row of the current month
     */
    _getFirstDaysOfFollowingMonth(): number {
        const followingDaysCount = TOTAL_DAYS_TO_DISPLAY - this._firstWeekOffset - this._dateAdapter.getNumDaysInMonth(this.activeDate);
        const offsetItems = followingDaysCount % 7;

        // If there are any offset items, use them to complete the last row of the current month
        return offsetItems > 0 ? offsetItems : 0;
    }

    /**
     * Returns a row with days, beginning with the date of `firstDayInRow`-parameter.
     * The returned row contains `daysCount` elements.
     */
    _getRowOfDays(firstDayInRow: D, daysCount: number): NxCalendarCell[] {
        const nextRow: NxCalendarCell[] = [];
        const dateNames = this._dateAdapter.getDateNames();
        for (let addDays = 0; addDays < daysCount; addDays++) {
            const date = this._dateAdapter.addCalendarDays(firstDayInRow, addDays);
            const day = this._dateAdapter.getDate(date);
            const enabled = this._shouldEnableDate(date);
            const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            nextRow.push(new NxCalendarCell(day, dateNames[day - 1], ariaLabel, enabled));
        }
        return nextRow;
    }
}
