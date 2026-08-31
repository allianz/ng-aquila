import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

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

  readonly inverse = input(false, { transform: booleanAttribute });

  /** The color scheme of the eyebrow. Only relevant for the A1 Design. */
  readonly colorScheme = input<NxEyebrowColorScheme>(DEFAULT_COLOR_SCHEME);
}
