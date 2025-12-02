import { NxIconModule } from '@allianz/ng-aquila/icon';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** @docs-private */
@Component({
  selector: 'nx-icon-toggle-button',
  templateUrl: 'icon-toggle-button.component.html',
  styleUrls: ['icon-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-circle-button]': 'true',
    '[class.is-flipped]': 'checked()',
    '[class.has-checkmark]': '!inGroup()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-negative]': 'negative()',
    '[class.is-touched]': 'touched()',
    '[class.is-readonly]': 'readonly()',
  },
  imports: [NxIconModule],
})
export class NxIconToggleButtonComponent {
  readonly inGroup = input(true);
  readonly hint = input('');
  readonly label = input('');
  readonly checked = input(false);
  readonly icon = input('');
  readonly disabled = input(false);
  readonly negative = input(false);
  readonly touched = input(false);
  readonly circleText = input('');
  readonly readonly = input(false, { transform: booleanAttribute });

  readonly svgUrl = input('', { alias: 'svg' });
}
