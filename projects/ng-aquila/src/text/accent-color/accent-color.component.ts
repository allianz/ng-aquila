import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

export const NX_ACCENT_COLOR_VALUES = [
  'yellow',
  'orange',
  'red',
  'purple',
  'teal',
  'aqua',
  'blue',
  'green',
  'gray',
] as const;
export type NxAccentColorOption = (typeof NX_ACCENT_COLOR_VALUES)[number];

/**
 * Applies an accent color to inline text fragments.
 *
 * A1 only: not mapped / styled for NDBX brand. In NDBX it's mapped to opensource color.
 */
@Component({
  selector: '[nx-accent-color]',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./accent-color.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[class.nx-accent-color--negative]': 'negative()',
    '[attr.nx-accent-color]': 'color()',
  },
})
export class NxAccentColorComponent {
  private static readonly _ALLOWED: ReadonlySet<string> = new Set(NX_ACCENT_COLOR_VALUES);

  /** Required accent color. No implicit default: consumer must provide a valid color. */
  readonly color = input.required<NxAccentColorOption>({ alias: 'nx-accent-color' });

  /** Whether to use the negative to invert color */
  readonly negative = input(false, { transform: booleanAttribute });
}
