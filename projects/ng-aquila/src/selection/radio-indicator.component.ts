import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NxRadioIndicatorColorScheme } from './types';

/** Color schemes that have no readonly appearance in the design. */
const SCHEMES_WITHOUT_READONLY: readonly NxRadioIndicatorColorScheme[] = [
  'on-accent-attention',
  'on-brand-static',
];

@Component({
  selector: 'nx-radio-indicator',
  template: ` <span class="nx-radio__control"></span>`,
  styleUrls: ['./radio-indicator.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.checked]': 'checked()',
    '[class.disabled]': 'disabled()',
    '[class.readonly]': 'readonly()',
    '[class.critical]': 'critical()',
    '[class.inverse]': 'inverse()',
    '[class.no-animation]': '!animations()',
    '[class.on-selection]': '_resolvedColorScheme() === "on-selection"',
    '[class.on-accent-attention]': '_resolvedColorScheme() === "on-accent-attention"',
    '[class.on-brand-static]': '_resolvedColorScheme() === "on-brand-static"',
  },
})
export class NxRadioIndicatorComponent {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly critical = input(false, { transform: booleanAttribute });
  /** Whether the inverse set of styles, for use on a dark background, is applied. */
  readonly inverse = input(false, { transform: booleanAttribute });
  readonly colorScheme = input<NxRadioIndicatorColorScheme>('default');
  readonly animations = input(true, { transform: booleanAttribute });

  /**
   * The scheme actually rendered. A readonly indicator falls back to the default scheme where
   * the requested one has no readonly appearance, which is what the design resolves to.
   */
  protected readonly _resolvedColorScheme = computed<NxRadioIndicatorColorScheme>(() => {
    const scheme = this.colorScheme();
    return this.readonly() && SCHEMES_WITHOUT_READONLY.includes(scheme) ? 'default' : scheme;
  });
}
