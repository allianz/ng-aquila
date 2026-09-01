import { InjectionToken, Signal } from '@angular/core';

/**
 * The surface a component is sitting on.
 *
 * - `default` - the neutral page or card surface.
 * - `attention` - the inverse, brand-colored surface.
 * - `emphasis` - the emphasis tint.
 * - `accent-attention` - one of the accent hues, see `NxSurfaceAccentColor`.
 *
 * A surface says what the background is, not what a component should do about
 * it - each component decides that for itself.
 */
export type NxSurfaceType = 'default' | 'attention' | 'emphasis' | 'accent-attention';

/**
 * The value accepted by `[nxSurface]` - an {@link NxSurfaceType}, or `inherit` to keep
 * the enclosing surface instead of declaring a new one.
 */
export type NxSurfaceInputValue = NxSurfaceType | 'inherit';

/** Accent hue. Only meaningful when the surface is `accent-attention`. */
export type NxSurfaceAccentColor =
  'yellow' | 'orange' | 'red' | 'purple' | 'aqua' | 'blue' | 'teal' | 'green' | 'gray';

/** The hue an `accent-attention` surface falls back to when it names none. */
export const NX_DEFAULT_SURFACE_ACCENT_COLOR: NxSurfaceAccentColor = 'blue';

/** A surface together with its accent hue, which only the accent arm carries. */
export type NxResolvedSurface =
  | { readonly surface: 'default' | 'attention' | 'emphasis' }
  | { readonly surface: 'accent-attention'; readonly accentColor: NxSurfaceAccentColor };

/** The value carried by {@link NX_SURFACE}. */
export interface NxSurfaceContext {
  readonly resolved: Signal<NxResolvedSurface>;
}

/**
 * Context token published by containers that paint a non-default background.
 *
 * A container that paints its own background - an overlay panel, a card - must
 * stop the context at its boundary with
 * `providers: [{ provide: NX_SURFACE, useValue: undefined }]`, otherwise its
 * content would adapt to a surface it is no longer sitting on.
 */
export const NX_SURFACE = new InjectionToken<NxSurfaceContext | undefined>('NX_SURFACE');
