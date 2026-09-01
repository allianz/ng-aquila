import { booleanAttribute, computed, Directive, inject, input } from '@angular/core';

import {
  NX_DEFAULT_SURFACE_ACCENT_COLOR,
  NX_SURFACE,
  NxResolvedSurface,
  NxSurfaceAccentColor,
  NxSurfaceContext,
  NxSurfaceInputValue,
  NxSurfaceType,
} from './surface-types';

/**
 * Declares the surface for everything inside the host element, and paints its
 * background to match. Adopting ng-aquila components adapt automatically; other
 * components and plain CSS can key off the `data-nx-surface` attribute.
 */
@Directive({
  selector: '[nxSurface]',
  standalone: true,
  exportAs: 'nxSurface',
  providers: [{ provide: NX_SURFACE, useExisting: NxSurface }],
  host: {
    '[attr.data-nx-surface]': '_surface()',
    '[attr.data-nx-accent-color]': '_accentColor()',
    '[style.background-color]': '_backgroundColor()',
  },
})
export class NxSurface implements NxSurfaceContext {
  /** `skipSelf`, because this directive provides the token on its own element. */
  private readonly _parent = inject(NX_SURFACE, { optional: true, skipSelf: true });

  /**
   * The surface painted on this element. Use `inherit` to keep the enclosing
   * surface, and `default` to reset it. Default: `'default'`.
   */
  readonly surfaceInput = input<NxSurfaceInputValue>('default', { alias: 'nxSurface' });

  /** The accent hue. Only takes effect with an `accent-attention` surface. */
  readonly accentColorInput = input<NxSurfaceAccentColor | undefined>(undefined, {
    alias: 'nxSurfaceAccentColor',
  });

  /**
   * Whether to paint the surface's background on the host. Turn off when the host
   * already paints this same surface itself - descendants keep reacting either
   * way. To stop them reacting, reset the surface instead, see {@link NX_SURFACE}.
   * Default: `true`.
   */
  readonly background = input(true, {
    transform: booleanAttribute,
    alias: 'nxSurfaceBackground',
  });

  readonly resolved = computed<NxResolvedSurface>(() => {
    const declared = this.surfaceInput();
    const parent = this._parent?.resolved();
    const surface = declared === 'inherit' ? (parent?.surface ?? 'default') : declared;

    if (surface !== 'accent-attention') {
      return { surface };
    }

    // Only an enclosing accent surface has a hue to pass down.
    const inherited = parent?.surface === 'accent-attention' ? parent.accentColor : undefined;

    return {
      surface,
      accentColor: this.accentColorInput() ?? inherited ?? NX_DEFAULT_SURFACE_ACCENT_COLOR,
    };
  });

  protected readonly _surface = computed<NxSurfaceType | null>(() => {
    const { surface } = this.resolved();
    return surface === 'default' ? null : surface;
  });

  protected readonly _accentColor = computed<NxSurfaceAccentColor | null>(() => {
    const resolved = this.resolved();
    return resolved.surface === 'accent-attention' ? resolved.accentColor : null;
  });

  readonly _backgroundColor = computed<string | null>(() => {
    if (!this.background()) {
      return null;
    }
    const resolved = this.resolved();
    switch (resolved.surface) {
      case 'default':
        return 'var(--nx-surface-default-background-color)';
      case 'attention':
        return 'var(--nx-surface-attention-background-color)';
      case 'emphasis':
        return 'var(--nx-surface-emphasis-background-color)';
      case 'accent-attention':
        return `var(--color-attention-${resolved.accentColor})`;
    }
  });
}
