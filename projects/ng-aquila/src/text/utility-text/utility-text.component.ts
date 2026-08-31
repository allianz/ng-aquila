import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The available utility text sizes. */
export type NxUtilityTextSize = 's' | 'm' | 'l';

/** The available utility text types. */
export type NxUtilityTextType = 'primary' | 'secondary';

/** Color scheme of utility text. Only relevant for the A1 Design. */
export type NxUtilityTextColorScheme = 'default' | 'on-accent-attention';

const DEFAULT_COLOR_SCHEME: NxUtilityTextColorScheme = 'default';

/**
 * Applies the A1 utility text typography to functional text like labels, captions or metadata.
 *
 * A1 only: not mapped / styled for the NDBX brand.
 */
@Component({
  selector: '[nxUtilityText]',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./utility-text.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-utility-text--s]': 'size() === "s"',
    '[class.nx-utility-text--m]': 'size() === "m"',
    '[class.nx-utility-text--l]': 'size() === "l"',
    '[class.nx-utility-text--secondary]': 'type() === "secondary"',
    '[class.nx-utility-text--attention]': 'attention()',
    '[class.nx-utility-text--inverse]': 'inverse()',
    '[class.nx-utility-text--on-accent-attention]': 'colorScheme() === "on-accent-attention"',
  },
})
export class NxUtilityTextComponent {
  /** Sets the font size of the utility text. */
  readonly size = input<NxUtilityTextSize>('m');

  /** Sets the text color to the primary or secondary tone. */
  readonly type = input<NxUtilityTextType>('primary');

  /** Whether the text should be emphasized with a heavier font weight. */
  readonly attention = input(false, { transform: booleanAttribute });

  /** Whether the inverse colors for use on dark backgrounds should be applied. */
  readonly inverse = input(false, { transform: booleanAttribute });

  /** The color scheme of the utility text. Only relevant for the A1 Design. */
  readonly colorScheme = input<NxUtilityTextColorScheme>(DEFAULT_COLOR_SCHEME);
}
