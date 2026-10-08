import { NxIconButtonComponent, NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

import { NxProductTileCarouselIntl } from './product-tile.intl';
import {
  NX_PRODUCT_TILE_CAROUSEL_ITEMS,
  NxProductTileCarouselItem,
} from './product-tile-carousel-item';

/** Sub-pixel scroll offsets keep the arrows from settling into a disabled state at the ends. */
const SCROLL_EPSILON = 1;

const OUTSIDE_CLASS = 'nx-product-tile-carousel__item--outside';

/** Sub-pixel rounding keeps a tile that is flush with the viewport's edge from reporting a full 1. */
const FULLY_IN_VIEW = 0.95;

/**
 * How long after the last scroll event the track counts as settled. Long enough to bridge the gaps
 * between the events of a smooth or inertial scroll, short enough not to read as a delay.
 */
const SCROLL_SETTLE_DURATION = 120;

/**
 * Puts product tiles on a horizontally scrollable track: one, two or three side by side depending on
 * the room the carousel has, never wrapping, with the ones outside the view faded. The track is a
 * plain scroll container with snap points, so keyboard, touch and trackpad scrolling all keep working;
 * the arrows and the progress bar only reflect and drive that same scroll position, and they stay
 * hidden while the tiles all fit. The tab bar appears whenever every tile carries a `carouselLabel`.
 */
@Component({
  selector: 'nx-product-tile-carousel',
  templateUrl: './product-tile-carousel.component.html',
  styleUrl: './product-tile-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIconButtonComponent, NxPlainButtonComponent, NxIconComponent],
  host: {
    '[class.nx-product-tile-carousel]': 'true',
    '[class.can-scroll-back]': '_canScrollBack()',
    '[class.can-scroll-forward]': '_canScrollForward()',
    '[class.is-scrolling]': '_isScrolling()',
  },
})
export class NxProductTileCarouselComponent {
  protected readonly _intl = inject(NxProductTileCarouselIntl);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  private readonly _tabList = viewChild<ElementRef<HTMLElement>>('tabList');

  private readonly _tabButtons = viewChildren<ElementRef<HTMLElement>>('tabButton');

  private readonly _projectedItems = inject(NX_PRODUCT_TILE_CAROUSEL_ITEMS, { optional: true });

  /** A track of its own carries content that is no tile of a group, so it has no items to report on. */
  private readonly _items = computed<readonly NxProductTileCarouselItem[]>(
    () => this._projectedItems?._items() ?? [],
  );

  private readonly _scrollLeft = signal(0);
  private readonly _scrollWidth = signal(0);
  private readonly _viewportWidth = signal(0);

  private readonly _tabsScrollLeft = signal(0);
  private readonly _tabsScrollWidth = signal(0);
  private readonly _tabsWidth = signal(0);

  /**
   * Which tiles the tab bar stands over: the ones the view holds at the snap position it is nearest to,
   * rather than the ones that happen to be fully visible. A scroll takes a tile out of view before it
   * brings the next one in, and a bar reporting that would inch its way across - shrinking at the back,
   * then stretching at the front - instead of moving in one piece.
   */
  private readonly _leadingTile = signal(0);
  private readonly _tilesPerView = signal(1);

  /**
   * Where the active tabs' shared indicator sits, in the tab list's own coordinates. Measured off the
   * tabs rather than drawn on them, so that it spans exactly their labels and slides from one set of
   * them to the next instead of jumping.
   */
  protected readonly _tabIndicator = signal<{ left: number; width: number } | null>(null);

  /** One transform rather than an offset and a width, so that both ends move on the same clock. */
  protected readonly _tabIndicatorTransform = computed(() => {
    const indicator = this._tabIndicator();
    return indicator ? `translateX(${indicator.left}px) scaleX(${indicator.width})` : null;
  });

  /** Drives the fade: a tile leaving gives its opacity up only once it has come to a stand. */
  protected readonly _isScrolling = signal(false);

  private _settleTimeout?: ReturnType<typeof setTimeout>;

  /** Whether the first render has been through, so the viewport has a size to measure against. */
  private _measured = false;

  /**
   * A pick can land on a tile the reader can only half see - one peeking in at either edge - and then
   * the pick is a request to see it. A tile already in view is left where it is.
   */
  private readonly _revealPicked = afterRenderEffect(() => {
    const picked = this._items().find((item) => item.selected());
    if (!this._measured || !picked || !this._isClipped(picked)) {
      return;
    }
    this._revealSelected('smooth');
  });

  /** When the viewport last changed size, to tell a clamp apart from the reader moving the track. */
  private _resizedAt = 0;

  /** How much of the track is out of view, in pixels. */
  private readonly _scrollableWidth = computed(() =>
    Math.max(0, this._scrollWidth() - this._viewportWidth()),
  );

  protected readonly _canScrollBack = computed(() => this._scrollLeft() > SCROLL_EPSILON);

  protected readonly _canScrollForward = computed(
    () => this._scrollLeft() < this._scrollableWidth() - SCROLL_EPSILON,
  );

  protected readonly _progressWidth = computed(() => {
    const scrollWidth = this._scrollWidth();
    return scrollWidth ? `${(this._viewportWidth() / scrollWidth) * 100}%` : '100%';
  });

  protected readonly _progressOffset = computed(() => {
    const scrollWidth = this._scrollWidth();
    return scrollWidth ? `${(this._scrollLeft() / scrollWidth) * 100}%` : '0%';
  });

  /**
   * One tab per tile, each one active while its tile is in view - which is what makes the tabs of the
   * tiles side by side read as one. Tiles without a label leave the bar out altogether: the tabs stand
   * for the tiles, so a bar missing some of them would point at the wrong ones.
   */
  protected readonly _tabs = computed(() => {
    const items = this._items();
    if (!items.length || items.some((item) => !item.carouselLabel())) {
      return [];
    }
    const leading = this._leadingTile();
    const trailing = leading + this._tilesPerView();
    return items.map((item, index) => ({
      label: item.carouselLabel()!,
      element: item._elementRef.nativeElement,
      active: index >= leading && index < trailing,
    }));
  });

  protected readonly _tabsCanScrollBack = computed(() => this._tabsScrollLeft() > SCROLL_EPSILON);

  protected readonly _tabsCanScrollForward = computed(
    () => this._tabsScrollLeft() < this._tabsScrollWidth() - this._tabsWidth() - SCROLL_EPSILON,
  );

  constructor() {
    // The bar reports where the track sits rather than holding a position of its own, so it follows the
    // tiles into view - but only once the leading tab has left it, or every scroll would drag the bar
    // out from under the reader. After the render rather than with the highlight: the tabs it measures
    // change width as they take the active font weight.
    afterRenderEffect(() => {
      this._measureIndicator();

      const leading = this._tabs().findIndex((tab) => tab.active);
      const button = this._tabButtons()[leading]?.nativeElement;
      const list = this._tabList()?.nativeElement;
      if (leading < 0 || !button || !list) {
        return;
      }
      const listRect = list.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      if (buttonRect.left >= listRect.left && buttonRect.right <= listRect.right) {
        return;
      }
      list.scrollTo({
        left: buttonRect.left - listRect.left + list.scrollLeft,
        behavior: 'smooth',
      });
    });

    afterNextRender(() => {
      const viewport = this._viewport().nativeElement;
      const resizeObserver = new ResizeObserver(() => {
        this._resizedAt = performance.now();
        this._measure();
      });
      resizeObserver.observe(viewport);

      const visibilityObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle(OUTSIDE_CLASS, entry.intersectionRatio < FULLY_IN_VIEW);
          }
        },
        { root: viewport, threshold: [0, FULLY_IN_VIEW] },
      );

      const syncChildren = () => {
        visibilityObserver.disconnect();
        for (const child of Array.from(viewport.children)) {
          resizeObserver.observe(child);
          visibilityObserver.observe(child);
        }
        this._measure();
      };
      syncChildren();
      this._revealSelected();
      this._measured = true;

      // Tiles can come and go, and dropping one resizes nothing the ResizeObserver watches.
      const mutationObserver = new MutationObserver(syncChildren);
      mutationObserver.observe(viewport, { childList: true });

      this._destroyRef.onDestroy(() => {
        clearTimeout(this._settleTimeout);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        mutationObserver.disconnect();
      });
    });
  }

  /**
   * Brings the picked tile into view, centred where there is room on both sides and as near as the
   * ends allow otherwise, which is what clamping the scroll position leaves.
   *
   * The track opens on the tile picked before the first render - that is the one the reader came for
   * - instantly, the track having started there rather than moved. Later it only steps in for a tile
   * the reader cannot fully see, and smoothly, so the movement reads as a consequence of the pick. A
   * tile already in view stays where it is: pulling the track out from under a reader who is looking
   * at what they picked would lose their place.
   */
  private _revealSelected(behavior: ScrollBehavior = 'auto'): void {
    const selected = this._items().find((item) => item.selected());
    if (!selected) {
      return;
    }
    const viewport = this._viewport().nativeElement;
    const tile = selected._elementRef.nativeElement.getBoundingClientRect();
    const view = viewport.getBoundingClientRect();
    viewport.scrollTo({
      left: viewport.scrollLeft + tile.left - view.left - (view.width - tile.width) / 2,
      behavior,
    });
  }

  /** Whether a tile is short of the viewport at either edge, however little. */
  private _isClipped(item: NxProductTileCarouselItem): boolean {
    const view = this._viewport().nativeElement.getBoundingClientRect();
    const tile = item._elementRef.nativeElement.getBoundingClientRect();
    return tile.left < view.left - 1 || tile.right > view.right + 1;
  }

  /** Scrolls by one tile, letting the scroll-snap points land the track exactly. */
  protected _scrollByTile(direction: -1 | 1): void {
    const viewport = this._viewport().nativeElement;
    viewport.scrollBy({ left: direction * this._tileStep(), behavior: 'smooth' });
  }

  /**
   * Movement, not every reposition: a scroll event on its own is what clamping the track to a
   * resized viewport raises, or a jump straight to a position, and holding the fade off for that
   * runs the faded tiles up to full opacity and back without the track having gone anywhere.
   * Scrolling - by hand, by wheel or by snap - raises dozens of events, so a second one inside the
   * settle window is what says the track is moving.
   */
  protected _onScroll(): void {
    this._scrollLeft.set(this._viewport().nativeElement.scrollLeft);
    this._measureTiles();
    // Resizing clamps the track, which raises scroll events the reader never asked for - however
    // many of them a run of resizes raises.
    const clamped = performance.now() - this._resizedAt < SCROLL_SETTLE_DURATION;
    if (!clamped && this._settleTimeout !== undefined) {
      this._isScrolling.set(true);
      clearTimeout(this._settleTimeout);
    }
    this._settleTimeout = setTimeout(() => {
      this._isScrolling.set(false);
      this._settleTimeout = undefined;
    }, SCROLL_SETTLE_DURATION);
  }

  protected _onTabsScroll(): void {
    this._measureTabs();
  }

  /**
   * Brings a tab's tile into view and no further: a tile already in view stays where it is, and one
   * outside comes in at the edge it sits behind rather than being pulled to the start of the track -
   * the reader asked for that tile, not for the ones the track would carry along. The snap points land
   * the track exactly.
   */
  protected _scrollToTab(index: number): void {
    const leading = this._leadingTile();
    const perView = this._tilesPerView();
    if (index >= leading && index < leading + perView) {
      return;
    }
    const tile = this._tabs()[index < leading ? index : index - perView + 1]?.element;
    if (!tile) {
      return;
    }
    const viewport = this._viewport().nativeElement;
    viewport.scrollTo({
      left:
        tile.getBoundingClientRect().left -
        viewport.getBoundingClientRect().left +
        viewport.scrollLeft,
      behavior: 'smooth',
    });
  }

  private _tileStep(): number {
    const viewport = this._viewport().nativeElement;
    const first = viewport.firstElementChild;
    if (!first) {
      return this._viewportWidth();
    }
    const gap = parseFloat(getComputedStyle(viewport).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }

  private _measure(): void {
    const viewport = this._viewport().nativeElement;
    this._scrollLeft.set(viewport.scrollLeft);
    this._scrollWidth.set(viewport.scrollWidth);
    this._viewportWidth.set(viewport.clientWidth);
    this._measureTiles();
    this._measureTabs();
    this._measureIndicator();
  }

  private _measureTiles(): void {
    const items = this._items();
    if (!items.length) {
      return;
    }
    const viewport = this._viewport().nativeElement;
    const step = this._tileStep();
    const style = getComputedStyle(viewport);
    // How many whole tiles the view holds: the space they have between them counts once less than they
    // do, and whatever is left over is the peek of the next one.
    const room =
      viewport.clientWidth -
      parseFloat(style.paddingInlineStart) -
      parseFloat(style.paddingInlineEnd) +
      (parseFloat(style.columnGap) || 0) +
      SCROLL_EPSILON;
    const perView = Math.min(items.length, Math.max(1, step ? Math.floor(room / step) : 1));
    this._tilesPerView.set(perView);

    const view = viewport.getBoundingClientRect();
    const leading = items.findIndex((item) => {
      const tile = item._elementRef.nativeElement.getBoundingClientRect();
      return tile.left >= view.left - SCROLL_EPSILON && tile.right <= view.right + SCROLL_EPSILON;
    });
    // Halfway through a scroll no tile is in the view whole. The bar keeps the tiles it had until the
    // next one has arrived, which is what lets it move in one piece.
    if (leading >= 0) {
      this._leadingTile.set(Math.min(leading, items.length - perView));
    }
  }

  private _measureTabs(): void {
    const list = this._tabList()?.nativeElement;
    if (!list) {
      return;
    }
    this._tabsScrollLeft.set(list.scrollLeft);
    this._tabsScrollWidth.set(list.scrollWidth);
    this._tabsWidth.set(list.clientWidth);
  }

  private _measureIndicator(): void {
    const buttons = this._tabButtons();
    const list = this._tabList()?.nativeElement;
    let first: HTMLElement | undefined;
    let last: HTMLElement | undefined;
    this._tabs().forEach((tab, index) => {
      if (tab.active) {
        first ??= buttons[index]?.nativeElement;
        last = buttons[index]?.nativeElement;
      }
    });
    if (!first || !last || !list) {
      this._tabIndicator.set(null);
      return;
    }
    // Measured off the rendered boxes rather than `offsetLeft`, which rounds to whole pixels and would
    // leave the indicator half a pixel off the label it stands for.
    const listRect = list.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    this._tabIndicator.set({
      left: firstRect.left - listRect.left + list.scrollLeft,
      width: last.getBoundingClientRect().right - firstRect.left,
    });
  }
}
