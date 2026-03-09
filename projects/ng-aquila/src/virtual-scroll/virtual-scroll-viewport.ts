import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  NgZone,
  output,
  signal,
  viewChild,
} from '@angular/core';

import {
  NX_VIRTUAL_SCROLL_VIEWPORT,
  VirtualForOf,
  VirtualScrollViewport,
} from './virtual-scroll-viewport.token';

/** Event emitted when visible range changes */
export interface VirtualRangeChangeEvent {
  start: number;
  end: number;
}

@Component({
  selector: 'nx-virtual-viewport',
  templateUrl: './virtual-scroll-viewport.html',
  styleUrl: './virtual-scroll-viewport.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-virtual-viewport',
  },
  providers: [{ provide: NX_VIRTUAL_SCROLL_VIEWPORT, useExisting: NxVirtualViewportComponent }],
})
export class NxVirtualViewportComponent implements VirtualScrollViewport {
  /** Estimated height in pixels for items before measurement (default: 36) */
  readonly itemHeight = input<number>(36);

  /** Number of items to render above/below the visible area (default: 20) */
  readonly overscan = input<number>(20);

  /** Emitted when the visible range changes */
  readonly visibleRangeChange = output<VirtualRangeChangeEvent>();

  readonly _viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  readonly _sizer = viewChild.required<ElementRef<HTMLElement>>('sizer');

  private readonly _ngZone = inject(NgZone);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _injector = inject(Injector);

  /** Reference to the VirtualFor directive */
  private readonly _virtualFor = signal<VirtualForOf | null>(null);

  /** Viewport height (measured) */
  private readonly _viewportHeight = signal<number>(0);

  /** RAF request ID for scroll handling */
  private _scrollRafId: number | null = null;

  /** ResizeObserver for monitoring viewport size changes */
  private _viewportResizeObserver: ResizeObserver | null = null;

  /** Whether a smooth scroll animation is in progress */
  private _smoothScrollInProgress = false;

  /** Target index for smooth scroll (to correct position after animation) */
  private _smoothScrollTargetIndex: number | null = null;

  /** Timeout for detecting smooth scroll completion */
  private _smoothScrollTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Viewport height - directive reads this for resize updates */
  readonly viewportHeight = computed(() => this._viewportHeight());

  /** Total content height in pixels (read-only, for template) */
  readonly totalHeight = computed(() => this._virtualFor()?.totalContentHeight() ?? 0);

  constructor() {
    // Set up after first render
    afterNextRender(
      () => {
        this._setupScrollListener();
        this._setupViewportResizeObserver();
        this._measureViewportHeight();
      },
      { injector: this._injector },
    );

    // Watch the directive's visible range and emit the output
    effect(() => {
      const forOf = this._virtualFor();
      if (forOf) {
        const range = forOf.visibleRange();
        this.visibleRangeChange.emit({ start: range.start, end: range.end });
      }
    });
  }

  /**
   * Register the VirtualFor directive so viewport can call its methods.
   * We register it instead of a contentChild query that it is available as early as possible and
   * for edge cases when the directive would be wrapped in another component.
   */
  setForOf(forOf: VirtualForOf): void {
    this._virtualFor.set(forOf);
  }

  /**
   * Scroll to a specific index
   * @param index The index to scroll to
   * @param behavior Scroll behavior ('auto' | 'smooth')
   */
  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    const virtualFor = this._virtualFor();
    if (!virtualFor) {
      return;
    }

    // Track smooth scrolling to avoid interrupting the animation
    if (behavior === 'smooth') {
      this._smoothScrollInProgress = true;
      this._smoothScrollTargetIndex = index;
    }

