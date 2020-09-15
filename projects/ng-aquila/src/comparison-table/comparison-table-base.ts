import { Directive, EventEmitter, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService  } from '@aposin/ng-aquila/utils';
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
  selectedIndex: number;
  _destroyed: Subject<void> = new Subject();

  _stickyPlaceholder = false;

  private _viewType: NxComparisonTableViewType = 'desktop';

  /** Get all header cells of the table. */
  abstract _getHeaderCells();

  /** How many product columns the table has. */
  abstract _infoColumnCount();

  /** Add a column to the list of disabled columns. */
  abstract _addDisabledColumn(disabledColumn: number);

  /** Remove a column from the list of disabled columns. */
  abstract _removeDisabledColumn(enabledColumn: number);

  /** @docs-private */
  get viewType(): NxComparisonTableViewType {
    return this._viewType;
  }

  constructor(private viewportService: NxViewportService) {
    const mobile$ = this.viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM);
    const tablet$ = this.viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE);
    const desktop$ = this.viewportService.min(NxBreakpoints.BREAKPOINT_LARGE);

    merge(
      mobile$.pipe(filter(value => value === true), mapTo('mobile' as NxComparisonTableViewType)),
      tablet$.pipe(filter(value => value === true), mapTo('tablet' as NxComparisonTableViewType)),
      desktop$.pipe(filter(value => value === true), mapTo('desktop' as NxComparisonTableViewType)),
    ).pipe(takeUntil(this._destroyed)).subscribe(value => this._viewType = value);
  }

  ngOnDestroy() {
      this._destroyed.next();
      this._destroyed.complete();
  }
}
