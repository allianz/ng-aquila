import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxViewportService } from '@allianz/ng-aquila/utils';
import { CdkMonitorFocus } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  signal,
  untracked,
  ViewChild,
  viewChild,
} from '@angular/core';

import {
  COMPARISON_TABLE_DEFAULT_OPTIONS,
  ComparisonTableDefaultOptions,
  NxComparisonTableBreakpoint,
  NxComparisonTableViewType,
} from './comparison-table.models';
import { NxComparisonTableBase } from './comparison-table-base';
import { NxComparisonTableIntl } from './comparison-table-intl';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionDirective } from './toggle-section/toggle-section.directive';

export const DEFAULT_BREAKPOINTS: NxComparisonTableBreakpoint[] = [
  { minWidth: 0, viewType: 'mobile', columns: 1 },
  { minWidth: 320, viewType: 'mobile', columns: 2 },
  { minWidth: 704, viewType: 'tablet', columns: 3 },
  { minWidth: 992, viewType: 'desktop', columns: 3 },
];

/** Desktop/tablet cells that get a measured `--ct-cell-start`; also the population fingerprint. */
const CLIP_CELL_SELECTOR = '.nx-comparison-table__cell, .nx-comparison-table__popular-cell';

@Component({
  selector: 'nx-comparison-table',
  templateUrl: './comparison-table.component.html',
  styleUrls: ['./comparison-table.component.scss'],
  providers: [{ provide: NxComparisonTableBase, useExisting: NxComparisonTableComponent }],
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[class.is-desktop-view]': 'viewType === "desktop"',
    '[class.is-tablet-view]': 'viewType === "tablet"',
    '[class.is-a1]': '_isA1()',
    '[class.is-overflowing]': '_isOverflowing()',
    '[attr.dir]': '_dirValue',
  },
  imports: [NgTemplateOutlet, NxIconModule, CdkMonitorFocus, NxIconButtonComponent],
})
export class NxComparisonTableComponent
  extends NxComparisonTableBase
  implements OnInit, AfterViewInit, OnDestroy
{
  protected readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  readonly _intl = inject(NxComparisonTableIntl);

  private readonly _defaultOptions = inject<ComparisonTableDefaultOptions | null>(
    COMPARISON_TABLE_DEFAULT_OPTIONS,
    { optional: true },
  );
  private readonly _destroyRef = inject(DestroyRef);

  /** Switches viewType detection between viewport-based and container-based. */
  readonly responsiveMode = input<'viewport' | 'container' | undefined>(
    this._defaultOptions?.responsiveMode ?? 'viewport',
  );

  /** Breakpoint configuration for container-based responsive behavior. */
  readonly responsiveBreakpoints = input<NxComparisonTableBreakpoint[] | undefined>(undefined);

  /**
   * Size for the `nx-comparison-table-header-title` slot of every header cell, overriding the
   * projected `nxHeadline`'s own `size`. A docked header steps it down — see
   * `NxComparisonTableCell.headlineSize`.
   */
  readonly headlineSize = input<'l' | 'xl'>('xl');

  protected readonly _measuredWidth = signal(0);

  private readonly _effectiveBreakpoints = computed(
    () =>
      this.responsiveBreakpoints() ??
      this._defaultOptions?.responsiveBreakpoints ??
      DEFAULT_BREAKPOINTS,
  );

  private readonly _resolvedBreakpoint = computed(() => {
    const bps = this._effectiveBreakpoints()
      .slice()
      .sort((a, b) => a.minWidth - b.minWidth);
    const w = this._measuredWidth();
    let viewType: NxComparisonTableViewType = 'mobile';
    let columns = 1;
    for (const bp of bps) {
      if (bp.minWidth > w) break;
      if (bp.viewType !== undefined) viewType = bp.viewType;
      if (bp.columns !== undefined) columns = bp.columns;
    }
    return { viewType, columns };
  });

  protected readonly _containerViewType = computed(() => this._resolvedBreakpoint().viewType);

  private readonly visibleColumns = computed(() =>
    Math.min(this._resolvedBreakpoint().columns, this._infoColumnCount()),
  );

  @ViewChild('stickyMobileCell') _stickyMobileCell!: ElementRef;

  // ── Transform carousel (desktop/tablet) ───────────────────────────────────────
  /** The outer wrapper; the nav-button overlay is positioned within it (outside the clip). */
  private readonly _native = viewChild<ElementRef<HTMLElement>>('native');
  /** The clipped viewport around the table — overflow-x: clip hides the off-screen columns. */
  private readonly _viewport = viewChild<ElementRef<HTMLElement>>('viewport');

  private readonly _isHeaderStuckState = signal(false);

  /**
   * Whether the sticky header row is currently pinned (vs. merely sticky-*eligible*, which
   * `thead.is-sticky`/`mayStick` already expresses). `position: sticky` gives no such signal by
   * itself, so `_updateStuck` derives it from the header's position — see that method.
   */
  readonly _isHeaderStuck = this._isHeaderStuckState.asReadonly();

  /**
   * Number of columns that fill the visible width: the visible product columns, plus the
   * row-header column on desktop. The SCSS sizes each column to `100cqi / colsShown` so
   * exactly this many columns fit before the rest overflow (and are reachable by paging).
   */
  protected readonly _colsShown = computed(
    () => this._visibleColumnCount() + (this.viewType === 'desktop' ? 1 : 0),
  );

  /**
   * Current carousel page, in units of one product column (0 = first column at the inline
   * start). The product cells are translated by `-_pageIndex * columnStep`; clamped to
   * `[0, _maxPageIndex]`. Public (satisfies the base contract) so cells can read it to fade
   * themselves out when their column scrolls out of the page window; only the component mutates it.
   */
  readonly _pageIndex = signal(0);

  /** How many single-column steps the carousel can advance (0 when everything fits). */
  protected readonly _maxPageIndex = computed(() =>
    Math.max(0, this._infoColumnCount() - this._visibleColumnCount()),
  );

  protected readonly _isAtStart = computed(() => this._pageIndex() <= 0);
  protected readonly _isAtEnd = computed(() => this._pageIndex() >= this._maxPageIndex());

  /** Width of one product column step (column box + inter-column gap), in px. Measured. */
  private _columnStepPx = 0;

  /** @docs-private */
  readonly elements = contentChildren(NxTableContentElement, { descendants: true });

  @Input() set isError(error: boolean) {
    this._isError = error;
  }
  get isError(): boolean {
    return this._isError;
  }
  private _isError!: boolean;

  /** Sets which info column is selected. */
  @Input() set selectedIndex(value: NumberInput) {
    const newValue = coerceNumberProperty(value);
    const oldValue = this._selectedIndexReactive();
    if (oldValue !== newValue) {
      this._selectedIndexReactive.set(newValue);
      this.selectedIndexChange.emit(newValue);
    }
  }
  get selectedIndex(): number {
    return this._selectedIndexReactive();
  }
  private readonly _selectedIndexReactive = signal<number>(-1);

  /** An event that is is dispatched each time selected index of the table has changed. */
  @Output() readonly selectedIndexChange = new EventEmitter<number>();

  /** Sets which column is hidden. */
  @Input() set hiddenIndexes(value: number[]) {
    this._hiddenIndexes.set(coerceArray(value));
  }
  get hiddenIndexes(): number[] {
    return this._hiddenIndexes();
  }
  readonly _hiddenIndexes = signal<number[]>([]);

  /** Sets the layout explicitely. If not specified, a layout will be set based on the viewport. */
  @Input() set view(value: NxComparisonTableViewType | null | undefined) {
    this._viewInput.set(value);
  }
  get view(): NxComparisonTableViewType | null | undefined {
    return this._viewInput();
  }

  constructor(
    private readonly _element: ElementRef,
    @Optional() private readonly _dir: Directionality | null,
    viewportService: NxViewportService,
    protected readonly _cdr: ChangeDetectorRef,
    private readonly _ngZone: NgZone,
  ) {
    super(viewportService, _cdr);

    this._ngZone.runOutsideAngular(() => {
      const observer = new ResizeObserver((entries) => {
        const width = entries[0].contentRect.width;
        const widthChanged = width !== this._measuredWidth();
        if (widthChanged) {
          this._ngZone.run(() => this._measuredWidth.set(width));
        }
        // A wider viewport fits more columns → fewer pages; re-clamp before measuring so the shift
        // and clip are written from the clamped index (same ordering as the view-type effect below).
        const max = this._maxPageIndex();
        if (this._pageIndex() > max) {
          this._ngZone.run(() => this._pageIndex.set(max));
        }
        // The horizontal geometry — column step, per-cell inline offsets, visible end, sticky
        // column width — follows the container WIDTH and the cell population; a taller row cannot
        // move a cell horizontally. A height-only change is almost always the sticky header's own
        // dock transition, which fires this observer frame after frame: re-measuring everything
        // there cost ~5 full passes (~300 getBoundingClientRect) per dock. Re-measure the header
        // band only — that IS what the transition changes, and --ct-thead-h feeds the viewport's
        // negative margin. `_measureClipGeometry` re-asserts the page shift itself; the light path
        // cannot need it, because every input of `_maxPageIndex` (the header-cell count via
        // `_infoColumnCount`, the width via `_visibleColumnCount`) routes to the full path.
        // Mobile always takes the full path: it has no sticky header, so it never sees the
        // transition this split exists for, and its geometry is keyed off elements the fingerprint
        // below does not track.
        if (widthChanged || this.viewType === 'mobile' || this._clipCellCountChanged()) {
          this._measureClipGeometry();
        } else {
          const native = this._native()?.nativeElement;
          if (native) {
            this._measureHeaderBand(native);
          }
          this._updateClip();
        }
        this._updateStuck();
      });
      observer.observe(this._element.nativeElement);
      this._destroyRef.onDestroy(() => observer.disconnect());

      // Track viewport visibility so the page-wide scroll listener can skip the clip update
      // while the table is off-screen (see `_scrollHandler`). The margin keeps the clip fresh
      // just before the table scrolls into view, avoiding a flash of un-clipped content.
      const visibility = new IntersectionObserver(
        (entries) => {
          const wasVisible = this._isVisible;
          this._isVisible = entries[entries.length - 1].isIntersecting;
          // Catch up the clip to the current scroll position on the way back into view.
          if (this._isVisible && !wasVisible) {
            this._updateClip();
            this._updateStuck();
          }
        },
        { rootMargin: '200px' },
      );
      visibility.observe(this._element.nativeElement);
      this._destroyRef.onDestroy(() => visibility.disconnect());
    });

    afterNextRender(() => {
      const width = this._element.nativeElement.getBoundingClientRect?.().width;
      if (width && width !== this._measuredWidth()) {
        this._measuredWidth.set(width);
      }
      this._measureClipGeometry();
      this._applyPageShift();
      this._updateStuck();
    });

    // Re-measure whenever the viewport is (re)created — e.g. when the view type flips between
    // mobile (no viewport) and desktop/tablet — OR whenever the view type itself settles on a new
    // value. The #viewport/#native viewChild is SHARED across tablet and desktop (only mobile swaps
    // the template), so a tablet↔desktop flip does NOT recreate it; without reading _viewType()
    // here the desktop-gated geometry (--ct-cell-start, sticky width, column step) would never be
    // re-measured for the new layout and stale values would over-clip the columns.
    effect(() => {
      this._viewport();
      this._viewType();
      this.visibleColumns();
      afterNextRender(
        () => {
          // A view-type change can grow the visible column count → fewer pages; re-clamp so we
          // never sit past the new end (same guard as the ResizeObserver). Must run before
          // _applyPageShift so the shift/clip use the clamped index.
          const max = this._maxPageIndex();
          if (this._pageIndex() > max) {
            this._pageIndex.set(max);
          }
          this._measureClipGeometry();
          this._applyPageShift();
        },
        { injector: this._injector },
      );
    });

    // Settled writer for the carousel offset: whenever the page index (or the measured column
    // step, surfaced via _measuredWidth) changes, write the resting transform + clip. The live
    // gesture pan writes --ct-page-shift straight to the DOM and is NOT reflected here, so the
    // two writers never overlap in time (the gesture commits _pageIndex on touchend).
    effect(() => {
      this._pageIndex();
      this._measuredWidth();
      this._applyPageShift();
    });

    // Re-evaluate when the wrapper is (re)created or the header row opts out of sticky. `untracked`
    // keeps `_updateStuck`'s own read of `_isHeaderStuck` from making every dock re-arm this effect.
    // Deferred to `afterNextRender`, because `mayStick` also drives `thead.is-sticky` in the
    // template: measured before that class lands, a re-enabled header is still in flow and its top
    // matches `.__native`'s, so we would read "not stuck" and nothing would correct it until the
    // next scroll event.
    effect(() => {
      this._native();
      void this._headerRow()?.mayStick;
      afterNextRender(() => untracked(() => this._updateStuck()), { injector: this._injector });
    });
  }

  /**
   * Recomputes `_isHeaderStuck` from `getBoundingClientRect()`, not an IntersectionObserver
   * (unreliable here: it pins to the nearest scrolling ancestor, not necessarily an observer's
   * `root`). Compares against `<thead>` itself — the actual `position: sticky; top: 0` element
   * (per-cell sticky in this file's .scss has no offset, so it never pins) — rather than a specific
   * cell, since a preceding popular row would otherwise offset the comparison.
   *
   * `.__native`'s own top edge is the reference for where `<thead>` would sit unpinned: the
   * nav-wrapper's `height: var(--ct-thead-h)` is cancelled by the viewport's matching negative
   * `margin-block-start`, so the thead's in-flow top coincides with `.__native`'s (verified to the
   * pixel at every scroll offset). No separate sentinel element is needed.
   */
  private _updateStuck(): void {
    const native = this._native()?.nativeElement;
    const mayStick = this._headerRow()?.mayStick ?? false;
    let isStuck = false;
    if (native && mayStick) {
      if (this._clipThead === undefined) {
        this._resolveClipTargets(this._element.nativeElement as HTMLElement);
      }
      const thead = this._clipThead;
      // Strictly `<`: before the header sticks, it moves in lockstep with `.__native`, so the two
      // stay equal (not just momentarily) until the header actually freezes in place.
      isStuck = !!thead && native.getBoundingClientRect().top < thead.getBoundingClientRect().top;
    }
    if (isStuck !== this._isHeaderStuck()) {
      this._ngZone.run(() => this._isHeaderStuckState.set(isStuck));
    }
  }

  /** Pending rAF id for `_scheduleUpdateStuck`, or `null` if none is queued. */
  private _stuckRaf: number | null = null;

  /**
   * Coalesces `_updateStuck` calls from the scroll path to at most one `getBoundingClientRect`
   * pair per animation frame, instead of one per raw scroll event (WebKit dispatches scroll
   * faster than once per frame — see `_scrollHandler`). Unlike `_updateClip`, `_isHeaderStuck`
   * has no same-frame requirement: its visual effects already ease in over 100-200ms via the
   * `comparison-table-header-stuck-transition-*` tokens, so landing a frame late is imperceptible.
   *
   * Bails before allocating the frame when nothing can be pinned at all — mobile has no `#native`,
   * and a header row can opt out — so unrelated page scrolling costs no frame callback either.
   */
  private _scheduleUpdateStuck(): void {
    if (this._stuckRaf !== null || !this._native() || !this._headerRow()?.mayStick) {
      return;
    }
    this._stuckRaf = requestAnimationFrame(() => {
      this._stuckRaf = null;
      this._updateStuck();
    });
  }

  // ── Carousel page offset ──────────────────────────────────────────────────────
  /**
   * Write the resting carousel offset (and the horizontal clip that follows from it) for the
   * current `_pageIndex`. `--ct-page-shift` translates the product cells; `--ct-clip-istart`
   * feeds the per-cell clip that hides the columns sliding under the sticky first column.
   *   shift   = -dir * pageIndex * columnStep   (dir = -1 in RTL, so RTL shifts the other way)
   *   istart  = stickyColumnWidth + pageIndex * columnStep   (always grows toward the end)
   */
  private _applyPageShift(): void {
    const native = this._native()?.nativeElement;
    if (!native || this.viewType === 'mobile') {
      return;
    }
    const dir = this._dirValue === 'rtl' ? -1 : 1;
    const offset = this._pageIndex() * this._columnStepPx;
    this._writeCarouselOffset(native, -dir * offset, this._stickyColWidth + offset);
  }

  /**
   * Both vars go on `native`: the product cells pick `--ct-page-shift` up by inheritance for
   * their `translateX`, and the touch-pan handlers read it back as the source of truth. Rounded
   * to whole px because `_measureClipGeometry` parses this value back out to recover each cell's
   * resting position, and because sub-pixel transforms force text re-rasterisation on every frame.
   */
  private _writeCarouselOffset(native: HTMLElement, shiftPx: number, clipIstartPx: number): void {
    this._setVarIfChanged(native, '--ct-page-shift', `${Math.round(shiftPx)}px`);
    this._setVarIfChanged(native, '--ct-clip-istart', `${Math.round(clipIstartPx)}px`);
  }

  /** Skips the write (and the style invalidation it triggers) when the value is unchanged. */
  private _setVarIfChanged(el: HTMLElement | null | undefined, name: string, value: string): void {
    if (el && el.style.getPropertyValue(name) !== value) {
      el.style.setProperty(name, value);
    }
  }

  // ── Sticky-column / header clipping (all views) ───────────────────────────────
  // Geometry (sticky-column width, each cell's inline offset) is measured ONLY on layout
  // changes and cached as CSS variables; the hot scroll path then writes a single variable
  // and lets the browser recompute the clips — no per-frame layout reads, so it runs
  // synchronously on every scroll event. Mobile uses the SAME mechanism on its (transposed)
  // sticky first column — the host element is the scroller. See the clip rules in the .scss
  // for why cells are clipped (rather than filled with a background) and the CSS-var contract.

  /** Cached width of the sticky first column (its inline-start offset), in px. */
  private _stickyColWidth = 0;

  /**
   * Shadow room (px) reserved at the top/bottom of the viewport (= --ct-shadow). Cached here from
   * the viewport's resolved padding-top during layout measurement so the hot scroll path
   * (`_updateClip`) needs no getComputedStyle read. Reading --ct-shadow back directly is unreliable
   * (it is an unregistered var()-chained custom property), so we read the padding it produced.
   */
  private _shadowReserve = 0;

  // Cached desktop/tablet vertical-clip targets for the hot scroll path, so _updateClip walks no
  // DOM per scroll event — and the <thead> box, so `_updateStuck` doesn't either. Resolved during
  // _measureClipGeometry — the single chokepoint for every change that recreates these elements: a
  // view-type flip swaps the table template, and any content/size change is caught by the host
  // ResizeObserver, both of which re-run measurement.
  // null = element absent in the current view (e.g. a table with no tfoot); undefined = not yet
  // resolved (a scroll/IntersectionObserver event that beat the first measurement — resolved lazily).
  private _clipHeaderCard: HTMLElement | null | undefined;
  private _clipBody: HTMLElement | null | undefined;
  private _clipFooter: HTMLElement | null | undefined;
  private _clipThead: HTMLElement | null | undefined;

  /** Resolve (and cache) the desktop/tablet vertical-clip target elements from the live DOM. */
  private _resolveClipTargets(host: HTMLElement): void {
    this._clipHeaderCard =
      host.querySelector<HTMLElement>('thead .is-header-row .nx-comparison-table__cell-inner') ??
      host.querySelector<HTMLElement>('thead .is-header-row');
    this._clipBody = host.querySelector<HTMLElement>('tbody');
    this._clipFooter = host.querySelector<HTMLElement>('tfoot');
    this._clipThead = host.querySelector<HTMLElement>('thead');
  }

  /** Live count of the cells that carry a measured `--ct-cell-start`; see the ResizeObserver. */
  private _clipCellCount = -1;

  /**
   * Whether the clippable-cell population moved since the last measurement — i.e. whether a row or
   * column was added/removed rather than merely resized. One `querySelectorAll`, no layout read.
   */
  private _clipCellCountChanged(): boolean {
    const host = this._element.nativeElement as HTMLElement;
    return host.querySelectorAll(CLIP_CELL_SELECTOR).length !== this._clipCellCount;
  }

  /**
   * `.is-measuring` only keeps transitions from starting, so a glide already running would leave
   * the reads mid-transform while `--ct-page-shift` already reads as the destination. `finish()`,
   * not `cancel()`: the end value is where the carousel was going anyway.
   */
  private _finishCarouselTransitions(host: HTMLElement): void {
    for (const animation of host.getAnimations?.({ subtree: true }) ?? []) {
      if ((animation as { transitionProperty?: string }).transitionProperty !== 'transform') {
        continue;
      }
      const target = (animation.effect as KeyframeEffect | null)?.target;
      if (target?.classList.contains('nx-comparison-table__product-cell')) {
        animation.finish();
      }
    }
  }

  /**
   * Measure the clip geometry and stamp it onto the DOM as CSS variables. Reads layout, so it
   * runs only when the structure or size changes — never on scroll. Sets each scrolling cell's
   * static inline-start offset (--ct-cell-start) and caches the sticky column width.
   */
  private _measureClipGeometry(): void {
    const rtl = this._dirValue === 'rtl';

    // Invalidate the cached hot-path clip targets: a flip to mobile must leave no stale desktop
    // refs, and the desktop/tablet path re-resolves them below before the trailing _updateClip.
    this._clipHeaderCard = this._clipBody = this._clipFooter = this._clipThead = undefined;

    // Mobile: the host element is the horizontal scroller and the first column of the
    // transposed table is sticky. Measure the sticky column width and each clippable cell's
    // static inline-start offset, exactly as desktop does — only the scroll container differs.
    if (this.viewType === 'mobile') {
      const sticky = this._stickyMobileCell?.nativeElement as HTMLElement | undefined;
      if (!sticky) {
        return;
      }
      const host = this._element.nativeElement as HTMLElement;

      // Batched DOM access: keep every getBoundingClientRect/scrollLeft READ in this read
      // phase and every style.setProperty WRITE in the write phase below. Interleaving them
      // reintroduces layout thrashing the moment any written variable feeds a layout-affecting
      // property — today --ct-cell-start only drives clip-path (paint-only), so the structure,
      // not the value, must be what keeps this safe.
      const hostRect = host.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const scrollLeft = Math.abs(host.scrollLeft);
      this._stickyColWidth = rtl
        ? hostRect.right - stickyRect.left
        : stickyRect.right - hostRect.left;

      // Only the cells that scroll UNDER the sticky first column: the description cells, the
      // toggle-section headers, and their placeholders. NOT the generic .mobile-cell — the
      // first (sticky) column is itself made of mobile cells and must never be clipped.
      const cells = host.querySelectorAll<HTMLElement>(
        '.nx-comparison-table__description-cell, .nx-comparison-table__mobile-toggle-section-header, .needs-clipping',
      );
      const cellStarts: { cell: HTMLElement; start: number }[] = [];
      for (const cell of cells) {
        const cellRect = cell.getBoundingClientRect();
        const start = rtl
          ? hostRect.right - cellRect.right + scrollLeft
          : cellRect.left - hostRect.left + scrollLeft;
        cellStarts.push({ cell, start });
      }

      // Write phase: all reads are done, so these writes can't force a reflow on a subsequent read.
      this._setVarIfChanged(host, '--ct-sticky-w', `${Math.round(this._stickyColWidth)}px`);
      for (const { cell, start } of cellStarts) {
        this._setVarIfChanged(cell, '--ct-cell-start', `${Math.round(start)}px`);
      }
      this._updateClip();
      return;
    }

    const viewport = this._viewport()?.nativeElement;
    if (!viewport) {
      return;
    }

    // Cache the top shadow reserve (= --ct-shadow) from the viewport's resolved padding-top,
    // so `_updateClip` can compare against it on the hot path without a getComputedStyle read.
    const vpStyle = getComputedStyle(viewport);
    this._shadowReserve = parseFloat(vpStyle.paddingTop) || 0;
    // The viewport carries a real `padding-inline-start: --ct-shadow` (+ a compensating negative
    // margin) so the leftmost card's shadow lives inside the overflow-clip box cross-engine. That
    // negative margin shifts the viewport's BORDER-box inline-start edge (vp.left/vp.right below)
    // out by --ct-shadow, so the viewport-relative measurements must be anchored to the CONTENT-box
    // inline-start instead — i.e. offset by this resolved padding. = 0 in base themes (no-op).
    const padInlineStart = parseFloat(vpStyle.paddingInlineStart) || 0;

    // Measure the column step (product column box + inter-column gap), in px, from the first two
    // visible product cells of the header row. Measuring the live offset (rather than computing
    // colWidth + token gap) keeps the carousel translate and the per-cell clip in lockstep across
    // themes: A1 has a 16px border-spacing gap, the default theme has 0 — the step MUST include it.
    const host = this._element.nativeElement as HTMLElement;
    const productCells = host.querySelectorAll<HTMLElement>(
      'thead .is-header-row .nx-comparison-table__product-cell',
    );
    if (productCells.length >= 2) {
      const a = productCells[0].getBoundingClientRect();
      const b = productCells[1].getBoundingClientRect();
      this._columnStepPx = Math.abs(b.left - a.left);
    } else if (productCells.length === 1) {
      const a = productCells[0].getBoundingClientRect();
      this._columnStepPx = a.width;
    }

    const native = this._native()?.nativeElement;
    this._element.nativeElement.classList.add('is-measuring');
    this._finishCarouselTransitions(host);

    // Product cells carry a live `translateX(shift)`, so the reads below see them displaced. Back
    // that displacement out rather than zeroing the shift to read resting positions: zeroing is a
    // real value change, and it would drag the cells to 0 and back on every measure. Valid only
    // because `_finishCarouselTransitions` just parked every cell ON this value.
    const currentShiftPx = native
      ? parseFloat(native.style.getPropertyValue('--ct-page-shift')) || 0
      : 0;

    // ── Read phase ──: keep every getBoundingClientRect here and every style.setProperty in the
    // write phase below, so a layout-affecting write (e.g. --ct-visible-end drives a banner width)
    // can't force a reflow on a subsequent read.
    const vp = viewport.getBoundingClientRect();

    // Right edge of the last FULLY-visible column, in viewport coords (a fixed position — it does
    // not move as the carousel pages). Spanning banners (intersection, toggle-section header,
    // row-group expander, tablet description) cap their width here so they end flush with that
    // column instead of bleeding into the peek sliver of the next column.
    //
    // Derived geometrically — the last header product cell whose far edge still fits within the
    // viewport — rather than from `_visibleColumnCount()`, because the column-count signal can lag
    // a frame behind the resolved breakpoint when this runs from the ResizeObserver, which would
    // pick the wrong column.
    const headerProducts = host.querySelectorAll<HTMLElement>(
      '.is-header-row .nx-comparison-table__product-cell',
    );
    let visibleEnd: number | null = null;
    // Content-box inline-start origin (border-box edge minus the inline-start shadow padding), so
    // the stamped values match the pre-shadow-padding geometry. 1px slack absorbs sub-pixel
    // rounding so a column sitting exactly at the edge still counts.
    const limit = vp.width - padInlineStart + 1;
    for (const cell of headerProducts) {
      const r = cell.getBoundingClientRect();
      const far = rtl
        ? vp.right - padInlineStart - (r.left - currentShiftPx)
        : r.right - currentShiftPx - (vp.left + padInlineStart);
      if (far <= limit) {
        visibleEnd = far;
      } else {
        break;
      }
    }

    // Each product cell's resting inline-start offset, measured from the VIEWPORT inline-start
    // (x = 0 is the start of the sticky first column). The per-cell clip hides the band of the
    // cell that sits under the sticky column: clamp(--ct-clip-istart − --ct-cell-start). Measuring
    // from the viewport (not the table edge, which sits one phantom border-spacing gap further
    // out) is what keeps a fully-hidden cell clipped to exactly 0 in A1, where the gap is 16px.
    // Include the popular cell: it sits in .is-popular-row (not .is-header-row) and is not a
    // .nx-comparison-table__cell, but it translates with the carousel and so must be clipped under
    // the sticky column too — it needs its own resting --ct-cell-start to clip against.
    // Queried (not measured) on tablet too, so `_clipCellCountChanged` has a live population count
    // to compare against in either view.
    const cells = host.querySelectorAll<HTMLElement>(CLIP_CELL_SELECTOR);
    this._clipCellCount = cells.length;

    // Sticky column width + per-cell offsets: desktop only (tablet has no sticky first column).
    let stickyW = 0;
    const cellStarts: { cell: HTMLElement; start: number }[] = [];
    if (this.viewType === 'desktop') {
      const firstCol = host.querySelector<HTMLElement>(
        'tbody .nx-comparison-table__description-cell, tbody .is-content-row .nx-comparison-table__corner-cell',
      );
      stickyW = firstCol ? firstCol.getBoundingClientRect().width : 0;

      for (const cell of cells) {
        const cellRect = cell.getBoundingClientRect();
        // Only cells with the carousel's transform (product cells) need the shift subtracted.
        const shift = cell.classList.contains('nx-comparison-table__product-cell')
          ? currentShiftPx
          : 0;
        // Measure from the viewport's CONTENT-box inline-start (border-box edge minus the
        // inline-start shadow padding), so the offset is unchanged by that padding (= 0 in base).
        const start = rtl
          ? vp.right - padInlineStart - (cellRect.right - shift)
          : cellRect.left - shift - (vp.left + padInlineStart);
        cellStarts.push({ cell, start });
      }
    }

    // Last read of this pass; reads then writes internally, so the boundary below still holds.
    if (native) {
      this._measureHeaderBand(native);
    }

    // ── Write phase ──: all reads are done.
    this._stickyColWidth = stickyW;
    if (visibleEnd != null) {
      this._setVarIfChanged(native, '--ct-visible-end', `${Math.round(visibleEnd)}px`);
    }
    this._setVarIfChanged(native, '--ct-sticky-w', `${Math.round(stickyW)}px`);
    if (this.viewType === 'desktop') {
      // Expose the sticky column width so the intersection banner beside it pins to the product
      // area [stickyColWidth, visibleEnd] instead of the whole viewport.
      for (const { cell, start } of cellStarts) {
        this._setVarIfChanged(cell, '--ct-cell-start', `${Math.round(start)}px`);
      }
    }
    this._applyPageShift();
    this._element.nativeElement.classList.remove('is-measuring');
    // Cache the vertical-clip targets so the per-scroll _updateClip walks no DOM (see fields).
    this._resolveClipTargets(host);
    this._updateClip();
  }

  /**
   * Measure the sticky header band's geometry and stamp it on `native`. Split out of
   * `_measureClipGeometry` because this is the ONLY part the stuck/unstuck transition can change:
   * that transition animates the header's padding and slot spacing, so it resizes the host on frame
   * after frame, and the host ResizeObserver reruns from each one. Re-measuring the horizontal
   * geometry there is wasted (a shorter header cannot move a cell sideways) and dominated the cost
   * — see the ResizeObserver for the numbers.
   */
  private _measureHeaderBand(native: HTMLElement): void {
    // Vertical center of the header card, so the nav buttons (absolutely positioned at
    // `top: --ct-nav-center` inside the sticky wrapper, OUTSIDE the clipped viewport) sit centered
    // on it. Only meaningful when overflowing (no nav buttons otherwise); the card height is dynamic
    // (popular row, content, A1 padding), so it is measured here rather than hardcoded in CSS.
    //
    // Measure the card's center RELATIVE TO THE NAV-WRAPPER (the buttons' own containing block),
    // NOT to .__native. The header card lives in `thead.is-sticky` (pinned at top:0) and the wrapper
    // is `position: sticky; top:0` too, so the two share the same pinned coordinate frame and the
    // delta is scroll-invariant. .__native is NOT sticky: against it, `cardRect.top - nativeRect.top`
    // is the true resting offset only at scroll 0 — once the header pins while the page is scrolled
    // (e.g. this re-measure fires from the ResizeObserver on a row-group expand, by which point the
    // user has scrolled down to the expander), cardRect.top stays ~0 while nativeRect.top goes deeply
    // negative, so the delta balloons to the scroll distance and the buttons drop toward the footer.
    // At rest wrapperRect.top == nativeRect.top (the wrapper is the 0-height first child of .__native,
    // no padding/border between them), so the resting value is unchanged.
    // Safe to read while the carousel is snapped (shift = 0): the shift is translateX on product
    // cells only, so the card's vertical position/height is unaffected.
    let navCenter: number | null = null;
    // Height of the sticky header band (popular + header rows), so the nav-wrapper can carry a real
    // height and its sticky containment releases in lockstep with the header instead of lingering
    // until the whole table scrolls off (see the SCSS for --ct-thead-h). Measured from the <thead>
    // box bottom to the wrapper top, in the SAME scroll-invariant frame as navCenter (wrapper top ==
    // thead top at rest; both pin at top:0). Using the whole thead box keeps theadHeight >= navCenter,
    // so the buttons always sit INSIDE the wrapper's box and never dangle below the header band.
    let theadHeight: number | null = null;
    if (this._isOverflowing()) {
      const wrapper = native.querySelector<HTMLElement>('.nx-comparison-table__nav-wrapper');
      const card =
        native.querySelector<HTMLElement>(
          'thead .is-header-row .nx-comparison-table__cell-inner',
        ) ?? native.querySelector<HTMLElement>('thead .is-header-row');
      const thead = native.querySelector<HTMLElement>('thead');
      if (wrapper && card) {
        const wrapperRect = wrapper.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        navCenter = Math.round(cardRect.top - wrapperRect.top + cardRect.height / 2);
        if (thead) {
          theadHeight = Math.round(thead.getBoundingClientRect().bottom - wrapperRect.top);
        }
      }
    }

    if (navCenter !== null) {
      this._setVarIfChanged(native, '--ct-nav-center', `${navCenter}px`);
    }
    this._setVarIfChanged(native, '--ct-thead-h', `${theadHeight ?? 0}px`);
  }

  /**
   * Vertical clip only (`--ct-clip-top`: how far the body has scrolled up behind the sticky header).
   * The horizontal clip is owned by `_applyPageShift` — carousel-driven, not scroll-driven.
   */
  private _updateClip(): void {
    // Mobile: write the live inline-scroll position onto the host; the per-cell CSS clamp
    // (--ct-clip-istart − --ct-cell-start) does the rest. No sticky header, so no --ct-clip-top.
    if (this.viewType === 'mobile') {
      const host = this._element.nativeElement as HTMLElement;
      const scrollLeft = Math.abs(host.scrollLeft);
      this._setVarIfChanged(host, '--ct-clip-istart', `${this._stickyColWidth + scrollLeft}px`);
      return;
    }
    const native = this._native()?.nativeElement;
    const host = this._element.nativeElement as HTMLElement;
    if (!native) {
      return;
    }

    // Vertical occlusion: hide the part of an element that has scrolled up behind the pinned header
    // card. `overlap` = how far the header card's visible bottom edge sits below the element's top
    // edge. At rest the viewport's negative top margin puts the element's top at the header box
    // bottom, so overlap ≈ -spacing (the card bottom is one padding above it) → clamped to -reserve,
    // i.e. no clipping. Once the element scrolls up past the card bottom (overlap > reserve) we clip
    // exactly that much so content disappears at the visible header edge; the -reserve resting value
    // keeps the top border + shadow uncropped, matching the other three sides. (reserve = 0 in
    // non-A1 themes.)
    //
    // Reference the header CARD's bottom, NOT the <thead> box bottom: the header cells carry a
    // transparent bottom padding (--comparison-table-header-spacing-bottom, the resting gap to the
    // first content row), so the box bottom sits a padding's-worth BELOW the visible card. Clipping
    // at the box bottom held scrolling content that far from the card — a transparent band stayed
    // between the header and the first visible row, and content appeared to jump back from the
    // header as the clip engaged. The card bottom lets content slide up to the visible header edge.
    // Targets are cached by _measureClipGeometry; resolve lazily if a scroll / IntersectionObserver
    // catch-up beat the first measurement (cold cache → all three still undefined).
    if (this._clipBody === undefined) {
      this._resolveClipTargets(host);
    }
    const headerCard = this._clipHeaderCard;
    const reserve = this._shadowReserve;
    const headerBottom = headerCard ? headerCard.getBoundingClientRect().bottom : 0;
    const clipFromTop = (el: HTMLElement | null | undefined): number => {
      if (!headerCard || !el) {
        return 0;
      }
      const overlap = headerBottom - el.getBoundingClientRect().top;
      return overlap > reserve + 0.5 ? Math.round(overlap) : -Math.round(reserve);
    };

    // The body and the footer each clip against their OWN overlap with the header. They must be
    // independent: the body slides under the header as the page scrolls (its overlap grows), but
    // the footer sits far below and only meets the header at the very bottom of a tall table —
    // sharing the body's value over-clipped the footer the further you scrolled.
    this._setVarIfChanged(native, '--ct-clip-top', `${clipFromTop(this._clipBody)}px`);
    this._setVarIfChanged(native, '--ct-clip-foot-top', `${clipFromTop(this._clipFooter)}px`);
  }

  private readonly _injector = inject(Injector);
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected get _dirValue() {
    return this._dir?.value || 'ltr';
  }

  ngOnInit(): void {
    if (!this._isBrowser) {
      return;
    }
    // Registered capture + passive, outside the Angular zone — see `_scrollHandler`.
    this._ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this._scrollHandler, { capture: true, passive: true });
      // Touch-swipe paging. touchmove is {passive:false} so we can preventDefault once the gesture
      // locks to the horizontal axis (vertical swipes are left to scroll the page). Bound on the
      // host so it covers the whole table; the live pan writes --ct-page-shift straight to the DOM.
      const host = this._element.nativeElement as HTMLElement;
      host.addEventListener('touchstart', this._onTouchStart, { passive: true });
      host.addEventListener('touchmove', this._onTouchMove, { passive: false });
      host.addEventListener('touchend', this._onTouchEnd, { passive: true });
      host.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
      // Keyboard focus auto-pagination: keep focus out of the clipped (off-screen) columns. Bound
      // in the zone (it sets a signal) — focus moves are rare, so the CD cost is negligible.
      this._ngZone.run(() => host.addEventListener('focusin', this._onFocusIn));
      this._destroyRef.onDestroy(() => {
        host.removeEventListener('touchstart', this._onTouchStart);
        host.removeEventListener('touchmove', this._onTouchMove);
        host.removeEventListener('touchend', this._onTouchEnd);
        host.removeEventListener('touchcancel', this._onTouchEnd);
        host.removeEventListener('focusin', this._onFocusIn);
      });
    });
  }

  // ── Keyboard focus auto-pagination ────────────────────────────────────────────
  // All product columns stay in the DOM (and the a11y tree) even when translated off-screen, so a
  // keyboard user can Tab into a clipped column. When focus lands in a product cell outside the
  // visible window [pageIndex, pageIndex + visibleColumns - 1], page the carousel so it is revealed.
  // We do NOT use aria-hidden/inert on the off-screen columns: that would either hide focusable
  // controls from AT (a WCAG violation) or break screen-reader table navigation. Revealing on focus
  // is the accessible carousel pattern.
  private readonly _onFocusIn = (event: FocusEvent): void => {
    if (this.viewType === 'mobile' || !this._isOverflowing() || this._isPanning) {
      return;
    }
    const target = event.target as HTMLElement | null;
    // The focused element may be deep inside a cell (a button, a form control). Walk up to the
    // owning product cell; a CDK overlay panel (rendered outside the table) yields null → skip.
    const cell = target?.closest<HTMLElement>('[data-ct-col]');
    if (!cell || !this._element.nativeElement.contains(cell)) {
      return;
    }
    const col = Number(cell.getAttribute('data-ct-col'));
    if (Number.isNaN(col)) {
      return;
    }
    const page = this._pageIndex();
    const visible = this._visibleColumnCount();
    if (col < page) {
      this._goToPage(col);
    } else if (col > page + visible - 1) {
      this._goToPage(col - visible + 1);
    }
  };

  // ── Touch-swipe paging ──────────────────────────────────────────────────────────
  // The live pan writes --ct-page-shift straight to the host style (bypassing Angular) for a
  // jank-free drag; on touchend it snaps to the nearest column and commits _pageIndex inside the
  // zone, after which the settled effect re-asserts the snapped offset. `is-panning` disables the
  // CSS transition during the drag (so the columns track the finger) and is toggled on the host
  // classList directly, NOT via a host binding, so it never fights the manual --ct-page-shift writes.
  private _touchStartX = 0;
  private _touchStartY = 0;
  private _touchAxis: 'x' | 'y' | null = null;
  /** The resting --ct-page-shift (px) when the gesture began; the pan adds the finger delta to it. */
  private _touchBaseShift = 0;

  /** True while a horizontal touch pan is in progress (suppresses focusin auto-pagination). */
  private _isPanning = false;

  private readonly _onTouchStart = (event: TouchEvent): void => {
    if (this.viewType === 'mobile' || !this._isOverflowing() || event.touches.length !== 1) {
      return;
    }
    this._touchStartX = event.touches[0].clientX;
    this._touchStartY = event.touches[0].clientY;
    this._touchAxis = null;
    const dir = this._dirValue === 'rtl' ? -1 : 1;
    this._touchBaseShift = -dir * this._pageIndex() * this._columnStepPx;
  };

  private readonly _onTouchMove = (event: TouchEvent): void => {
    if (this.viewType === 'mobile' || !this._isOverflowing() || event.touches.length !== 1) {
      return;
    }
    const dx = event.touches[0].clientX - this._touchStartX;
    const dy = event.touches[0].clientY - this._touchStartY;
    // Axis-lock once past the threshold: a vertical-dominant swipe releases the gesture so the
    // page scrolls normally; a horizontal-dominant swipe captures it and pages the carousel.
    if (this._touchAxis === null && Math.abs(dx) + Math.abs(dy) > 8) {
      this._touchAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (this._touchAxis === 'x') {
        this._isPanning = true;
        this._element.nativeElement.classList.add('is-panning');
      }
    }
    if (this._touchAxis !== 'x') {
      return;
    }
    event.preventDefault();
    // Clamp the live shift to [-(maxPage*step), 0] in LTR (mirrored in RTL).
    const dir = this._dirValue === 'rtl' ? -1 : 1;
    const maxOffset = this._maxPageIndex() * this._columnStepPx;
    const raw = this._touchBaseShift + dx;
    const clamped =
      dir === 1 ? Math.max(-maxOffset, Math.min(0, raw)) : Math.min(maxOffset, Math.max(0, raw));
    const native = this._native()?.nativeElement;
    if (native) {
      this._writeCarouselOffset(native, clamped, this._stickyColWidth + Math.abs(clamped));
    }
  };

  private readonly _onTouchEnd = (): void => {
    if (this._touchAxis !== 'x') {
      this._touchAxis = null;
      return;
    }
    this._touchAxis = null;
    this._isPanning = false;
    this._element.nativeElement.classList.remove('is-panning');
    // Snap to the nearest column from the live shift, then commit inside the zone; the settled
    // effect re-applies the exact snapped offset (with the transition restored).
    const native = this._native()?.nativeElement;
    const shift = parseFloat(native?.style.getPropertyValue('--ct-page-shift') || '0');
    const step = this._columnStepPx || 1;
    const page = Math.round(Math.abs(shift) / step);
    this._ngZone.run(() => this._goToPage(page));
  };

  ngAfterViewInit(): void {
    // no-op: desktop/tablet sticky is CSS-driven, the carousel is transform-driven via signals;
    // mobile clipping is scroll-driven.
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this._scrollHandler, { capture: true });
    if (this._stuckRaf !== null) {
      cancelAnimationFrame(this._stuckRaf);
    }
  }

  /** Whether the table is within (or near) the viewport; gates the page-wide scroll handler. */
  private _isVisible = true;

  // Synchronous (no rAF) so the clip updates in the SAME frame the scroll paints: a defer let fast
  // scrolls paint a frame of un-clipped content, and on WebKit (scroll fires faster than once per
  // frame) rAF lands a frame behind the compositor. The price is `_updateClip`'s rect reads on every
  // event — worth it here, but it is why the visibility gate below matters: `capture: true` catches
  // ancestor scroll containers too, so this runs for EVERY scroll on the page.
  private readonly _scrollHandler = (): void => {
    if (!this._isVisible || !this._element.nativeElement.isConnected) {
      return;
    }
    this._updateClip();
    this._scheduleUpdateStuck();
  };

  /** Whether the element is a row. */
  _isRow(element: NxTableContentElement): element is NxComparisonTableRowDirective {
    return element.kind === 'row';
  }

  /** Whether the element is a toggle section. */
  _isToggleSection(element: NxTableContentElement): element is NxToggleSectionDirective {
    return element.kind === 'toggleSection';
  }

  /** Whether the element is a row group. */
  _isRowGroup(element: NxTableContentElement): element is NxComparisonTableRowGroupDirective {
    return element.kind === 'rowGroup';
  }

  /** Whether a product column index is hidden. */
  _isHidden(index: number): boolean {
    return this._hiddenIndexes().includes(index);
  }

  /** Total number of columns the native table has (incl. the row-header column on desktop). */
  _colCount(): number {
    return this.viewType === 'desktop' ? this._infoColumnCount() + 1 : this._infoColumnCount();
  }

  /**
   * Precomputed set of element indices that start a new block of rows or a section — i.e. where
   * the mobile table inserts a spacer/divider. An index qualifies when it is: the first row after
   * the header; a toggle section; a row resuming after a toggle-section row; or the trailing footer.
   */
  readonly _firstInfoBlockIndexes = computed(() => {
    const elements = this.elements();
    const indexes = new Set<number>();

    // Find the first row after the header row
    let firstRowAfterHeader = 1;
    while (firstRowAfterHeader < elements.length && !this._isRow(elements[firstRowAfterHeader])) {
      firstRowAfterHeader++;
    }
    if (firstRowAfterHeader < elements.length) {
      indexes.add(firstRowAfterHeader);
    }

    for (let i = 1; i < elements.length; i++) {
      if (this._isToggleSection(elements[i])) {
        indexes.add(i);
      } else if (
        this._isRow(elements[i]) &&
        elements[i - 1].kind === 'row' &&
        (elements[i - 1] as NxComparisonTableRowDirective)._isPartOfToggleSection()
      ) {
        indexes.add(i);
      } else if (
        i === elements.length - 1 &&
        this._isRow(elements[i]) &&
        (elements[i] as NxComparisonTableRowDirective).type === 'footer'
      ) {
        indexes.add(i);
      }
    }

    return indexes;
  });

  // ── Computed signal graph ───────────────────────────────────────────────────

  private readonly _headerFooterRows = computed(() => {
    let header: NxComparisonTableRowDirective | undefined;
    let footer: NxComparisonTableRowDirective | undefined;
    for (const el of this.elements()) {
      if (this._isRow(el)) {
        if (el.type === 'header') header = el;
        else if (el.type === 'footer') footer = el;
      }
    }
    return { header, footer };
  });

  readonly _headerRow = computed(() => this._headerFooterRows().header);

  readonly _headerCells = computed(() => this._headerRow()?.cells() ?? []);

  readonly _popularCell = computed(() => this._headerRow()?.popularCell());

  readonly _footerRow = computed(() => this._headerFooterRows().footer);

  readonly _footerCells = computed(() => {
    const row = this._footerRow();
    return row ? row.cells() : [];
  });

  readonly _infoColumnCount = computed(
    () => this._headerCells().length - this._hiddenIndexes().length,
  );

  readonly _visibleColumnCount = computed(() => {
    if (!this._isA1()) {
      return this._infoColumnCount();
    }
    return Math.min(this.visibleColumns(), this._infoColumnCount());
  });

  readonly _isOverflowing = computed(
    () => this._isA1() && this._visibleColumnCount() < this._infoColumnCount(),
  );

  readonly _flatContentRows = computed(() => {
    const elements = this.elements();
    const rows: NxComparisonTableRowDirective[] = [];
    for (const element of elements) {
      switch (element.kind) {
        case 'row': {
          const row = element as NxComparisonTableRowDirective;
          if (row.type === 'content' && !row._isPartOfToggleSection() && !row._isPartOfRowGroup()) {
            rows.push(row);
          }
          break;
        }
        case 'rowGroup': {
          const group = element as NxComparisonTableRowGroupDirective;
          if (!group._isPartOfToggleSection()) {
            for (const row of this._getVisibleRows(group)) {
              rows.push(row);
            }
          }
          break;
        }
        case 'toggleSection': {
          const section = element as NxToggleSectionDirective;
          for (const sectionElement of section.rows()) {
            if (this._isRow(sectionElement)) {
              rows.push(sectionElement);
            } else if (this._isRowGroup(sectionElement)) {
              for (const row of this._getVisibleRows(sectionElement)) {
                rows.push(row);
              }
            }
          }
          break;
        }
      }
    }
    return rows;
  });

  _containsToggleSection(): boolean {
    return this.elements().some((el) => this._isToggleSection(el));
  }

  /**
   * Number of element columns the transposed mobile table renders. The footer row is rendered
   * separately (not as a mobile column), so it is subtracted from the element count when present.
   */
  _getMobileColumnCount() {
    return this._footerCells().length ? this.elements().length - 1 : this.elements().length;
  }

  _isMobileRowDisabled(i: number) {
    return this._headerCells()[i]?.disabledColumn ?? false;
  }

  _addDisabledColumn(disabledColumn: number): void {
    if (!this._disabledIndexes().has(disabledColumn)) {
      this._disabledIndexes.set(new Set(this._disabledIndexes()).add(disabledColumn));
    }
  }

  _removeDisabledColumn(enabledColumn: number): void {
    if (this._disabledIndexes().has(enabledColumn)) {
      const next = new Set(this._disabledIndexes());
      next.delete(enabledColumn);
      this._disabledIndexes.set(next);
    }
  }

  _isFirstContentRow(row: NxComparisonTableRowDirective): boolean {
    const rows = this._flatContentRows();
    return rows.length > 0 && rows[0] === row;
  }

  _isLastContentRow(row: NxComparisonTableRowDirective): boolean {
    const rows = this._flatContentRows();
    return rows.length > 0 && rows[rows.length - 1] === row;
  }

  _getVisibleRows(
    group: NxComparisonTableRowGroupDirective,
  ): readonly NxComparisonTableRowDirective[] {
    const allRows = group.rows();
    if (group.isExpanded || allRows.length <= group.visibleRows) {
      return allRows;
    }
    return allRows.slice(0, group.visibleRows);
  }

  _hasExpansionButton(group: NxComparisonTableRowGroupDirective): boolean {
    return group.rows().length > group.visibleRows;
  }

  /**
   * Whether the row group's expansion ("More services") header spans the FULL row width —
   * including the sticky first (description) column on desktop — rather than starting at the
   * first product column. Always full-width in A1; otherwise driven by the group's
   * `useFullRowForExpandableArea` option (the Expert layout opts in, retail/NDBX does not).
   */
  _isFullWidthExpansion(group: NxComparisonTableRowGroupDirective): boolean {
    return this._isA1() || group.useFullRowForExpandableArea;
  }

  _toggleRowGroup(group: NxComparisonTableRowGroupDirective): void {
    group._handleIsExpandedChange(!group.isExpanded);
    this._cdr.detectChanges();
  }

  _onRowGroupKeydown(event: KeyboardEvent, group: NxComparisonTableRowGroupDirective): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this._toggleRowGroup(group);
      if (event.key === ' ') {
        event.preventDefault();
      }
    }
  }

  // ── Carousel navigation ───────────────────────────────────────────────────────
  // There is no native scroll: the product columns are translated by transform. The nav buttons
  // step the page index by one product column; touch users swipe (see the touch handlers). The
  // settled `_applyPageShift` effect writes the resting transform whenever `_pageIndex` changes.

  /** Advance the carousel by one product column toward the end. (Keeps the public name.) */
  scrollNext(): void {
    this._goToPage(this._pageIndex() + 1);
  }

  /** Move the carousel back by one product column toward the start. (Keeps the public name.) */
  scrollPrev(): void {
    this._goToPage(this._pageIndex() - 1);
  }

  /** Set the carousel page, clamped to the valid range. */
  private _goToPage(page: number): void {
    const clamped = Math.max(0, Math.min(this._maxPageIndex(), page));
    if (clamped !== this._pageIndex()) {
      this._pageIndex.set(clamped);
    }
  }
}