    const offset = virtualFor.getOffsetForIndex(index);
    this._viewport().nativeElement.scrollTo({ top: offset, behavior });
  }

  /**
   * Scroll an item into view using 'nearest' behavior (minimal scrolling)
   */
  scrollIntoView(index: number): void {
    const virtualFor = this._virtualFor();
    if (!virtualFor) {
      return;
    }

    const viewport = this._viewport().nativeElement;
    const scrollTop = viewport.scrollTop;
    const viewportHeight = viewport.clientHeight;
    const itemOffset = virtualFor.getOffsetForIndex(index);
    const itemHeight = virtualFor.getHeightForIndex(index);

    const itemTop = itemOffset;
    const itemBottom = itemOffset + itemHeight;
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + viewportHeight;

    if (itemTop < viewportTop) {
      // Item is above viewport, scroll up
      viewport.scrollTo({ top: itemTop, behavior: 'auto' });
    } else if (itemBottom > viewportBottom) {
      // Item is below viewport, scroll down
      viewport.scrollTo({ top: itemBottom - viewportHeight, behavior: 'auto' });
    }
    // Otherwise item is already visible, no scroll needed
  }

  /**
   * Set up the scroll event listener with RAF throttling
   */
  private _setupScrollListener(): void {
    const viewport = this._viewport().nativeElement;

    const handleScroll = () => {
      if (this._scrollRafId === null) {
        this._scrollRafId = requestAnimationFrame(() => {
          this._scrollRafId = null;
          this._onScroll();
        });
      }
    };

    this._ngZone.runOutsideAngular(() => {
      viewport.addEventListener('scroll', handleScroll, { passive: true });
    });

    this._destroyRef.onDestroy(() => {
      viewport.removeEventListener('scroll', handleScroll);
      if (this._scrollRafId !== null) {
        cancelAnimationFrame(this._scrollRafId);
      }
      if (this._smoothScrollTimeout !== null) {
        clearTimeout(this._smoothScrollTimeout);
      }
    });
  }

  /**
   * Handle scroll event (called via RAF)
   */
  private _onScroll(): void {
    // If smooth scroll is in progress, reset the idle timeout
    // This detects when the animation completes (no more scroll events)
    if (this._smoothScrollInProgress) {
      if (this._smoothScrollTimeout !== null) {
        clearTimeout(this._smoothScrollTimeout);
      }
      this._smoothScrollTimeout = setTimeout(() => {
        this._smoothScrollInProgress = false;
        this._smoothScrollTimeout = null;
        // After smooth scroll completes, do a final instant scroll to correct position
        // (heights may have changed during scrolling, making the original offset wrong)
        if (this._smoothScrollTargetIndex !== null) {
          const targetIndex = this._smoothScrollTargetIndex;
          this._smoothScrollTargetIndex = null;
          this.scrollToIndex(targetIndex, 'auto');
        }
      }, 150);
    }

    const el = this._viewport().nativeElement;
    const scrollTop = el.scrollTop;

    // Directly tell the directive to update with new scroll position
    const virtualFor = this._virtualFor();
    if (virtualFor) {
      this._ngZone.run(() => {
        virtualFor.updateForScroll(scrollTop, this._viewportHeight());
      });
    }
  }

  /**
   * Get the current DOM scroll position directly (bypassing signal)
   */
  getDomScrollTop(): number {
    return this._viewport().nativeElement.scrollTop;
  }

  /**
   * Get the current DOM viewport height directly (bypassing signal)
   */
  getDomViewportHeight(): number {
    return this._viewport().nativeElement.clientHeight;
  }

  /**
   * Check if viewport is currently scrolled to the bottom (using DOM values)
   */
  isAtBottom(): boolean {
    const el = this._viewport().nativeElement;
    return el.scrollHeight - el.offsetHeight - el.scrollTop < 1;
  }

  /**
   * Imperatively update the spacer height on the DOM.
   * This bypasses the async signal → computed → template binding cycle,
   * ensuring the browser has the correct scrollHeight before scrolling.
   */
  updateSpacerHeight(height: number): void {
    this._sizer().nativeElement.style.height = `${height}px`;
  }

  /**
   * Set the scroll position directly
   */
  setScrollTop(scrollTop: number): void {
    this._viewport().nativeElement.scrollTop = scrollTop;
  }

  /**
   * Check if a smooth scroll animation is in progress
   */
  isScrollActive(): boolean {
    return this._smoothScrollInProgress;
  }

  /**
   * Measure the viewport height
   */
  private _measureViewportHeight(): void {
    const height = this._viewport().nativeElement.clientHeight;
    this._viewportHeight.set(height);
  }

  /**
   * Set up ResizeObserver to monitor viewport size changes
   */
  private _setupViewportResizeObserver(): void {
    this._viewportResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height !== this._viewportHeight()) {
          this._ngZone.run(() => {
            this._viewportHeight.set(height);
          });
        }
      }
    });

    this._viewportResizeObserver.observe(this._viewport().nativeElement);

    this._destroyRef.onDestroy(() => {
      this._viewportResizeObserver?.disconnect();
    });
  }
}
