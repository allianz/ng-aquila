import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  Injector,
  input,
  NgZone,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import {
  ListRange,
  NX_VIRTUAL_SCROLL_VIEWPORT,
  VirtualForOf,
  VirtualScrollViewport,
} from './virtual-scroll-viewport.token';

/** Context provided to templates rendered by NxVirtualFor */
export interface NxVirtualForContext<T> {
  /** The item data (available as implicit) */
  $implicit: T;
  /** The index in the source array */
  index: number;
  /** Total number of items */
  count: number;
  /** Whether this is the first item */
  first: boolean;
  /** Whether this is the last item */
  last: boolean;
  /** Whether the index is even */
  even: boolean;
  /** Whether the index is odd */
  odd: boolean;
}

/** Function type for trackBy */
export type TrackByFunction<T> = (index: number, item: T) => unknown;

/** Accessor type - can be a property name string or a function */
export type TrackByAccessor<T> = string | TrackByFunction<T>;

/**
 * Structural directive for rendering items in a virtual scroll viewport.
 * @example
 * ```html
 * <nx-virtual-viewport>
 *   <div *nxVirtualFor="let item of items(); trackBy: 'id'">
 *     {{ item.name }}
 *   </div>
 * </nx-virtual-viewport>
 * ```
 */
@Directive({
  selector: '[nxVirtualFor][nxVirtualForOf]',
})
export class NxVirtualFor<T> implements VirtualForOf {
  /** The data source (array of items) */
  readonly nxVirtualForOf = input.required<T[]>();

  /** Property name or function to use for tracking items */
  readonly nxVirtualForTrackBy = input<TrackByAccessor<T>>('');

