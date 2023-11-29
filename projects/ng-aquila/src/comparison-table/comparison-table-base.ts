import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { combineLatest, merge, Subject } from 'rxjs';
import { filter, map, mapTo, startWith, takeUntil } from 'rxjs/operators';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableViewType } from './comparison-table.models';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';

/** @docs-private */
@Directive()
export abstract class NxComparisonTableBase implements OnDestroy {
    selectedIndexChange!: EventEmitter<number>;

    _disabledIndexes: number[] = [];
    _hiddenIndexes: number[] = [];
    _view?: NxComparisonTableViewType | null;

    abstract selectedIndex: number;

    readonly viewTypeChange = new EventEmitter<NxComparisonTableViewType>();

    private _viewType: NxComparisonTableViewType = 'desktop';

    protected readonly _destroyed = new Subject<void>();

    abstract isError: boolean;

    /** Get all header cells of the table. */
    abstract _getHeaderCells(): NxComparisonTableCell[];

    /** How many product columns the table has. */
    abstract _infoColumnCount(): number;

    /** Get the popular cell of the table. */
    abstract _getPopularCell(): NxComparisonTablePopularCell;

    /** Add a column to the list of disabled columns. */
    abstract _addDisabledColumn(disabledColumn: number): void;

    /** Remove a column from the list of disabled columns. */
    abstract _removeDisabledColumn(enabledColumn: number): void;

    /** Get the mobile clipping path for a cell that should be cut when scrolling. */
    abstract _getMobileClipPathInset(cellRect: DOMRect): string;

    /**
     * Bring an element into view in case it is hidden by the sticky header row on top,
     * optionally with some additional space above the element.
     */
    abstract _scrollElementIntoView(element: ElementRef, additionalSpacing?: number): void;

    /** @docs-private */
    get viewType(): NxComparisonTableViewType {
        return this._viewType;
    }

    readonly _viewChanges = new Subject<void>();

    constructor(
        private readonly viewportService: NxViewportService,
        protected readonly _cdr: ChangeDetectorRef,
    ) {
        const mobile$ = this.viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM);
        const tablet$ = this.viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE);
        const desktop$ = this.viewportService.min(NxBreakpoints.BREAKPOINT_LARGE);

        const viewType$ = merge(
            mobile$.pipe(
                filter(value => value),
                mapTo('mobile' as NxComparisonTableViewType),
            ),
            tablet$.pipe(
                filter(value => value),
                mapTo('tablet' as NxComparisonTableViewType),
            ),
            desktop$.pipe(
                filter(value => value),
                mapTo('desktop' as NxComparisonTableViewType),
            ),
        );

        combineLatest([viewType$, this._viewChanges.pipe(startWith(null))])
            .pipe(
                // if set, prefer explicit layout over viewport
                map(([value]) => this._view ?? value),
                takeUntil(this._destroyed),
            )
            .subscribe(value => {
                if (this._viewType !== value) {
                    this.viewTypeChange.emit(value);
                }
                this._viewType = value;
                // We need to run change detection here or the view doesn't get updated
                // if the component is wrapped inside a parent with onPush change detection
                // we need mark for check as parts like the description cell look at the table's
                // viewType but because the description cell is part of ng-content it is not checked
                // when the comparison table view is checked but only when the component where the ng-content
                // gets declared is checked
                this._cdr.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
