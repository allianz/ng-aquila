import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
    '[class.no-animation]': '!animations()',
    '[class.on-selection]': 'colorScheme() === "on-selection"',
  },
})
export class NxRadioIndicatorComponent {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly critical = input(false);
  readonly colorScheme = input<NxSelectionIndicatorColorScheme>('default');
  readonly animations = input(true);
}
