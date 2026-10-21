import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  NX_DEFAULT_SURFACE_ACCENT_COLOR,
  NxSurfaceAccentColor,
  NxSurfaceType,
} from '@allianz/ng-aquila/surface';
import { NxViewportService } from '@allianz/ng-aquila/utils';
import { CdkMonitorFocus } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
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
  linkedSignal,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  COMPARISON_TABLE_DEFAULT_OPTIONS,
  ComparisonTableDefaultOptions,
  normalizeComparisonTableColorScheme,
  NxComparisonTableBreakpoint,
  NxComparisonTableColorScheme,
  NxComparisonTableViewType,
} from './comparison-table.models';
import { NxComparisonTableBase } from './comparison-table-base';
import { setStyleVarIfChanged } from './comparison-table-dom';
import { NxComparisonTableIntl } from './comparison-table-intl';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';
import {
  NxComparisonTableMobileColumnGroup,
  NxComparisonTableMobileComponent,
} from './mobile-table/mobile-table.component';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionDirective } from './toggle-section/toggle-section.directive';

export const DEFAULT_BREAKPOINTS: NxComparisonTableBreakpoint[] = [
  { minWidth: 0, viewType: 'mobile', columns: 1 },
  { minWidth: 320, viewType: 'mobile', columns: 2 },
  { minWidth: 704, viewType: 'tablet', columns: 3 },
  { minWidth: 992, viewType: 'desktop', columns: 3 },
];

/** Movement before a touch/pen gesture counts as a pan, so taps on controls in cells still work. */
const PAN_THRESHOLD_PX = 8;

/** How long after a pan a click is treated as the pan's own release rather than a new action. */
const PAN_CLICK_GUARD_MS = 300;

/** `collapsed` is `undefined` outside toggle sections. */
type BodyEntry =
  | { kind: 'row'; key: NxComparisonTableRowDirective; collapsed: boolean | undefined }
  | { kind: 'sectionHeader'; key: NxToggleSectionDirective; collapsed: undefined }
  | {
      kind: 'groupExpander';
      key: NxComparisonTableRowGroupDirective;
      collapsed: boolean | undefined;
    };

/** The block structure the styles need, so that no selector has to infer it from sibling rows. */
type BodyItem = BodyEntry & {
  /** Row: the table's first content row, collapsed or not. */
  first: boolean;
  /** Row: starts / ends a run of rows drawn as one card per column. */
  blockStart: boolean;
  blockEnd: boolean;
  /** Section header or expander right after a row (for a section header, a visible row). */
  gapAbove: boolean;
  /**
   * Section header: followed by its collapsed rows, then something visible.
   * Intersection row: followed by a row.
   */
  gapBelow: boolean;
  /** Section header: followed by its own visible rows. */
  contentGapBelow: boolean;
};

function isRow(element: NxTableContentElement): element is NxComparisonTableRowDirective {
  return element.kind === 'row';
}

function isToggleSection(element: NxTableContentElement): element is NxToggleSectionDirective {
  return element.kind === 'toggleSection';
}

function isRowGroup(element: NxTableContentElement): element is NxComparisonTableRowGroupDirective {
  return element.kind === 'rowGroup';
}

