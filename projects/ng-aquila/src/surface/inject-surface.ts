import { computed, inject, Signal } from '@angular/core';

import { NX_SURFACE, NxResolvedSurface } from './surface-types';

/** Stable identity, so the common case does not hand out a new object per read. */
const DEFAULT_SURFACE: NxResolvedSurface = { surface: 'default' };

/**
 * The surface this component sits on, or `'default'` when no container published
 * one.
 *
 * Must be called in an injection context.
 */
export function injectSurface(): Signal<NxResolvedSurface> {
  const context = inject(NX_SURFACE, { optional: true });

  return computed(() => context?.resolved() ?? DEFAULT_SURFACE);
}
