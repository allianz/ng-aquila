import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NxSelectionIndicatorColorScheme } from './types';

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
    '[class.on-selection]': 'colorScheme() === "on-selection"',
  },
})
export class NxRadioIndicatorComponent {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly critical = input(false, { transform: booleanAttribute });
  /** Whether the inverse set of styles, for use on a dark background, is applied. */
  readonly inverse = input(false, { transform: booleanAttribute });
  readonly colorScheme = input<NxSelectionIndicatorColorScheme>('default');
  readonly animations = input(true, { transform: booleanAttribute });
}
