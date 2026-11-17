import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  effect,
  EmbeddedViewRef,
  ErrorHandler,
  inject,
  InjectionToken,
  Injector,
  input,
  isDevMode,
  NgZone,
  OnDestroy,
  signal,
  TemplateRef,
  untracked,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';

import {
  getNxVirtualGroupOutletMisplacedError,
  getNxVirtualGroupOutletMissingError,
} from './virtual-scroll-errors';
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

/** Context provided to the group template of NxVirtualFor */
export interface NxVirtualForGroupContext<G> {
  /** The group as returned by `groupBy` */
  $implicit: G;
}

/** Function type for trackBy */
export type TrackByFunction<T> = (index: number, item: T) => unknown;

/** Accessor type - can be a property name string or a function */
export type TrackByAccessor<T> = string | TrackByFunction<T>;

interface GroupOutletRef {
  viewContainerRef: ViewContainerRef | null;
  changed: (() => void) | null;
}

interface ItemGroup<G> {
  group: G;
  key: unknown;
}

interface GroupView<G> {
  view: EmbeddedViewRef<NxVirtualForGroupContext<G>>;
  outlet: ViewContainerRef;
  outletRef: GroupOutletRef;
  key: unknown;
}

const NX_VIRTUAL_GROUP_OUTLET_REF = new InjectionToken<GroupOutletRef>('NxVirtualGroupOutletRef');

/** Marks where the items of a group are rendered inside the group template of `nxVirtualFor`. */
@Directive({
  selector: '[nxVirtualGroupOutlet]',
})
export class NxVirtualGroupOutlet implements OnDestroy {
  private readonly _outletRef: GroupOutletRef;
  private readonly _viewContainerRef = inject(ViewContainerRef);

  constructor() {
    const outletRef = inject(NX_VIRTUAL_GROUP_OUTLET_REF, { optional: true });
    if (!outletRef) {
      throw getNxVirtualGroupOutletMisplacedError();
    }
    this._outletRef = outletRef;
    outletRef.viewContainerRef = this._viewContainerRef;
    outletRef.changed?.();
  }

  ngOnDestroy(): void {
    if (this._outletRef.viewContainerRef === this._viewContainerRef) {
      this._outletRef.viewContainerRef = null;
    }
    this._outletRef.changed?.();
  }
}

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
export class NxVirtualFor<T, G = unknown> implements VirtualForOf {
  /** The data source (array of items) */
  readonly nxVirtualForOf = input.required<T[]>();

  /** Property name or function to use for tracking items */
  readonly nxVirtualForTrackBy = input<TrackByAccessor<T>>('');

  /**
   * Returns the group of an item, or `null` for items without a group.
   * The rendered items of each group (compared by `groupTrackBy`) are placed in one instance of
   * `groupTemplate`. The items of a group must be next to each other, the data isn't reordered.
   */
  readonly nxVirtualForGroupBy = input<((item: T) => G | null | undefined) | null>(null);

  /**
   * Property name or function that identifies a group. Defaults to the group itself.
   * A group that is replaced by an object with the same key keeps its container and items.
   */
  readonly nxVirtualForGroupTrackBy = input<string | ((group: G) => unknown)>('');

  /**
   * Template that wraps the rendered items of each group, e.g. to give them a `role="group"`.
   * Mark the place of the items with `nxVirtualGroupOutlet`. The wrapper must only contain the
   * outlet and must not create a containing block, so the items are still positioned in the viewport.
   */
  readonly nxVirtualForGroupTemplate = input<TemplateRef<NxVirtualForGroupContext<G>> | null>(null);

