/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  afterNextRender,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    role: 'rowgroup',
    'attr.aria-readonly': 'true',
  },
  exportAs: 'nxCalendarBody',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class NxCalendarBodyComponent implements AfterViewInit, OnDestroy, AfterViewChecked {
  /** The label for the table. (e.g. "Jan 2017"). */
  @Input() label!: string;

  /** The cells to display in the table. */
  @Input() rows!: NxCalendarCell[][];

  /** The value in the table that corresponds to today. */
  @Input() todayValue!: number;

  /** The value in the table that is currently selected. */
  @Input() selectedValue: number | null = null;

  selectedEndDate = input<number | null>(null);
  betweenRange = input<number[]>([]);

  /** The number of columns in the table. */
  @Input() numCols = 7;

  /** Whether to allow selection of disabled cells. */
  @Input() allowDisabledSelection = false;

  /** The cell number of the active cell in the table. */
  @Input() activeCell = 0;

  /** The items to display in the first row in the offset space. */
  @Input() previousItems: number = 0;

  /** The items to display in the last row in the offset space. */
  @Input() followingItems: number = 0;

  /** Emits when a new value out of rows is selected. */
  @Output() readonly selectedValueChange = new EventEmitter<number>();
  @Output() readonly hoverValueChange = new EventEmitter<number>();

  /** Emits when a new value out of previousItems is selected. */
  @Output() readonly selectedValueChangeToPrevious = new EventEmitter<number>();

  /** Emits when a new value out of followingItems is selected. */
  @Output() readonly selectedValueChangeToFollowing = new EventEmitter<number>();

  @ViewChildren('cell') _cells!: QueryList<ElementRef<HTMLElement>>;

  private readonly _injector = inject(Injector);

  /** Preserves the current value of the _cells ViewChildren in case _cells changes. */
  private _cellsPrevious!: QueryList<ElementRef<HTMLElement>>;

  /**
   * Used to focus the active cell after change detection has run.
   */
  private _focusActiveCellAfterViewChecked = false;

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}

  ngAfterViewInit(): void {
    this._cells.forEach((cell) => this._focusMonitor.monitor(cell));
    this._cellsPrevious = this._cells;

    this._cells.changes.pipe(takeUntil(this._destroyed)).subscribe((changes) => {
      this._cellsPrevious.forEach((cell) => this._focusMonitor.stopMonitoring(cell));
      this._cellsPrevious = this._cells;
      this._cells.forEach((cell) => this._focusMonitor.monitor(cell));
    });
  }

  ngAfterViewChecked() {
    if (this._focusActiveCellAfterViewChecked) {
      this._focusActiveCell();
      this._focusActiveCellAfterViewChecked = false;
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._cells.forEach((cell) => this._focusMonitor.stopMonitoring(cell));
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

  _cellFocused(cell: NxCalendarCell): void {
    this.hoverValueChange.emit(cell.value);
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
    return this.rows?.length && this.rows[this.rows.length - 1].length
      ? this.numCols - this.rows[this.rows.length - 1].length
      : 0;
  }

  /** The index of the last row. */
  get _lastRowIndex(): number {
    return this.rows?.length ? this.rows.length - 1 : 0;
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
    afterNextRender(
      {
        read: () => {
          this._elementRef.nativeElement.querySelector('.nx-calendar-body-active').focus();
        },
      },
      { injector: this._injector },
    );
  }

  /** Focuses the active cell after change detection has run and the microtask queue is empty. */
  _scheduleFocusActiveCellAfterViewChecked() {
    this._focusActiveCellAfterViewChecked = true;
  }
}
