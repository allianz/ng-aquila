import { NxIconModule } from '@allianz/ng-aquila/icon';
import { Component, input } from '@angular/core';

import { NxIndicatorAppearance } from './types';

@Component({
  selector: 'nx-checkbox-indicator',
  imports: [NxIconModule],
  template: `<span class="nx-checkbox__control" [class.checked]="checked()">
    @if (checked()) {
      <nx-icon name="check" aria-hidden="true"></nx-icon>
    }
    @if (indeterminate()) {
      <div class="nx-checkbox__indeterminate-indicator"></div>
    }
  </span>`,
  host: {
    '[class.disabled]': 'disabled()',
    '[class.readonly]': 'readonly()',
    '[class.critical]': 'critical()',
    '[class.on-selection]': 'appearance() === "on-selection"',
  },
  styleUrls: ['./checkbox-indicator.component.scss'],
  standalone: true,
})
export class NxCheckboxIndicatorComponent {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly critical = input(false);
  readonly indeterminate = input(false);
  readonly appearance = input<NxIndicatorAppearance>('full');
}
