import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type NxEyebrowSize = 's' | 'm';

/** Color scheme of an eyebrow. Only relevant for the A1 Design. */
export type NxEyebrowColorScheme = 'default' | 'on-accent-attention';

const DEFAULT_COLOR_SCHEME: NxEyebrowColorScheme = 'default';

@Component({
  selector: 'nx-eyebrow, [nxEyebrow]',
  templateUrl: './eyebrow.component.html',
  styleUrls: ['eyebrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-eyebrow-size-s]': 'size() === "s"',
    '[class.nx-eyebrow-size-m]': 'size() === "m"',
    '[class.nx-eyebrow-inverse]': 'inverse()',
    '[class.nx-eyebrow-on-accent-attention]': 'colorScheme() === "on-accent-attention"',
  },
})
export class NxEyebrowComponent {
  readonly size = input<NxEyebrowSize>('m');

  /**
   * Whether to use the inverse color. When not set, it follows the surface the
   * eyebrow is placed on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  private readonly _surface = injectSurface();

  /**
   * Resolved inverse: an explicit input wins, then the surface the component sits
   * on. The accent hue is ignored - the eyebrow has no on-accent-attention
   * tokens yet, so it just goes inverse regardless of hue.
   */
  readonly inverse = computed(() => {
    const { surface } = this._surface();
    return this.inverseInput() ?? (surface === 'attention' || surface === 'accent-attention');
  });

  /** The color scheme of the eyebrow. Only relevant for the A1 Design. */
  readonly colorScheme = input<NxEyebrowColorScheme>(DEFAULT_COLOR_SCHEME);
}
