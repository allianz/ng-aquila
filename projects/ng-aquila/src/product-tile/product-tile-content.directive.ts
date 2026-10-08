import { NX_PRICE_CONTEXT, NxPriceContext, NxPriceSize } from '@allianz/ng-aquila/price';
import { NX_SURFACE } from '@allianz/ng-aquila/surface';
import { Directive, forwardRef, inject, Provider, Signal, signal } from '@angular/core';

import { NxProductTileComponent } from './product-tile.component';

/** Stands in for the tile's size when the slot is used outside one, imposing nothing. */
const EMPTY_SIZE: Signal<NxPriceSize | undefined> = signal(undefined);

/**
 * A slot is projected from the consumer's template, so its element injector reaches the tile but
 * never the `[nxSurface]` inside the tile's template - each slot landing on a painted surface has
 * to republish it for its own content.
 */
export function provideSlotSurface(slot: '_headerSurface' | '_actionSurface'): Provider {
  return {
    provide: NX_SURFACE,
    useFactory: () => inject(NxProductTileComponent, { optional: true })?.[slot],
  };
}

/**
 * Marks a container holding the whole header, as an alternative to the eyebrow, title, subline and
 * price slots - those are ignored while one of these is present. The tile still paints the header
 * and shows the selection control; the layout in between is the consumer's.
 */
@Directive({
  selector: '[nxProductTileHeaderContent]',
  standalone: true,
  providers: [provideSlotSurface('_headerSurface')],
})
export class NxProductTileHeaderContentDirective {}

/** Marks the small, uppercased line above the product tile's title. */
@Directive({
  selector: '[nxProductTileEyebrow]',
  standalone: true,
  providers: [provideSlotSurface('_headerSurface')],
})
export class NxProductTileEyebrowDirective {}

/** Marks the product tile's title. */
@Directive({
  selector: '[nxProductTileTitle]',
  standalone: true,
  providers: [provideSlotSurface('_headerSurface')],
})
export class NxProductTileTitleDirective {}

/** Marks the supporting line below the product tile's title. */
@Directive({
  selector: '[nxProductTileSubline]',
  standalone: true,
  providers: [provideSlotSurface('_headerSurface')],
})
export class NxProductTileSublineDirective {}

/**
 * Marks the `nx-price` shown in the product tile's header. The imposed size is provided here rather
 * than on the tile, so it stops at the slot: a price the consumer puts anywhere else - the body, or
 * a header they lay out themselves - stays sized by its own `size` input.
 */
@Directive({
  selector: '[nxProductTilePrice]',
  standalone: true,
  providers: [
    provideSlotSurface('_headerSurface'),
    { provide: NX_PRICE_CONTEXT, useExisting: forwardRef(() => NxProductTilePriceDirective) },
  ],
})
export class NxProductTilePriceDirective implements NxPriceContext {
  readonly priceSize = inject(NxProductTileComponent, { optional: true })?._priceSize ?? EMPTY_SIZE;
}

/** Marks the product tile's secondary, low-emphasis action. */
@Directive({
  selector: '[nxProductTileSecondaryAction]',
  standalone: true,
})
export class NxProductTileSecondaryActionDirective {}
