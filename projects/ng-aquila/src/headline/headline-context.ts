import { InjectionToken, Signal } from '@angular/core';

import { NxHeadlineSize } from './headline.component';

/**
 * Lets a wrapping component impose the size of the `nxHeadline` elements rendered beneath it (any
 * `nxHeadline` that resolves this token from its injector hierarchy), taking precedence over the
 * consumer's `size` input. Mirrors `NxPriceContext`.
 */
export interface NxHeadlineContext {
  readonly headlineSize: Signal<NxHeadlineSize | undefined>;
}

export const NX_HEADLINE_CONTEXT = new InjectionToken<NxHeadlineContext>('NX_HEADLINE_CONTEXT');
