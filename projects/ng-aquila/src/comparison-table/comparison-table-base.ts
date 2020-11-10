import { ChangeDetectorRef, Directive, EventEmitter, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { merge, Subject } from 'rxjs';
import { filter, mapTo, takeUntil } from 'rxjs/operators';

/**
 * @docs-private
 * The size of the window.
 */
export type NxComparisonTableViewType = 'mobile' | 'tablet' | 'desktop';

/** @docs-private */
@Directive()
export abstract class NxComparisonTableBase implements OnDestroy {

  selectedIndexChange: EventEmitter<number>;
  _disabledIndexes: number[] = [];
  abstract selectedIndex: number;
  _destroyed: Subject<void> = new Subject();

  _stickyPlaceholder = false;

  private _viewType: NxComparisonTableViewType = 'desktop';

  /** Get all header cells of the table. */
  abstract _getHeaderCells();

  /** How many product columns the table has. */
  abstract _infoColumnCount();

  /** Get the popular cell of the table. */
  abstract _getPopularCell();

  /** Add a column to the list of disabled columns. */
  abstract _addDisabledColumn(disabledColumn: number);

  /** Remove a column from the list of disabled columns. */
  abstract _removeDisabledColumn(enabledColumn: number);

  /** @docs-private */
  get viewType(): NxComparisonTableViewType {
    return this._viewType;
  }

  constructor(private viewportService: NxViewportService, protected _cdRef: ChangeDetectorRef) {
    const mobile$ = this.viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM);
    const tablet$ = this.viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE);
    const desktop$ = this.viewportService.min(NxBreakpoints.BREAKPOINT_LARGE);

    merge(
      mobile$.pipe(filter(value => value === true), mapTo('mobile' as NxComparisonTableViewType)),
      tablet$.pipe(filter(value => value === true), mapTo('tablet' as NxComparisonTableViewType)),
      desktop$.pipe(filter(value => value === true), mapTo('desktop' as NxComparisonTableViewType)),
    )
    .pipe(takeUntil(this._destroyed)).subscribe(value => {
      this._viewType = value;
      // We need to run change detection here or the view doesn't get updated
      // if the component is wrapped inside a parent with onPush change detection
      // we need mark for check as parts like the description cell look at the table's
      // viewType but because the description cell is part of ng-content it is not checked
      // when the comparison table view is checked but only when the component where the ng-content
      // gets declared is checked
      this._cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
      this._destroyed.next();
      this._destroyed.complete();
  }
}