  private readonly _template = inject(TemplateRef<NxVirtualForContext<T>>);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _viewport = inject<VirtualScrollViewport>(NX_VIRTUAL_SCROLL_VIEWPORT);
  private readonly _ngZone = inject(NgZone);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);
  private readonly _errorHandler = inject(ErrorHandler);

  /** Cache of embedded views by index */
  private readonly _viewCache = new Map<number, EmbeddedViewRef<NxVirtualForContext<T>>>();

  /** Cache of item keys for efficient view recycling */
  private readonly _keyCache = new Map<number, unknown>();

  /** Group of each item, `null` for items without a group */
  private _itemGroups: (ItemGroup<G> | null)[] = [];

  /** Group view that contains each rendered item view, `null` for items in the root container */
  private readonly _groupCache = new Map<number, GroupView<G> | null>();

  /** Rendered group views by group key */
  private readonly _groupViews = new Map<unknown, GroupView<G>>();

  /** Group template that the rendered group views were created from */
  private _groupTemplateInUse: TemplateRef<NxVirtualForGroupContext<G>> | null = null;

  /** Set when the group template has no outlet, items are then rendered without groups */
  private _groupTemplateInvalid = false;

  private _groupLayoutChecked = false;

  private _repeatedGroupWarned = false;

  private _renderRafId: number | null = null;

  private _destroyed = false;

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

  /** RAF request ID for measurement, set while a measurement is pending */
  private _measureRafId: number | null = null;

  /** Whether initialization is complete */
  private _initialized = false;

  constructor() {
    // Register with viewport
    this._viewport.setForOf(this);

    // React to data changes - recalculate positions and render
    effect(() => {
      const data = this.nxVirtualForOf();
      this._rebuildItemGroups(data);
      this._rebuildPositionCache(data);

      if (this._initialized) {
        // Otherwise the effect reruns on every measurement, which writes `_positionCache` that the render reads.
        // A signal read only during the render won't rerun the effect, so read new inputs above it.
        untracked(() => this._updateAndRender(true));
      }
    });

    // React to viewport resize - recalculate visible range
    effect(() => {
      this._viewport.viewportHeight();

      if (this._initialized) {
        this._updateAndRender();
      }
    });

    this._destroyRef.onDestroy(() => {
      this._destroyed = true;
      if (this._renderRafId !== null) {
        cancelAnimationFrame(this._renderRafId);
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

  /** trackBy accessor resolved to a function */
  private readonly _trackByFn = computed<TrackByFunction<T> | null>(() => {
    const accessor = this.nxVirtualForTrackBy();
    if (!accessor) {
      return null;
    }
    if (typeof accessor === 'function') {
      return accessor;
    }
    return (_index: number, item: T) => (item as { [key: string]: unknown })[accessor];
  });

  /** groupTrackBy accessor resolved to a function */
  private readonly _groupKeyFn = computed<(group: G) => unknown>(() => {
    const accessor = this.nxVirtualForGroupTrackBy();
    if (!accessor) {
      return (group: G) => group;
    }
    if (typeof accessor === 'function') {
      return accessor;
    }
    return (group: G) => (group as { [key: string]: unknown })[accessor];
  });

  /**
   * Get the tracking key for an item
   */
  private _getItemKey(index: number, item: T): unknown {
    const trackByFn = this._trackByFn();
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

  private _rebuildItemGroups(data: T[]): void {
    const groupBy = this.nxVirtualForGroupBy();
    if (!groupBy || !this.nxVirtualForGroupTemplate()) {
      this._itemGroups = [];
      return;
    }

    const groupKey = this._groupKeyFn();
    const finishedKeys = new Set<unknown>();
    const itemGroups: (ItemGroup<G> | null)[] = [];
    let current: ItemGroup<G> | null = null;
    for (const item of data) {
      const group = groupBy(item) ?? null;
      const key = group === null ? null : groupKey(group);
      if (current && current.key !== key) {
        finishedKeys.add(current.key);
      }
      if (group === null) {
        current = null;
      } else if (!current || current.key !== key) {
        if (finishedKeys.has(key)) {
          this._warnRepeatedGroup(key);
        }
        current = { group, key };
      }
      itemGroups.push(current);
    }
    this._itemGroups = itemGroups;
  }

  private _warnRepeatedGroup(key: unknown): void {
    if (this._repeatedGroupWarned || !isDevMode()) {
      return;
    }
    this._repeatedGroupWarned = true;
    console.warn(
      'NxVirtualFor: A group appears more than once in the data, its items are rendered in its first container. ' +
        'Pass the data in display order, with the items of each group next to each other.',
      key,
    );
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
    const count = data.length;
    const start = range.start;
    const end = Math.min(range.end, count);
    const positions = this._positionCache();

    if (this.nxVirtualForGroupTemplate() !== this._groupTemplateInUse) {
      this._resetGroupViews();
    }
    // An outlet inside control flow can be destroyed or replaced, together with the item views in it.
    for (const groupView of this._groupViews.values()) {
      if (this._groupTemplateInvalid || groupView.outletRef.viewContainerRef !== groupView.outlet) {
        this._destroyGroupView(groupView);
      }
    }

    // Remove views outside range
    for (const index of this._viewCache.keys()) {
      if (index < start || index >= end) {
        this._destroyItemView(index);
      }
    }
    // Before placing views, so the remaining ones don't have to move around them.
    this._destroyUnusedGroupViews(start, end);

    // Views are kept in item order in the DOM, so assistive technology reads them in order.
    let rootIndex = 0;
    let hasUnmeasuredRows = false;
    const outletIndices = new Map<GroupView<G>, number>();

    for (let i = start; i < end; i++) {
      const item = data[i];
      const newKey = this._getItemKey(i, item);
      const offset = positions[i]?.offset ?? i * this._viewport.itemHeight();

      const groupView = this._getGroupView(i, rootIndex);
      let containerIndex: number;
      if (groupView) {
        if (!outletIndices.has(groupView)) {
          this._placeView(this._viewContainerRef, groupView.view, rootIndex++);
        }
        containerIndex = outletIndices.get(groupView) ?? 0;
        outletIndices.set(groupView, containerIndex + 1);
      } else {
        containerIndex = rootIndex++;
      }
      const container = groupView?.outlet ?? this._viewContainerRef;

      let view = this._viewCache.get(i);

      // Check if we need to recreate the view (item or its group changed)
      if (view && (this._keyCache.get(i) !== newKey || this._groupCache.get(i) !== groupView)) {
        this._destroyItemView(i);
        view = undefined;
      }

      if (!view) {
        // Create new view
        const context = this._createContext(item, i, count);
        view = container.createEmbeddedView(this._template, context, {
          index: containerIndex,
          injector: this._injector,
        });
        // Without it, a root element that only wraps control flow is measured empty when nothing checks the view first.
        view.detectChanges();
        this._viewCache.set(i, view);
        this._keyCache.set(i, newKey);
        this._groupCache.set(i, groupView);
      } else {
        this._placeView(container, view, containerIndex);
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
        hasUnmeasuredRows ||= !this._observedElements.has(rootNode);
      }
    }

    // Measured rows are observed. Remeasuring them after every render never settles when rows share a key.
    if (this._initialized && hasUnmeasuredRows) {
      this._scheduleMeasurement();
    }
  }

  private _placeView(container: ViewContainerRef, view: ViewRef, index: number): void {
    if (container.get(index) !== view) {
      container.move(view, index);
    }
  }

  private _destroyItemView(index: number): void {
    this._viewCache.get(index)?.destroy();
    this._viewCache.delete(index);
    this._keyCache.delete(index);
    this._groupCache.delete(index);
  }

  /** Returns the group view of an item, creating it at `rootIndex` if it doesn't exist yet. */
  private _getGroupView(index: number, rootIndex: number): GroupView<G> | null {
    const itemGroup = this._itemGroups[index];
    if (!itemGroup || !this._groupTemplateInUse || this._groupTemplateInvalid) {
      return null;
    }

    const existing = this._groupViews.get(itemGroup.key);
    if (!existing) {
      return this._createGroupView(itemGroup, this._groupTemplateInUse, rootIndex);
    }
    if (existing.view.context.$implicit !== itemGroup.group) {
      existing.view.context.$implicit = itemGroup.group;
      existing.view.markForCheck();
    }
    return existing;
  }

  private _createGroupView(
    itemGroup: ItemGroup<G>,
    template: TemplateRef<NxVirtualForGroupContext<G>>,
    rootIndex: number,
  ): GroupView<G> | null {
    const outletRef: GroupOutletRef = { viewContainerRef: null, changed: null };
    const view = this._viewContainerRef.createEmbeddedView(
      template,
      { $implicit: itemGroup.group },
      {
        index: rootIndex,
        injector: Injector.create({
          providers: [{ provide: NX_VIRTUAL_GROUP_OUTLET_REF, useValue: outletRef }],
          parent: this._injector,
        }),
      },
    );
    // An outlet inside control flow only exists after change detection.
    view.detectChanges();

    if (!outletRef.viewContainerRef) {
      view.destroy();
      // Set before throwing, so later renders fall back to items without groups instead of throwing again.
      this._groupTemplateInvalid = true;
      this._scheduleRender();
      if (isDevMode()) {
        throw getNxVirtualGroupOutletMissingError();
      }
      return null;
    }

    const groupView: GroupView<G> = {
      view,
      outlet: outletRef.viewContainerRef,
      outletRef,
      key: itemGroup.key,
    };
    outletRef.changed = () => this._scheduleRender();
    this._groupViews.set(itemGroup.key, groupView);
    return groupView;
  }

  /** Destroys a group view together with the item views in it. */
  private _destroyGroupView(groupView: GroupView<G>): void {
    for (const [index, itemGroupView] of this._groupCache) {
      if (itemGroupView === groupView) {
        this._destroyItemView(index);
      }
    }
    groupView.outletRef.changed = null;
    groupView.view.destroy();
    this._groupViews.delete(groupView.key);
  }

  private _scheduleRender(): void {
    if (this._renderRafId !== null || this._destroyed) {
      return;
    }
    this._ngZone.runOutsideAngular(() => {
      this._renderRafId = requestAnimationFrame(() => {
        this._renderRafId = null;
        this._ngZone.run(() => this._forceRender());
      });
    });
  }

  /** Destroys the group views that no item in the range belongs to. */
  private _destroyUnusedGroupViews(start: number, end: number): void {
    const usedGroupViews = new Set<GroupView<G>>();
    for (let i = start; i < end; i++) {
      const itemGroup = this._itemGroups[i];
      const groupView = itemGroup && this._groupViews.get(itemGroup.key);
      if (groupView) {
        usedGroupViews.add(groupView);
      }
    }
    for (const groupView of this._groupViews.values()) {
      if (!usedGroupViews.has(groupView)) {
        this._destroyGroupView(groupView);
      }
    }
  }

  private _resetGroupViews(): void {
    for (const groupView of this._groupViews.values()) {
      this._destroyGroupView(groupView);
    }
    this._groupTemplateInUse = this.nxVirtualForGroupTemplate();
    this._groupTemplateInvalid = false;
    this._groupLayoutChecked = false;
  }

  /** Warns once about a group template whose layout would misplace the items. */
  private _checkGroupLayout(): void {
    const groupView = this._groupViews.values().next().value;
    if (!groupView) {
      return;
    }
    this._groupLayoutChecked = true;

    const root = groupView.view.rootNodes[0];
    if (!(root instanceof HTMLElement)) {
      return;
    }
    const style = getComputedStyle(root);
    const createsContainingBlock =
      style.position !== 'static' ||
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      /layout|paint|strict|content/.test(style.contain) ||
      /transform|perspective|filter/.test(style.willChange);
    if (createsContainingBlock || root.offsetHeight > 0) {
      console.warn(
        'NxVirtualFor: The root element of the group template must only contain the nxVirtualGroupOutlet and must not create a containing block (position, transform, perspective, filter, contain or will-change), otherwise the items are positioned incorrectly.',
      );
    }
  }

  /**
   * Set up ResizeObserver to monitor item size changes
   */
  private _setupItemResizeObserver(): void {
    this._itemResizeObserver = new ResizeObserver(() => this._scheduleMeasurement());

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
    if (this._measureRafId !== null) {
      return;
    }

    this._ngZone.runOutsideAngular(() => {
      this._measureRafId = requestAnimationFrame(() => {
        this._measureRafId = null;
        this._measureRenderedItems();
      });
    });
  }

  /**
   * Measure all currently rendered items and update caches
   */
  private _measureRenderedItems(): void {
    if (!this._groupLayoutChecked && isDevMode()) {
      this._checkGroupLayout();
    }

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
        // The measured offsetHeight is the border box; the default content box misses padding and border changes.
        this._itemResizeObserver?.observe(rootNode, { box: 'border-box' });
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
        if (!this._viewport.isScrollActive()) {
          if (wasAtBottom) {
            // Stay at bottom
            const newMaxScroll = newTotalHeight - viewportHeight;
            this._viewport.setScrollTop(Math.max(0, newMaxScroll));
          } else {
            // Anchor to maintain visual position
            const newAnchorOffset = this._positionCache()[anchorIndex]?.offset ?? 0;
            const scrollDelta = newAnchorOffset - oldAnchorOffset;
            if (scrollDelta !== 0) {
              this._viewport.setScrollTop(scrollTop + scrollDelta);
            }
          }
        }

        // 5. Forced, since neither the new heights nor a scroll adjustment have to change the range.
        this._forceRender();
      });
    }
  }

  /** Runs outside of change detection, so errors, e.g. a missing group outlet, are reported like there. */
  private _forceRender(): void {
    try {
      this._updateAndRender(true);
    } catch (error) {
      this._errorHandler.handleError(error);
    }
  }
}