  private readonly _template = inject(TemplateRef<NxVirtualForContext<T>>);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _viewport = inject<VirtualScrollViewport>(NX_VIRTUAL_SCROLL_VIEWPORT);
  private readonly _ngZone = inject(NgZone);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);

  /** Cache of embedded views by index */
  private readonly _viewCache = new Map<number, EmbeddedViewRef<NxVirtualForContext<T>>>();

  /** Cache of item keys for efficient view recycling */
  private readonly _keyCache = new Map<number, unknown>();

  /** Cache of measured heights, keyed by trackBy identity */
  private readonly _heightCache = new Map<unknown, number>();

  /** Maximum cache size before triggering cleanup */
  private readonly _heightCacheMaxSize = 1000;

  /** Cached position data for all items */
  private readonly _positionCache = signal<{ offset: number; height: number }[]>([]);

  /** Total height of all content (viewport reads this reactively) */
  readonly totalContentHeight = computed(() => {
    const positions = this._positionCache();
    if (positions.length === 0) {
      return 0;
    }
    const last = positions[positions.length - 1];
    return last.offset + last.height;
  });

  /** Current visible range (start and end indices) */
  private readonly _visibleRange = signal<ListRange>({ start: 0, end: 0 });

  /** Public accessor for visible range (viewport reads this reactively to emit visibleRangeChange) */
  readonly visibleRange = computed(() => this._visibleRange());

  /** ResizeObserver for monitoring item size changes */
  private _itemResizeObserver: ResizeObserver | null = null;

  /** Set of currently observed elements */
  private readonly _observedElements = new Set<Element>();

  /** RAF request ID for measurement */
  private _measureRafId: number | null = null;

  /** Pending measurement flag to prevent duplicate measurements */
  private _measurementPending = false;

  /** Whether initialization is complete */
  private _initialized = false;

  constructor() {
    // Register with viewport
    this._viewport.setForOf(this);

    // React to data changes - recalculate positions and render
    effect(() => {
      const data = this.nxVirtualForOf();
      this._rebuildPositionCache(data);

      if (this._initialized) {
        // Force re-render on data changes even if range is the same
        this._updateAndRender(true);
      }
    });

    // React to viewport resize - recalculate visible range
    effect(() => {
      this._viewport.viewportHeight();

      if (this._initialized) {
        this._updateAndRender();
      }
    });

    // Set up after first render
    afterNextRender(
      () => {
        this._setupItemResizeObserver();
        this._initialized = true;
        this._updateAndRender();
      },
      { injector: this._injector },
    );
  }

  /**
   * Get the offset position for an item (called by viewport for scrollToIndex)
   */
  getOffsetForIndex(index: number): number {
    const positions = this._positionCache();
    if (index < 0 || index >= positions.length) {
      return 0;
    }
    return positions[index].offset;
  }

  /**
   * Get the height for an item (called by viewport for scrollIntoView)
   */
  getHeightForIndex(index: number): number {
    const positions = this._positionCache();
    if (index < 0 || index >= positions.length) {
      return this._viewport.itemHeight();
    }
    return positions[index].height;
  }

  /**
   * Resolve trackBy accessor to a function
   */
  private _getTrackByFn(): TrackByFunction<T> | null {
    const accessor = this.nxVirtualForTrackBy();
    if (!accessor) {
      return null;
    }
    if (typeof accessor === 'function') {
      return accessor;
    }
    return (_index: number, item: T) => (item as { [key: string]: unknown })[accessor];
  }

  /**
   * Get the tracking key for an item
   */
  private _getItemKey(index: number, item: T): unknown {
    const trackByFn = this._getTrackByFn();
    if (trackByFn) {
      return trackByFn(index, item);
    }
    return item;
  }

  /**
   * Get the height for an item (cached or estimated)
   */
  private _getItemHeight(item: T, index: number): number {
    const key = this._getItemKey(index, item);
    return this._heightCache.get(key) ?? this._viewport.itemHeight();
  }

  /**
   * Cache the measured height for an item
   */
  private _cacheHeight(key: unknown, height: number): boolean {
    const currentHeight = this._heightCache.get(key);
    if (currentHeight !== height) {
      // Clean up cache if too large
      if (this._heightCache.size >= this._heightCacheMaxSize) {
        // Remove oldest entries (FIFO)
        const toRemove = this._heightCache.size - this._heightCacheMaxSize + 1;
        const keys = this._heightCache.keys();
        for (let i = 0; i < toRemove; i++) {
          const keyResult = keys.next();
          if (!keyResult.done) {
            this._heightCache.delete(keyResult.value);
          }
        }
      }
      this._heightCache.set(key, height);
      return true;
    }
    return false;
  }

  /**
   * Rebuild position cache from data using height cache.
   * Returns the new total content height.
   */
  private _rebuildPositionCache(data: T[]): number {
    const positions: { offset: number; height: number }[] = [];
    let currentOffset = 0;

    for (let i = 0; i < data.length; i++) {
      const height = this._getItemHeight(data[i], i);
      positions.push({ offset: currentOffset, height });
      currentOffset += height;
    }

    this._positionCache.set(positions);
    return currentOffset; // This is the total height
  }

  /**
   * Find the start index for a given scroll position using binary search
   */
  private _findStartIndex(scrollTop: number): number {
    const positions = this._positionCache();
    if (positions.length === 0) {
      return 0;
    }

    let low = 0;
    let high = positions.length - 1;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const position = positions[mid];

      if (position.offset + position.height <= scrollTop) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }

  /**
   * Calculate the visible range based on scroll position and viewport height
   */
  private _calculateVisibleRange(scrollTop: number, viewportHeight: number): ListRange {
    const positions = this._positionCache();
    const itemCount = positions.length;

    if (itemCount === 0) {
      return { start: 0, end: 0 };
    }

    const overscan = this._viewport.overscan();

    // Find start with binary search
    let start = this._findStartIndex(scrollTop);

    // Apply overscan to start
    start = Math.max(0, start - overscan);

    // Find end by walking forward
    let end = start;
    const scrollBottom = scrollTop + viewportHeight;

    while (end < itemCount && positions[end].offset < scrollBottom) {
      end++;
    }

    // Apply overscan to end
    end = Math.min(itemCount, end + overscan);

    return { start, end };
  }

  /**
   * Called by viewport when scroll position changes.
   * Directly updates visible range and renders items.
   */
  updateForScroll(scrollTop: number, viewportHeight: number): void {
    this._updateVisibleRange(scrollTop, viewportHeight);
  }

  /**
   * Internal helper to update and render using current DOM values
   * @param forceRender If true, always re-render even if range hasn't changed
   */
  private _updateAndRender(forceRender = false): void {
    const scrollTop = this._viewport.getDomScrollTop();
    const viewportHeight = this._viewport.getDomViewportHeight();
    this._updateVisibleRange(scrollTop, viewportHeight, forceRender);
  }

  /**
   * Update the visible range and render items if changed
   * @param scrollTop Current scroll position
   * @param viewportHeight Current viewport height
   * @param forceRender If true, always re-render even if range hasn't changed
   */
  private _updateVisibleRange(
    scrollTop: number,
    viewportHeight: number,
    forceRender = false,
  ): void {
    const newRange = this._calculateVisibleRange(scrollTop, viewportHeight);
    const currentRange = this._visibleRange();
    const rangeChanged = newRange.start !== currentRange.start || newRange.end !== currentRange.end;

    if (rangeChanged) {
      this._visibleRange.set(newRange);
    }

    if (rangeChanged || forceRender) {
      this._renderItems(newRange, this.nxVirtualForOf());
    }
  }

  /**
   * Create the template context for an item
   */
  private _createContext(item: T, index: number, count: number): NxVirtualForContext<T> {
    return {
      $implicit: item,
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
    };
  }

  /**
   * Update an existing context with new values
   */
  private _updateContext(
    context: NxVirtualForContext<T>,
    item: T,
    index: number,
    count: number,
  ): void {
    context.$implicit = item;
    context.index = index;
    context.count = count;
    context.first = index === 0;
    context.last = index === count - 1;
    context.even = index % 2 === 0;
    context.odd = index % 2 !== 0;
  }

  /**
   * Render items in the given range
   */
  private _renderItems(range: ListRange, data: T[]): void {
    const { start, end } = range;
    const positions = this._positionCache();
    const count = data.length;

    // Track which indices we need to render
    const indicesToRender = new Set<number>();
    for (let i = start; i < end && i < count; i++) {
      indicesToRender.add(i);
    }

    // Remove views outside range
    for (const [index, view] of this._viewCache) {
      if (!indicesToRender.has(index)) {
        view.destroy();
        this._viewCache.delete(index);
        this._keyCache.delete(index);
      }
    }

    // Create/update views in range
    for (let i = start; i < end && i < count; i++) {
      const item = data[i];
      const newKey = this._getItemKey(i, item);
      const cachedKey = this._keyCache.get(i);
      const offset = positions[i]?.offset ?? i * this._viewport.itemHeight();

      let view = this._viewCache.get(i);

      // Check if we need to recreate the view (item changed)
      if (view && cachedKey !== newKey) {
        view.destroy();
        this._viewCache.delete(i);
        this._keyCache.delete(i);
        view = undefined;
      }

      if (!view) {
        // Create new view
        const context = this._createContext(item, i, count);
        view = this._viewContainerRef.createEmbeddedView(this._template, context, {
          injector: this._injector,
        });
        this._viewCache.set(i, view);
        this._keyCache.set(i, newKey);
      } else {
        // Update existing view's context
        this._updateContext(view.context, item, i, count);
        view.markForCheck();
      }

      // Position the view and set the data attribute for measurement
      const rootNode = view.rootNodes[0];
      if (rootNode instanceof HTMLElement) {
        rootNode.style.position = 'absolute';
        rootNode.style.top = '0';
        rootNode.style.left = '0';
        rootNode.style.width = '100%';
        rootNode.style.transform = `translateY(${offset}px)`;
        rootNode.setAttribute('data-virtual-index', String(i));
      }
    }

    // Schedule measurement after rendering
    if (this._initialized) {
      this._scheduleMeasurement();
    }
  }

  /**
   * Set up ResizeObserver to monitor item size changes
   */
  private _setupItemResizeObserver(): void {
    this._itemResizeObserver = new ResizeObserver(() => {
      if (!this._measurementPending) {
        this._scheduleMeasurement();
      }
    });

    this._destroyRef.onDestroy(() => {
      this._itemResizeObserver?.disconnect();
      if (this._measureRafId !== null) {
        cancelAnimationFrame(this._measureRafId);
      }
    });
  }

  /**
   * Schedule a measurement of visible items
   */
  private _scheduleMeasurement(): void {
    if (this._measurementPending) {
      return;
    }

    this._measurementPending = true;

    this._ngZone.runOutsideAngular(() => {
      if (this._measureRafId !== null) {
        cancelAnimationFrame(this._measureRafId);
      }

      this._measureRafId = requestAnimationFrame(() => {
        this._measureRafId = null;
        this._measureRenderedItems();
        this._measurementPending = false;
      });
    });
  }

  /**
   * Measure all currently rendered items and update caches
   */
  private _measureRenderedItems(): void {
    const data = this.nxVirtualForOf();
    const dataLength = data.length;

    // Get rendered elements from view cache
    let hasChanges = false;
    const currentElements = new Set<Element>();

    for (const [index, view] of this._viewCache) {
      const rootNode = view.rootNodes[0];
      if (!(rootNode instanceof HTMLElement)) {
        continue;
      }

      if (index < 0 || index >= dataLength) {
        continue;
      }

      currentElements.add(rootNode);

      const measuredHeight = rootNode.offsetHeight;
      const item = data[index];
      const key = this._getItemKey(index, item);

      if (this._cacheHeight(key, measuredHeight)) {
        hasChanges = true;
      }

      // Add to resize observer if not already observed
      if (!this._observedElements.has(rootNode)) {
        this._itemResizeObserver?.observe(rootNode);
        this._observedElements.add(rootNode);
      }
    }

    // Unobserve elements that are no longer rendered
    for (const element of this._observedElements) {
      if (!currentElements.has(element)) {
        this._itemResizeObserver?.unobserve(element);
        this._observedElements.delete(element);
      }
    }

    if (hasChanges) {
      this._ngZone.run(() => {
        // 1. Capture state BEFORE rebuilding
        const scrollTop = this._viewport.getDomScrollTop();
        const viewportHeight = this._viewport.getDomViewportHeight();
        const oldTotalHeight = this.totalContentHeight();
        const wasAtBottom = scrollTop >= oldTotalHeight - viewportHeight - 1;

        const anchorIndex = this._findStartIndex(scrollTop);
        const oldAnchorOffset = this._positionCache()[anchorIndex]?.offset ?? 0;

        // 2. Rebuild positions with new heights
        const newTotalHeight = this._rebuildPositionCache(data);

        // 3. Update spacer
        this._viewport.updateSpacerHeight(newTotalHeight);

        // 4. Adjust scroll position only when NOT actively scrolling
        // This prevents interrupting smooth scroll animations
        let scrollAdjusted = false;
        if (!this._viewport.isScrollActive()) {
          if (wasAtBottom) {
            // Stay at bottom
            const newMaxScroll = newTotalHeight - viewportHeight;
            this._viewport.setScrollTop(Math.max(0, newMaxScroll));
            scrollAdjusted = true;
          } else {
            // Anchor to maintain visual position
            const newAnchorOffset = this._positionCache()[anchorIndex]?.offset ?? 0;
            const scrollDelta = newAnchorOffset - oldAnchorOffset;
            if (scrollDelta !== 0) {
              this._viewport.setScrollTop(scrollTop + scrollDelta);
              scrollAdjusted = true;
            }
          }
        }

        // Only manually re-render if we didn't adjust scroll
        // (scroll adjustment will trigger re-render via scroll event)
        if (!scrollAdjusted) {
          this._updateAndRender();
        }
      });
    }
  }
}
