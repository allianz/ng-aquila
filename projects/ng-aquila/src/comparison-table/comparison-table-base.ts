import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Injectable, InjectionToken, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { merge, Subject } from 'rxjs';
import { filter, mapTo, takeUntil } from 'rxjs/operators';

@Injectable()
export class ComparisonTableDefaultOptions {
  /** Sets if the expandable area of a row group uses the full width of the row or leaves out the first column. (optional) */
  useFullRowForExpandableArea?: boolean;
}

export const COMPARISON_TABLE_DEFAULT_OPTIONS =
  new InjectionToken<ComparisonTableDefaultOptions>('COMPARISON_TABLE_DEFAULT_OPTIONS');

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
  _hiddenIndexes: number[] = [];
  abstract selectedIndex: number;
  _destroyed: Subject<void> = new Subject();

  readonly viewTypeChange: EventEmitter<NxComparisonTableViewType> = new EventEmitter<NxComparisonTableViewType>();

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

  /** Get the mobile clipping path for a cell that should be cut when scrolling. */
  abstract _getMobileClipPathInset(cellRect: DOMRect): string;

  /**
   * Bring an element into view in case it is hidden by the sticky header row on top,
   * optionally with some additional space above the element.
   */
  abstract _scrollElementIntoView(element: ElementRef, additionalSpacing?: number);

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
      this._cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
