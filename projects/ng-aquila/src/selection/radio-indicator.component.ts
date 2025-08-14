import { Component, input } from '@angular/core';

import { NxIndicatorAppearance } from './types';

@Component({
  selector: 'nx-radio-indicator',
  template: ` <span class="nx-radio__control"></span>`,
  styleUrls: ['./radio-indicator.component.scss'],
  standalone: true,
  host: {
    '[class.checked]': 'checked()',
    '[class.disabled]': 'disabled()',
    '[class.readonly]': 'readonly()',
    '[class.critical]': 'critical()',
    '[class.no-animation]': '!animations()',
    '[class.on-selection]': 'appearance() === "on-selection"',
  },
})
export class NxRadioIndicatorComponent {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly critical = input(false);
  readonly appearance = input<NxIndicatorAppearance>('full');
  readonly animations = input(true);
}
