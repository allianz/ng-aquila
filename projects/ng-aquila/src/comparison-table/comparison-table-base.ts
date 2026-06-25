import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import {
  ChangeDetectorRef,
  computed,
  Directive,
  effect,
  EventEmitter,
  inject,
  InputSignal,
  Signal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableViewType } from './comparison-table.models';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';

/** @docs-private */
@Directive({ standalone: true })
export abstract class NxComparisonTableBase {
  protected readonly _allianzOneOptions = inject<AllianzOneOptions>(ALLIANZ_ONE, {
    optional: true,
  });

  selectedIndexChange!: EventEmitter<number>;

  readonly _disabledIndexes = signal<ReadonlySet<number>>(new Set());
  abstract readonly _hiddenIndexes: Signal<number[]>;

  abstract selectedIndex: number;

  readonly viewTypeChange = new EventEmitter<NxComparisonTableViewType>();

  protected readonly _viewInput = signal<NxComparisonTableViewType | null | undefined>(undefined);

  protected readonly _viewportViewType: Signal<NxComparisonTableViewType>;
  protected abstract readonly _containerViewType: Signal<NxComparisonTableViewType>;
  protected abstract readonly responsiveMode: InputSignal<'viewport' | 'container' | undefined>;

  private _previousViewType: NxComparisonTableViewType | undefined;

  private readonly _detectedViewType = computed(() => {
    if (this.responsiveMode() === 'container') {
      return this._containerViewType();
    }
    return this._viewportViewType();
  });

  protected readonly _viewType = computed(() => {
    const resolved = this._viewInput() ?? this._detectedViewType();
    if (resolved === 'mobile' && this._allianzOneOptions?.enabled?.()) {
      return 'tablet';
    }
    return resolved;
  });

  abstract isError: boolean;

  /** All header cells of the table. */
  abstract readonly _headerCells: Signal<readonly NxComparisonTableCell[]>;

  /** How many product columns the table has. */
  abstract readonly _infoColumnCount: Signal<number>;

  /** How many product columns are fully shown at once (the carousel page-window width). */
  abstract readonly _visibleColumnCount: Signal<number>;

  /** Whether the table overflows its visible width (the carousel is active). */
  abstract readonly _isOverflowing: Signal<boolean>;

  /** Current carousel page, 0-based, in product-column units. */
  abstract readonly _pageIndex: Signal<number>;

  /** The popular cell of the table. */
  abstract readonly _popularCell: Signal<NxComparisonTablePopularCell | undefined>;

  /** Add a column to the list of disabled columns. */
  abstract _addDisabledColumn(disabledColumn: number): void;

  /** Remove a column from the list of disabled columns. */
  abstract _removeDisabledColumn(enabledColumn: number): void;

  /** @docs-private */
  get viewType(): NxComparisonTableViewType {
    return this._viewType();
  }

  constructor(
    viewportService: NxViewportService,
    protected readonly _cdr: ChangeDetectorRef,
  ) {
    const viewType$ = viewportService.viewportChange$.pipe(
      startWith(typeof window !== 'undefined' ? window.innerWidth : NxBreakpoints.BREAKPOINT_LARGE),
      map((width): NxComparisonTableViewType => {
        if (width < NxBreakpoints.BREAKPOINT_MEDIUM) return 'mobile';
        if (width < NxBreakpoints.BREAKPOINT_LARGE) return 'tablet';
        return 'desktop';
      }),
    );

    this._viewportViewType = toSignal(viewType$, { initialValue: 'desktop' });

    effect(() => {
      const type = this._viewType();
      if (this._previousViewType !== undefined && this._previousViewType !== type) {
        this.viewTypeChange.emit(type);
      }
      this._previousViewType = type;
      this._cdr.markForCheck();
    });
  }
}
