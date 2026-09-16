import { NxIconModule } from '@allianz/ng-aquila/icon';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NxCheckboxIndicatorColorScheme } from './types';

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
    '[class.on-selection]': 'colorScheme() === "on-selection"',
  },
  styleUrls: ['./checkbox-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NxCheckboxIndicatorComponent {
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly critical = input(false, { transform: booleanAttribute });
  readonly indeterminate = input(false, { transform: booleanAttribute });
  readonly colorScheme = input<NxCheckboxIndicatorColorScheme>('default');
}
