import { InjectionToken, Signal } from '@angular/core';

import { NxPriceSize } from './price.component';

/**
 * Lets a wrapping component impose the size of the `nx-price` elements rendered beneath it (any
 * `nx-price` that resolves this token from its injector hierarchy), so that prices are consistent
 * across all usages of that wrapper. Takes precedence over the consumer's `size` input — a
 * wrapper that opts in owns the size.
 */
export interface NxPriceContext {
  /** The size to impose, or `undefined` to leave the consumer's `size` input in charge. */
  readonly priceSize: Signal<NxPriceSize | undefined>;
}

export const NX_PRICE_CONTEXT = new InjectionToken<NxPriceContext>('NX_PRICE_CONTEXT');
