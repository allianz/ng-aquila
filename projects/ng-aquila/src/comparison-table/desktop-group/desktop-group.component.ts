import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Optional, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { COMPARISON_TABLE_DEFAULT_OPTIONS, ComparisonTableDefaultOptions } from '../comparison-table.models';
import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowGroupDirective } from '../comparison-table-row-group.directive';

/**
 * Component that is only used internally for displaying a `nxComparisonTableRowGroup` in desktop and tablet view.
 * @docs-private
 */
@Component({
    selector: 'nx-comparison-table-desktop-group',
    templateUrl: './desktop-group.component.html',
    styleUrls: ['./desktop-group.component.scss'],
})
export class NxComparisonTableDesktopGroup implements AfterViewInit, OnDestroy {
    @Input() group!: NxComparisonTableRowGroupDirective;

    @ViewChild('expansionCell') _expansionCell!: ElementRef;

    /** Preserves the current value of the _expansionCell ViewChild in case it changes. */
    private _expansionCellPrevious!: ElementRef;

    /** Sets if the row group is expanded. Default: false. */
    @Input() set isExpanded(value: BooleanInput) {
        this._expanded = coerceBooleanProperty(value);
    }
    get isExpanded(): boolean {
        return this._expanded;
    }
    _expanded = false;

    /** Sets if the expansion cell uses the full row of the table or leaves out the first column. Default: false. */
    @Input() set useFullRowForExpandableArea(value: BooleanInput) {
        this._useFullRowForExpandableArea = coerceBooleanProperty(value);
    }
    get useFullRowForExpandableArea(): boolean {
        if (this._useFullRowForExpandableArea !== undefined) {
            return this._useFullRowForExpandableArea;
        }
        if (this._defaultOptions?.useFullRowForExpandableArea !== undefined) {
            return this._defaultOptions.useFullRowForExpandableArea;
        }
        return false;
    }
    _useFullRowForExpandableArea = false;

    @Output() readonly isExpandedChange = new EventEmitter<boolean>();

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly _table: NxComparisonTableBase,
        private readonly _focusMonitor: FocusMonitor,
        @Optional() private readonly _dir: Directionality | null,
        @Optional() @Inject(COMPARISON_TABLE_DEFAULT_OPTIONS) private readonly _defaultOptions: ComparisonTableDefaultOptions | null,
    ) {}

    ngAfterViewInit(): void {
        this._updateFocusMonitoring();
        this.group?.rows.changes.pipe(takeUntil(this._destroyed)).subscribe(rows =>
            // timeout is needed here so that the focus monitor is updated after the view was updated
            setTimeout(() => this._updateFocusMonitoring()),
        );
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._expansionCell);
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    toggleGroup() {
        this.isExpanded = !this.isExpanded;
        this.isExpandedChange.emit(this.isExpanded);
    }

    _updateFocusMonitoring() {
        if (this._expansionCellPrevious && !this._expansionCell) {
            this._focusMonitor.stopMonitoring(this._expansionCellPrevious);
            this._expansionCellPrevious = this._expansionCell;
        }
        if (!this._expansionCellPrevious && this._expansionCell) {
            this._focusMonitor
                .monitor(this._expansionCell)
                .pipe(takeUntil(this._destroyed))
                .subscribe(origin => {
                    if (origin === 'keyboard') {
                        this._table._scrollElementIntoView(this._expansionCell, 8);
                    }
                });
            this._expansionCellPrevious = this._expansionCell;
        }
    }

    _onKeydown(event: KeyboardEvent) {
        if (event.keyCode === ENTER) {
            this.toggleGroup();
        } else if (event.keyCode === SPACE) {
            this.toggleGroup();
            event.preventDefault(); // prevent from scrolling
        }
    }

    getOpenState() {
        return this._expanded ? 'open' : 'closed';
    }

    get _expandedAreaColspan(): number {
        if (this._table.viewType === 'desktop' && this._useFullRowForExpandableArea) {
            return this._table._infoColumnCount() + 1;
        }
        return this._table._infoColumnCount();
    }
}
