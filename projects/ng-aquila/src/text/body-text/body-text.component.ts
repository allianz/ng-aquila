import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The available body text sizes. */
export type NxBodyTextSize = 's' | 'm' | 'l';

/** The available body text types. */
export type NxBodyTextType = 'primary' | 'secondary';

/** Color scheme of body text. Only relevant for the A1 Design. */
export type NxBodyTextColorScheme = 'default' | 'on-accent-attention';

const DEFAULT_COLOR_SCHEME: NxBodyTextColorScheme = 'default';

/**
 * Applies the A1 body text typography to running text.
 */
@Component({
  selector: '[nxBodyText]',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./body-text.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-body-text--s]': 'size() === "s"',
    '[class.nx-body-text--m]': 'size() === "m"',
    '[class.nx-body-text--l]': 'size() === "l"',
    '[class.nx-body-text--secondary]': 'type() === "secondary"',
    '[class.nx-body-text--inverse]': 'inverse()',
    '[class.nx-body-text--on-accent-attention]': 'colorScheme() === "on-accent-attention"',
  },
})
export class NxBodyTextComponent {
  /** Sets the font size of the body text. */
  readonly size = input<NxBodyTextSize>('m');

  /** Sets the text color to the primary or secondary tone. */
  readonly type = input<NxBodyTextType>('primary');

  /** Whether the inverse colors for use on dark backgrounds should be applied. */
  readonly inverse = input(false, { transform: booleanAttribute });

  /** The color scheme of the body text. Only relevant for the A1 Design. */
  readonly colorScheme = input<NxBodyTextColorScheme>(DEFAULT_COLOR_SCHEME);
}