function isContentRow(element: NxTableContentElement): element is NxComparisonTableRowDirective {
  return isRow(element) && element.type !== 'header' && element.type !== 'footer';
}

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
    '[attr.dir]': '_hostDir()',
  },
  imports: [
    NgTemplateOutlet,
    NxIconModule,
    CdkMonitorFocus,
    NxIconButtonComponent,
    NxComparisonTableMobileComponent,
  ],
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
  private readonly _injector = inject(Injector);
  private readonly _platform = inject(Platform);

  /** Switches viewType detection between viewport-based and container-based. */
  readonly responsiveMode = input<'viewport' | 'container' | undefined>(
    this._defaultOptions?.responsiveMode ?? 'viewport',
  );

  /** Breakpoint configuration for container-based responsive behavior. */
  readonly responsiveBreakpoints = input<NxComparisonTableBreakpoint[] | undefined>(undefined);

  /**
   * Color scheme of the header and footer rows. Only takes effect in the Allianz
   * One design. Default: 'default'.
   */
  readonly colorScheme = input<NxComparisonTableColorScheme>('default');

  /**
   * Accent hue of the header and footer. Only takes effect with an
   * `accent-attention` color scheme. Default: `'blue'`.
   */
  readonly accentColor = input<NxSurfaceAccentColor>(NX_DEFAULT_SURFACE_ACCENT_COLOR);

  /** @docs-private */
  readonly _surface = computed<NxSurfaceType>(() =>
    this._isA1() ? normalizeComparisonTableColorScheme(this.colorScheme()) : 'default',
  );

  /**
   * Size for the `nx-comparison-table-header-title` slot of every header cell, overriding the
   * projected `nxHeadline`'s own `size`. A pinned header steps it down one size.
   */
  readonly headlineSize = input<'l' | 'xl'>('xl');

  // Never `ltr`: that would override a plain `dir="rtl"` on an ancestor.
  protected readonly _hostDir = computed(() => (this._dir?.valueSignal() === 'rtl' ? 'rtl' : null));

  protected readonly _measuredWidth = signal(0);

  /** `comparison-table-row-gap` and `comparison-table-min-column-width` in px. */
  private readonly _columnTokens = signal<{ gap: number; minWidth: number } | null>(null);

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

  private readonly _breakpointColumns = computed(() =>
    Math.min(this._resolvedBreakpoint().columns, this._infoColumnCount()),
  );

  /** Columns of at least the min column width that fit; must match `--ct-col-w` in the .scss. */
  private readonly _fittingColumns = computed(() => {
    const tokens = this._columnTokens();
    const width = this._measuredWidth();
    if (!tokens || !width || tokens.minWidth + tokens.gap <= 0) {
      return Infinity;
    }
    // The epsilon keeps an exact fit from flooring down on float error.
    const fit = Math.floor((width + tokens.gap + 0.01) / (tokens.minWidth + tokens.gap));
    return this.viewType === 'desktop' ? fit - 1 : fit;
  });

  readonly _isOverflowing = computed(
    () => this._isA1() && this._breakpointColumns() < this._infoColumnCount(),
  );

  readonly _visibleColumnCount = computed(() => {
    if (!this._isOverflowing()) {
      return this._infoColumnCount();
    }
    return Math.max(1, Math.min(this._breakpointColumns(), this._fittingColumns()));
  });

  protected readonly _colsShown = computed(
    () => this._visibleColumnCount() + (this.viewType === 'desktop' ? 1 : 0),
  );

  protected readonly _maxPageIndex = computed(() =>
    Math.max(0, this._infoColumnCount() - this._visibleColumnCount()),
  );

  readonly _pageIndex = linkedSignal<number, number>({
    source: this._maxPageIndex,
    computation: (max, previous) => Math.min(previous?.value ?? 0, max),
  });

  protected readonly _isAtStart = computed(() => this._pageIndex() <= 0);
  protected readonly _isAtEnd = computed(() => this._pageIndex() >= this._maxPageIndex());

  private readonly _native = viewChild<ElementRef<HTMLElement>>('native');
  private readonly _viewport = viewChild<ElementRef<HTMLElement>>('viewport');

  private readonly _mobileTable = viewChild(NxComparisonTableMobileComponent);

  private readonly _isHeaderStuckState = signal(false);
  readonly _isHeaderStuck = this._isHeaderStuckState.asReadonly();

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

  /** An event that is dispatched each time selected index of the table has changed. */
  @Output() readonly selectedIndexChange = new EventEmitter<number>();

  /** Sets which column is hidden. */
  @Input() set hiddenIndexes(value: number[]) {
    this._hiddenIndexes.set(coerceArray(value));
  }
  get hiddenIndexes(): number[] {
    return this._hiddenIndexes();
  }
  readonly _hiddenIndexes = signal<number[]>([]);

  /** Sets the layout explicitly. If not specified, a layout will be set based on the viewport. */
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
    cdr: ChangeDetectorRef,
    private readonly _ngZone: NgZone,
  ) {
    super(viewportService, cdr);

    this._intl.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._cdr.markForCheck();
    });

    // The new `dir` attribute only lands with the change detection that emitted this.
    this._dir?.change.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._scheduleMeasure();
    });

    afterNextRender(() => {
      const rect = this._element.nativeElement.getBoundingClientRect?.();
      if (rect) {
        this._observedWidth = rect.width;
        this._observedHeight = rect.height;
        if (rect.width && rect.width !== this._measuredWidth()) {
          this._measuredWidth.set(rect.width);
        }
      }
      this._registerObservers();
    });

    // Each of these swaps the measured elements or their tokens, which only land with the render.
    effect(() => {
      this._native();
      this._viewType();
      this.elements();
      this._isOverflowing();
      this._isA1();
      void this._headerRow()?.mayStick;
      this._scheduleMeasure();
    });

    // Only `_goToPage` glides; a page clamped by a layout or column change snaps.
    effect(() => {
      const page = this._pageIndex();
      if (page !== this._glidePage) {
        this._glidePage = page;
        untracked(() => this._snapCarousel());
      }
    });

    effect((onCleanup) => {
      const native = this._native()?.nativeElement;
      if (!native || !this._isOverflowing() || !this._platform.isBrowser) {
        return;
      }
      const listeners = this._panListeners;
      this._ngZone.runOutsideAngular(() => {
        for (const [type, listener, options] of listeners) {
          native.addEventListener(type, listener, options);
        }
      });
      onCleanup(() => {
        for (const [type, listener, options] of listeners) {
          native.removeEventListener(type, listener, options);
        }
        this._endPan();
      });
    });
  }

  ngOnInit(): void {
    if (!this._platform.isBrowser) {
      return;
    }
    this._ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this._scrollHandler, { capture: true, passive: true });
    });
    // Inside the zone: it sets a signal, and focus moves are rare.
    const host = this._element.nativeElement as HTMLElement;
    host.addEventListener('focusin', this._onFocusIn);
    this._destroyRef.onDestroy(() => host.removeEventListener('focusin', this._onFocusIn));
  }

  /**
   * @deprecated No longer used.
   * @deletion-target 23.0.0
   */
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this._platform.isBrowser) {
      window.removeEventListener('scroll', this._scrollHandler, { capture: true });
    }
    if (this._stuckRaf !== null) {
      cancelAnimationFrame(this._stuckRaf);
    }
  }

  // The carousel geometry is derived in the .scss; only what CSS cannot know is measured here.
  private _observedWidth = 0;
  private _observedHeight = 0;
  private _isVisible = true;

  private _registerObservers(): void {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === this._observedWidth && height === this._observedHeight) {
        return;
      }
      this._observedWidth = width;
      this._observedHeight = height;
      if (width !== this._measuredWidth()) {
        this._ngZone.run(() => {
          this._measuredWidth.set(width);
          this._scheduleMeasure();
        });
      } else {
        this._measure();
      }
    });
    observer.observe(this._element.nativeElement);
    this._destroyRef.onDestroy(() => observer.disconnect());

    // The margin keeps the clip fresh just before the table scrolls into view.
    const visibility = new IntersectionObserver(
      (entries) => {
        const wasVisible = this._isVisible;
        this._isVisible = entries[entries.length - 1].isIntersecting;
        if (this._isVisible && !wasVisible) {
          this._scrollHandler();
        }
      },
      { rootMargin: '200px' },
    );
    visibility.observe(this._element.nativeElement);
    this._destroyRef.onDestroy(() => visibility.disconnect());

    // A webfont can change the header band and the mobile column widths without resizing the host.
    const fonts = (this._element.nativeElement as HTMLElement).ownerDocument.fonts;
    if (fonts) {
      const remeasure = () => this._scheduleMeasure();
      fonts.addEventListener('loadingdone', remeasure);
      this._destroyRef.onDestroy(() => fonts.removeEventListener('loadingdone', remeasure));
    }
  }

  private _measureScheduled = false;

  /** Once per render, however many of its inputs changed in it. */
  private _scheduleMeasure(): void {
    if (this._measureScheduled) {
      return;
    }
    this._measureScheduled = true;
    afterNextRender(
      () => {
        this._measureScheduled = false;
        this._measure();
      },
      { injector: this._injector },
    );
  }

  /** All layout reads come before the writes, so a write cannot force a reflow on a later read. */
  private _measure(): void {
    const host = this._element.nativeElement as HTMLElement;
    if (this.viewType === 'mobile') {
      this._mobileTable()?._measure(host, this._isRtl());
      this._setStuck(false);
      return;
    }
    const native = this._native()?.nativeElement;
    const viewport = this._viewport()?.nativeElement;
    if (!native || !viewport) {
      return;
    }
    const hostStyle = getComputedStyle(host);
    const gap = parseFloat(hostStyle.getPropertyValue('--ct-gap')) || 0;
    const minWidth = parseFloat(hostStyle.getPropertyValue('--ct-min-col-w')) || 0;
    // --ct-shadow is not registered, so it is read resolved from the padding it sets.
    this._shadowReserve = parseFloat(getComputedStyle(viewport).paddingTop) || 0;
    this._resolveClipTargets(host);

    const band = this._readHeaderBand(native);
    const clip = this._readClip();
    const isStuck = this._readStuck();

    if (band) {
      setStyleVarIfChanged(native, '--ct-nav-center', `${band.navCenter}px`);
    }
    setStyleVarIfChanged(native, '--ct-thead-h', `${band?.height ?? 0}px`);
    this._writeClip(clip);
    const tokens = this._columnTokens();
    if (tokens?.gap !== gap || tokens.minWidth !== minWidth) {
      this._ngZone.run(() => this._columnTokens.set({ gap, minWidth }));
    }
    this._setStuck(isStuck);
  }

  /** Relative to the nav-wrapper, which pins like the thead, so scrolling does not change them. */
  private _readHeaderBand(native: HTMLElement): { navCenter: number; height: number } | null {
    const wrapper = native.querySelector<HTMLElement>('.nx-comparison-table__nav-wrapper');
    const card = this._clipHeaderCard;
    const thead = this._clipThead;
    if (!wrapper || !card || !thead) {
      return null;
    }
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const cardRect = card.getBoundingClientRect();
    return {
      navCenter: Math.round(cardRect.top - wrapperTop + cardRect.height / 2),
      height: Math.round(thead.getBoundingClientRect().bottom - wrapperTop),
    };
  }

  /** Computed, so a plain `dir` on any ancestor counts too, not only CDK `Directionality`. */
  private _isRtl(): boolean {
    return (
      this._platform.isBrowser && getComputedStyle(this._element.nativeElement).direction === 'rtl'
    );
  }

  private _shadowReserve = 0;

  private _clipHeaderCard: HTMLElement | null = null;
  private _clipBody: HTMLElement | null = null;
  private _clipFooter: HTMLElement | null = null;
  private _clipThead: HTMLElement | null = null;

  private _resolveClipTargets(host: HTMLElement): void {
    this._clipHeaderCard =
      host.querySelector<HTMLElement>('thead .is-header-row .nx-comparison-table__cell-inner') ??
      host.querySelector<HTMLElement>('thead .is-header-row');
    this._clipBody = host.querySelector<HTMLElement>('tbody');
    this._clipFooter = host.querySelector<HTMLElement>('tfoot');
    this._clipThead = host.querySelector<HTMLElement>('thead');
  }

  /**
   * Against the header card's bottom, not the thead's (a transparent spacing lower). Below the
   * shadow reserve the inset stays at -reserve, so the top border and shadow are not cropped.
   */
  private _readClip(): [number, number] {
    const rest = -Math.round(this._shadowReserve);
    const card = this._clipHeaderCard;
    if (!card || !this._headerRow()?.mayStick) {
      return [rest, rest];
    }
    const reserve = this._shadowReserve;
    const headerBottom = card.getBoundingClientRect().bottom;
    const clipFromTop = (el: HTMLElement | null): number => {
      if (!el) {
        return rest;
      }
      const overlap = headerBottom - el.getBoundingClientRect().top;
      return overlap > reserve + 0.5 ? Math.round(overlap) : rest;
    };
    return [clipFromTop(this._clipBody), clipFromTop(this._clipFooter)];
  }

  private _writeClip([body, footer]: [number, number]): void {
    setStyleVarIfChanged(this._clipBody, '--ct-clip-top', `${body}px`);
    setStyleVarIfChanged(this._clipFooter, '--ct-clip-top', `${footer}px`);
  }

  private _updateClip(): void {
    if (!this._clipHeaderCard?.isConnected) {
      this._resolveClipTargets(this._element.nativeElement);
    }
    this._writeClip(this._readClip());
  }

  /**
   * The thead's in-flow top is `.__native`'s (the viewport's margin cancels the nav-wrapper).
   * Rect-based: an IntersectionObserver would track the nearest scrolling ancestor, not the page.
   */
  private _readStuck(): boolean {
    const native = this._native()?.nativeElement;
    const thead = this._clipThead;
    if (!native || !thead || !this._headerRow()?.mayStick) {
      return false;
    }
    return native.getBoundingClientRect().top < thead.getBoundingClientRect().top;
  }

  private _setStuck(isStuck: boolean): void {
    if (isStuck !== this._isHeaderStuck()) {
      this._ngZone.run(() => this._isHeaderStuckState.set(isStuck));
    }
  }

  private _stuckRaf: number | null = null;

  /** Unlike the clip it may land a frame late: the stuck styles ease in anyway. */
  private _scheduleUpdateStuck(): void {
    if (this._stuckRaf !== null) {
      return;
    }
    this._stuckRaf = requestAnimationFrame(() => {
      this._stuckRaf = null;
      if (!this._clipThead?.isConnected) {
        this._resolveClipTargets(this._element.nativeElement);
      }
      this._setStuck(this._readStuck());
    });
  }

  // Synchronous, not rAF: a deferred clip paints a frame of unclipped content on fast scrolls. It
  // runs for every scroll on the page (capture), hence the visibility gate.
  private readonly _scrollHandler = (): void => {
    if (!this._isVisible || !this._element.nativeElement.isConnected) {
      return;
    }
    if (this.viewType === 'mobile') {
      this._mobileTable()?._updateClip(this._element.nativeElement);
    } else if (this._native() && this._headerRow()?.mayStick) {
      this._updateClip();
      this._scheduleUpdateStuck();
    }
  };

  // Off-screen columns stay focusable and in the a11y tree (aria-hidden/inert would hide their
  // controls from AT), so focusing one pages it into view.
  private readonly _onFocusIn = (event: FocusEvent): void => {
    if (this.viewType === 'mobile' || !this._isOverflowing() || this._isPanning) {
      return;
    }
    const target = event.target as HTMLElement | null;
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

  // Outside the zone: `is-panning` and `--ct-pan` are written to the DOM directly, not bound.
  private _panPointerId: number | null = null;
  private _panStartX = 0;
  private _panStartY = 0;
  private _panAxis: 'x' | 'y' | null = null;
  private _panRtl = false;
  private _panStep = 0;
  /** Px toward the inline end. */
  private _panOffset = 0;
  private _panClickGuardUntil = 0;
  private _isPanning = false;

  private readonly _onPointerDown = (event: PointerEvent): void => {
    this._panClickGuardUntil = 0;
    if (!event.isPrimary || (event.pointerType !== 'touch' && event.pointerType !== 'pen')) {
      return;
    }
    this._panPointerId = event.pointerId;
    this._panStartX = event.clientX;
    this._panStartY = event.clientY;
    this._panAxis = null;
  };

  private readonly _onPointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== this._panPointerId) {
      return;
    }
    const dx = event.clientX - this._panStartX;
    const dy = event.clientY - this._panStartY;
    if (this._panAxis === null) {
      if (Math.abs(dx) + Math.abs(dy) <= PAN_THRESHOLD_PX) {
        return;
      }
      this._panAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (this._panAxis === 'x') {
        this._panRtl = this._isRtl();
        this._panStep = this._measureColumnStep();
        this._isPanning = true;
        this._element.nativeElement.classList.add('is-panning');
      }
    }
    if (this._panAxis !== 'x') {
      return;
    }
    const base = this._pageIndex() * this._panStep;
    const max = this._maxPageIndex() * this._panStep;
    this._panOffset = Math.min(max, Math.max(0, base + (this._panRtl ? dx : -dx)));
    this._native()?.nativeElement.style.setProperty(
      '--ct-pan',
      `${Math.round(this._panOffset - base)}px`,
    );
  };

  private readonly _onPointerUp = (event: PointerEvent): void => {
    if (event.pointerId !== this._panPointerId) {
      return;
    }
    const panned = this._panAxis === 'x';
    const page = Math.round(this._panOffset / (this._panStep || 1));
    this._endPan();
    if (!panned) {
      return;
    }
    this._panClickGuardUntil = event.timeStamp + PAN_CLICK_GUARD_MS;
    this._ngZone.run(() => this._goToPage(page));
  };

  private readonly _onPointerCancel = (event: PointerEvent): void => {
    if (event.pointerId === this._panPointerId) {
      this._endPan();
    }
  };

  private readonly _onClickCapture = (event: MouseEvent): void => {
    if (event.timeStamp < this._panClickGuardUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
    this._panClickGuardUntil = 0;
  };

  private readonly _panListeners: [string, EventListener, AddEventListenerOptions][] = [
    ['pointerdown', this._onPointerDown as EventListener, { passive: true }],
    ['pointermove', this._onPointerMove as EventListener, { passive: true }],
    ['pointerup', this._onPointerUp as EventListener, { passive: true }],
    ['pointercancel', this._onPointerCancel as EventListener, { passive: true }],
    ['click', this._onClickCapture as EventListener, { capture: true }],
  ];

  /** Distance between two adjacent product columns; both carry the same translation. */
  private _measureColumnStep(): number {
    const cells = this._element.nativeElement.querySelectorAll(
      'thead .is-header-row .nx-comparison-table__product-cell',
    );
    if (cells.length < 2) {
      return 0;
    }
    return Math.abs(cells[1].getBoundingClientRect().left - cells[0].getBoundingClientRect().left);
  }

  private _endPan(): void {
    this._panPointerId = null;
    this._panAxis = null;
    this._panOffset = 0;
    this._isPanning = false;
    this._element.nativeElement.classList.remove('is-panning');
    this._native()?.nativeElement.style.removeProperty('--ct-pan');
  }

  _isHidden(index: number): boolean {
    return this._hiddenIndexSet().has(index);
  }

  _colCount(): number {
    return this.viewType === 'desktop' ? this._infoColumnCount() + 1 : this._infoColumnCount();
  }

  private readonly _headerFooterRows = computed(() => {
    let header: NxComparisonTableRowDirective | undefined;
    let footer: NxComparisonTableRowDirective | undefined;
    for (const el of this.elements()) {
      if (isRow(el)) {
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
    () => this._headerCells().length - this._hiddenIndexSet().size,
  );

  private readonly _layout = computed(() => {
    const body: BodyEntry[] = [];
    const mobile: NxComparisonTableMobileColumnGroup[] = [];
    const pushGroup = (group: NxComparisonTableRowGroupDirective, collapsed?: boolean) => {
      const rows = group.rows();
      const shown = group.isExpanded ? rows : rows.slice(0, group.visibleRows);
      for (const row of shown) {
        body.push({ kind: 'row', key: row, collapsed });
      }
      if (rows.length > group.visibleRows) {
        body.push({ kind: 'groupExpander', key: group, collapsed });
      }
    };

    let lastContentRow: NxComparisonTableRowDirective | undefined;
    for (const element of this.elements()) {
      if (isToggleSection(element)) {
        const collapsed = !element.isExpanded;
        const rows: NxComparisonTableRowDirective[] = [];
        body.push({ kind: 'sectionHeader', key: element, collapsed: undefined });
        for (const child of element.rows()) {
          if (isRow(child) && !child._isPartOfRowGroup()) {
            body.push({ kind: 'row', key: child, collapsed });
            rows.push(child);
          } else if (isRowGroup(child)) {
            pushGroup(child, collapsed);
            rows.push(...child.rows());
          }
        }
        mobile.push({ key: element, section: element, spacer: true, rows });
      } else if (isRowGroup(element) && !element._isPartOfToggleSection()) {
        pushGroup(element);
      } else if (isContentRow(element) && !element._isPartOfToggleSection()) {
        if (!element._isPartOfRowGroup()) {
          body.push({ kind: 'row', key: element, collapsed: undefined });
        }
        // Rows that open the table or resume after a toggle section get a spacer column.
        const spacer = !lastContentRow || lastContentRow._isPartOfToggleSection();
        mobile.push({ key: element, section: null, spacer, rows: [element] });
      }
      if (isContentRow(element)) {
        lastContentRow = element;
      }
    }
    return { body: this._withBlockStructure(body), mobile };
  });

  protected readonly _bodyItems = computed(() => this._layout().body);

  protected readonly _mobileColumns = computed(() => this._layout().mobile);

  private _withBlockStructure(entries: readonly BodyEntry[]): BodyItem[] {
    let firstRow = -1;
    let lastRow = -1;
    let lastVisible = -1;
    entries.forEach((entry, i) => {
      if (entry.kind === 'row') {
        firstRow = firstRow < 0 ? i : firstRow;
        lastRow = i;
      }
      if (entry.collapsed !== true) {
        lastVisible = i;
      }
    });
    const isBoundary = (entry: BodyEntry | undefined) =>
      !!entry && (entry.kind !== 'row' || !!entry.key.intersectionCell());

    return entries.map((entry, i) => {
      const prev = entries[i - 1];
      const next = entries[i + 1];
      const isRowEntry = entry.kind === 'row';
      const isHeader = entry.kind === 'sectionHeader';
      return {
        ...entry,
        first: i === firstRow,
        blockStart:
          isRowEntry &&
          (i === firstRow ||
            isBoundary(prev) ||
            (prev?.collapsed === true && entry.collapsed !== true)),
        blockEnd: isRowEntry && (i === lastRow || isBoundary(next)),
        gapAbove: !isRowEntry && prev?.kind === 'row' && (!isHeader || prev.collapsed !== true),
        gapBelow: isHeader
          ? next?.collapsed === true && lastVisible > i
          : entry.kind === 'row' && !!entry.key.intersectionCell() && next?.kind === 'row',
        contentGapBelow: isHeader && next?.collapsed === false,
      };
    });
  }

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

  /** Advance the carousel by one product column toward the end. */
  scrollNext(): void {
    this._goToPage(this._pageIndex() + 1);
  }

  /** Move the carousel back by one product column toward the start. */
  scrollPrev(): void {
    this._goToPage(this._pageIndex() - 1);
  }

  private _goToPage(page: number): void {
    this._markRowsOutOfView();
    const clamped = Math.max(0, Math.min(this._maxPageIndex(), page));
    if (clamped !== this._pageIndex()) {
      this._glidePage = clamped;
      this._pageIndex.set(clamped);
    }
  }

  private _glidePage = 0;

  /**
   * Starting an animation costs about a millisecond per cell under a large token set, so rows more
   * than a viewport height out of view jump instead of gliding.
   */
  private _markRowsOutOfView(): void {
    const native = this._native()?.nativeElement;
    if (!native || !this._platform.isBrowser) {
      return;
    }
    const height = window.innerHeight;
    const rows = Array.from(native.querySelectorAll<HTMLElement>('tbody > tr, tfoot > tr'));
    const outOfView = rows.map((row) => {
      const { top, bottom } = row.getBoundingClientRect();
      return bottom < -height || top > 2 * height;
    });
    rows.forEach((row, i) => row.classList.toggle('is-out-of-view', outOfView[i]));
  }

  /** Keeps the transition off until the new offset has been styled once. */
  private _snapCarousel(): void {
    if (!this._platform.isBrowser) {
      return;
    }
    const host = this._element.nativeElement as HTMLElement;
    host.classList.add('is-snapping');
    afterNextRender(
      () => {
        void host.offsetWidth;
        host.classList.remove('is-snapping');
      },
      { injector: this._injector },
    );
  }
}
