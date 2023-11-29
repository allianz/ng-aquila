/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */
export class NxCalendarCell {
    constructor(
        readonly value: number,
        readonly displayValue: string,
        readonly ariaLabel?: string,
        readonly enabled?: boolean,
    ) {}
}

/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */
@Component({
    selector: '[nx-calendar-body]',
    templateUrl: 'calendar-body.html',
    styleUrls: ['calendar-body.scss'],
    host: {
        class: 'nx-calendar-body',
        role: 'grid',
        'attr.aria-readonly': 'true',
    },
    exportAs: 'nxCalendarBody',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxCalendarBodyComponent implements AfterViewInit, OnDestroy {
    /** The label for the table. (e.g. "Jan 2017"). */
    @Input() label!: string;

    /** The cells to display in the table. */
    @Input() rows!: NxCalendarCell[][];

    /** The value in the table that corresponds to today. */
    @Input() todayValue!: number;

    /** The value in the table that is currently selected. */
    @Input() selectedValue!: number;

    /** The number of columns in the table. */
    @Input() numCols = 7;

    /** Whether to allow selection of disabled cells. */
    @Input() allowDisabledSelection = false;

    /** The cell number of the active cell in the table. */
    @Input() activeCell = 0;

    /** The items to display in the first row in the offset space. */
    @Input() previousItems: NxCalendarCell[] = [];

    /** The items to display in the last row in the offset space. */
    @Input() followingItems: NxCalendarCell[][] = [[]];

    /** Emits when a new value out of rows is selected. */
    @Output() readonly selectedValueChange = new EventEmitter<number>();

    /** Emits when a new value out of previousItems is selected. */
    @Output() readonly selectedValueChangeToPrevious = new EventEmitter<number>();

    /** Emits when a new value out of followingItems is selected. */
    @Output() readonly selectedValueChangeToFollowing = new EventEmitter<number>();

    @ViewChildren('cell') _cells!: QueryList<ElementRef<HTMLElement>>;

    /** Preserves the current value of the _cells ViewChildren in case _cells changes. */
    private _cellsPrevious!: QueryList<ElementRef<HTMLElement>>;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _ngZone: NgZone,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this._cells.forEach(cell => this._focusMonitor.monitor(cell));
        this._cellsPrevious = this._cells;

        this._cells.changes.pipe(takeUntil(this._destroyed)).subscribe(changes => {
            this._cellsPrevious.forEach(cell => this._focusMonitor.stopMonitoring(cell));
            this._cellsPrevious = this._cells;
            this._cells.forEach(cell => this._focusMonitor.monitor(cell));
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._cells.forEach(cell => this._focusMonitor.stopMonitoring(cell));
    }

    _previousCellClicked(cell: NxCalendarCell): void {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChangeToPrevious.emit(cell.value);
    }

    _cellClicked(cell: NxCalendarCell): void {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    }

    _followingCellClicked(cell: NxCalendarCell): void {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChangeToFollowing.emit(cell.value);
    }

    /** The number of blank cells to put at the beginning for the first row. */
    get _firstRowOffset(): number {
        return this.rows?.length && this.rows[0].length ? this.numCols - this.rows[0].length : 0;
    }

    /** The number of blank cells to put at the end of the last filled row. */
    get _lastRowOffset(): number {
        return this.rows?.length && this.rows[this.rows.length - 1].length ? this.numCols - this.rows[this.rows.length - 1].length : 0;
    }

    /** The index of the last row. */
    get _lastRowIndex(): number {
        return this.rows?.length ? this.rows.length - 1 : 0;
    }

    /**
     * The following full rows to display and fill up the calendar.
     */
    get _followingRows(): NxCalendarCell[][] {
        if (this.followingItems?.length) {
            // if first row is not a full row => display them in offset space
            if (this.followingItems[0].length < this.numCols) {
                return this.followingItems.slice(1, this.followingItems.length);
            }
            return this.followingItems;
        }

        return [];
    }

    _isActiveCell(rowIndex: number, colIndex: number): boolean {
        let cellNumber = rowIndex * this.numCols + colIndex;

        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }

        return cellNumber === this.activeCell;
    }

    /** Focuses the active cell after the microtask queue is empty. */
    _focusActiveCell() {
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    this._elementRef.nativeElement.querySelector('.nx-calendar-body-active').focus();
                });
        });
    }
}
