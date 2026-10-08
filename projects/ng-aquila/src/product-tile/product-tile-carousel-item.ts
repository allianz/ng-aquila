import { ElementRef, InjectionToken, Signal } from '@angular/core';

/** What the carousel needs of a tile to put it on its tab bar. */
export abstract class NxProductTileCarouselItem {
  abstract readonly carouselLabel: Signal<string | null>;
  abstract readonly _elementRef: ElementRef<HTMLElement>;
  abstract readonly selected: Signal<boolean>;
}

/**
 * How a layout that projects its tiles into a carousel of its own - the group - hands them over. The
 * only way the carousel learns of them: a content query would stop at the projection, so it would see
 * none of them.
 */
export interface NxProductTileCarouselItems {
  readonly _items: Signal<readonly NxProductTileCarouselItem[]>;
}

export const NX_PRODUCT_TILE_CAROUSEL_ITEMS = new InjectionToken<NxProductTileCarouselItems>(
  'NX_PRODUCT_TILE_CAROUSEL_ITEMS',
);
