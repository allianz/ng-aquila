import { booleanAttribute, Component, input } from '@angular/core';

export const NX_ATTENTION_COLOR_VALUES = [
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
export type NxAttentionColorOption = (typeof NX_ATTENTION_COLOR_VALUES)[number];

/**
 * Applies an attention color to inline text fragments.
 *
 * A1 only: not mapped / styled for NDBX brand. In NDBX it's mapped to opensource color.
 */
@Component({
  selector: '[nx-attention-color]',
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./attention-color.scss'],
  host: {
    '[class.nx-attention-color--negative]': 'negative()',
    '[attr.nx-attention-color]': 'color()',
  },
})
export class NxAttentionColorComponent {
  private static readonly _ALLOWED: ReadonlySet<string> = new Set(NX_ATTENTION_COLOR_VALUES);

  /** Required attention color. No implicit default: consumer must provide a valid color. */
  readonly color = input.required<NxAttentionColorOption>({ alias: 'nx-attention-color' });

  /** Whether to use the negative to invert color */
  readonly negative = input(false, { transform: booleanAttribute });
}
