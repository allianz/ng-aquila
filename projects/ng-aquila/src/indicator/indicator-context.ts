import { InjectionToken, Signal } from '@angular/core';

import type { NxIndicatorSize } from './indicator.component';

/**
 * Implemented by components that host a projected indicator and want to control its
 * size. Provide the implementation under `NX_INDICATOR_CONTEXT`.
 */
export interface NxIndicatorContext {
  readonly indicatorSize: Signal<NxIndicatorSize>;
}

export const NX_INDICATOR_CONTEXT = new InjectionToken<NxIndicatorContext>('NX_INDICATOR_CONTEXT');
