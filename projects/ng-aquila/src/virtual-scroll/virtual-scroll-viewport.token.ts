import { InjectionToken, InputSignal, Signal } from '@angular/core';

/** Represents a range of indices in a list */
export interface ListRange {
  start: number;
  end: number;
}

/** Interface for the VirtualFor directive that the viewport communicates with */
export interface VirtualForOf {
  /** Get the offset position for an item by index */
  getOffsetForIndex(index: number): number;

  /** Get the height for an item by index */
  getHeightForIndex(index: number): number;

  /** Total height of all content (viewport reads this reactively) */
  readonly totalContentHeight: Signal<number>;

  /** Current visible range (viewport reads this reactively to emit visibleRangeChange) */
  readonly visibleRange: Signal<ListRange>;

  /** Called by viewport when scroll position changes */
  updateForScroll(scrollTop: number, viewportHeight: number): void;
}

/** Interface for the virtual scroll viewport that the directive communicates with */
export interface VirtualScrollViewport {
  /** Estimated item height for initial calculations */
  readonly itemHeight: InputSignal<number>;

  /** Number of items to render above/below the visible area */
  readonly overscan: InputSignal<number>;

  /** Viewport height - directive reads this for resize updates */
  readonly viewportHeight: Signal<number>;

  /** Register the VirtualFor directive so viewport can call its methods */
  setForOf(forOf: VirtualForOf): void;

  /** Scroll to a specific index */
  scrollToIndex(index: number, behavior?: ScrollBehavior): void;

  /** Scroll an item into view using 'nearest' behavior (minimal scrolling) */
  scrollIntoView(index: number): void;

  /** Get the current DOM scroll position directly (bypassing signal) */
  getDomScrollTop(): number;

  /** Get the current DOM viewport height directly (bypassing signal) */
  getDomViewportHeight(): number;

  /** Check if viewport is currently scrolled to the bottom (using DOM values) */
  isAtBottom(): boolean;

  /** Imperatively update the spacer height on the DOM (bypasses signal/template async) */
  updateSpacerHeight(height: number): void;

  /** Set the scroll position directly */
  setScrollTop(scrollTop: number): void;

  /** Check if scroll is currently active (to avoid interrupting animations) */
  isScrollActive(): boolean;
}

/** Injection token for the virtual scroll viewport */
export const NX_VIRTUAL_SCROLL_VIEWPORT = new InjectionToken<VirtualScrollViewport>(
  'NxVirtualScrollViewport',
);
