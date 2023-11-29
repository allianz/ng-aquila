import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, ViewChild } from '@angular/core';

import { NxDateAdapter } from '../adapter/index';
import { createMissingDateImplError } from '../datefield.functions';
import { NxCalendarBodyComponent, NxCalendarCell } from './calendar-body';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export const yearsPerPage = 20;

export const yearsPerRow = 4;

/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
@Component({
    selector: 'nx-multi-year-view',
    templateUrl: 'multi-year-view.html',
    exportAs: 'nxMultiYearView',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['multi-year-view.scss'],
})
export class NxMultiYearViewComponent<D> implements AfterContentInit {
    /** The date to display in this multi-year view (everything other than the year is ignored). */
    @Input() set activeDate(value: D) {
        const oldActiveDate = this._activeDate;
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (Math.floor(this._dateAdapter.getYear(oldActiveDate) / yearsPerPage) !== Math.floor(this._dateAdapter.getYear(this._activeDate) / yearsPerPage)) {
            this._init();
        }
    }
    get activeDate(): D {
        return this._activeDate;
    }
    private _activeDate: D;

    /** The currently selected date. */
    @Input() set selected(value: D | null) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
    }
    get selected(): D | null {
        return this._selected;
    }
    private _selected!: D | null;

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

    /** Emits when a new year is selected. */
    @Output() readonly selectedChange = new EventEmitter<D>();

    /** Emits the selected year. This doesn't imply a change on the selected date */
    @Output() readonly yearSelected = new EventEmitter<D>();

    /** Emits when any date is activated. */
    @Output() readonly activeDateChange = new EventEmitter<D>();

    /** The body of calendar table */
    @ViewChild(NxCalendarBodyComponent, { static: true }) _nxCalendarBody: any;

    /** Grid of calendar cells representing the currently displayed years. */
    _years!: NxCalendarCell[][];

    /** The year that today falls on. */
    _todayYear!: number;

    /** The year of the selected date. Null if the selected date is null. */
    _selectedYear!: number | null;

    readonly _dateAdapter: NxDateAdapter<D>;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        @Optional() _dateAdapter: NxDateAdapter<D> | null,
        @Optional() private readonly _dir?: Directionality | null,
    ) {
        if (!_dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        this._dateAdapter = _dateAdapter;

        this._activeDate = this._dateAdapter.today();
    }

    ngAfterContentInit(): void {
        this._init();
        this._focusActiveCell();
    }

    /** Initializes this multi-year view. */
    _init() {
        this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());
        const activeYear = this._dateAdapter.getYear(this._activeDate);
        const activeOffset = activeYear % yearsPerPage;
        this._years = [];
        for (let i = 0, row: number[] = []; i < yearsPerPage; i++) {
            row.push(activeYear - activeOffset + i);
            if (row.length === yearsPerRow) {
                this._years.push(row.map(year => this._createCellForYear(year)));
                row = [];
            }
        }
        this._cdr.markForCheck();
    }

    /** Handles when a new year is selected. */
    _yearSelected(year: number) {
        this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
        const month = this._dateAdapter.getMonth(this.activeDate);
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
        this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
    }

    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.

        const oldActiveDate = this._activeDate;
        const isRtl = this._isRtl();

        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -this._dateAdapter.getYear(this._activeDate) % yearsPerPage);
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarYears(
                    this._activeDate,
                    yearsPerPage - (this._dateAdapter.getYear(this._activeDate) % yearsPerPage) - 1,
                );
                break;
            case PAGE_UP:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
                break;
            case PAGE_DOWN:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
                break;
            case ENTER:
                this._yearSelected(this._dateAdapter.getYear(this._activeDate));
                break;
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

    _getActiveCell(): number {
        return this._dateAdapter.getYear(this.activeDate) % yearsPerPage;
    }

    /** Focuses the active cell after the microtask queue is empty. */
    private _focusActiveCell() {
        this._nxCalendarBody._focusActiveCell();
    }

    /** Creates an NxCalendarCell for the given year. */
    private _createCellForYear(year: number) {
        const yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));
        return new NxCalendarCell(year, yearName, yearName, this._shouldEnableYear(year));
    }

    /** Whether the given year is enabled. */
    private _shouldEnableYear(year: number) {
        // disable if the year is greater than maxDate lower than minDate
        if (
            year === undefined ||
            year === null ||
            (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this._dateAdapter.getYear(this.minDate))
        ) {
            return false;
        }

        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }

        const firstOfYear = this._dateAdapter.createDate(year, 0, 1);

        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this._dateAdapter.getYear(date) === year; date = this._dateAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull(obj: any): D | null {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }

    /** Determines whether the user has the RTL layout direction. */
    private _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
}
