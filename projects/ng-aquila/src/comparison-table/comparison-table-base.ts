import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxSurfaceAccentColor, NxSurfaceType } from '@allianz/ng-aquila/surface';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import {
  ChangeDetectorRef,
  computed,
  Directive,
  effect,
  EventEmitter,
  inject,
  InputSignal,
  Output,
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

  abstract readonly _hiddenIndexes: Signal<number[]>;

  /** The distinct hidden indexes that refer to an existing header cell. */
  readonly _hiddenIndexSet = computed<ReadonlySet<number>>(() => {
    const columnCount = this._headerCells().length;
    return new Set(
      this._hiddenIndexes().filter((i) => Number.isInteger(i) && i >= 0 && i < columnCount),
    );
  });

  /** A product column's position among the visible columns (the carousel pages in these). */
  _visibleColumnIndex(index: number): number {
    let hiddenBefore = 0;
    for (const hidden of this._hiddenIndexSet()) {
      if (hidden < index) {
        hiddenBefore++;
      }
    }
    return index - hiddenBefore;
  }

  abstract selectedIndex: number;

  /** An event that is dispatched each time the view type of the table has changed. */
  @Output() readonly viewTypeChange = new EventEmitter<NxComparisonTableViewType>();

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

  abstract readonly _headerCells: Signal<readonly NxComparisonTableCell[]>;

  /** Product columns that are not hidden. */
  abstract readonly _infoColumnCount: Signal<number>;

  /** How many product columns are fully shown at once (the carousel page-window width). */
  abstract readonly _visibleColumnCount: Signal<number>;

  abstract readonly _isOverflowing: Signal<boolean>;

  /** Current carousel page, 0-based, in product-column units. */
  abstract readonly _pageIndex: Signal<number>;

  abstract readonly _popularCell: Signal<NxComparisonTablePopularCell | undefined>;

  /**
   * The surface the header and footer cells sit on: the `colorScheme` input,
   * normalized and gated on A1. Read by the cells, which publish it to their
   * content via `NX_SURFACE`.
   */
  abstract readonly _surface: Signal<NxSurfaceType>;

  /** Accent hue of the header, for an `accent-attention` color scheme. */
  abstract readonly accentColor: Signal<NxSurfaceAccentColor>;

  /** Whether the header is currently pinned, not merely allowed to stick (`mayStick`). */
  abstract readonly _isHeaderStuck: Signal<boolean>;

  abstract readonly headlineSize: Signal<'l' | 'xl'>;

  readonly _disabledIndexes = computed<ReadonlySet<number>>(
    () =>
      new Set(
        this._headerCells()
          .filter((cell) => cell.disabledColumn)
          .map((cell) => cell.index),
      ),
  );

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
