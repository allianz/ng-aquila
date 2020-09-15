
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/** @docs-private */
@Component({
  selector: 'nx-icon-toggle-button',
  templateUrl: 'icon-toggle-button.component.html',
  styleUrls: ['icon-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-circle-button]': 'true',
    '[class.is-flipped]': 'checked',
    '[class.has-checkmark]': '!inGroup',
    '[class.is-disabled]': 'disabled',
    '[class.is-negative]': 'negative',
    '[class.is-touched]': 'touched'
  }
})
export class NxIconToggleButtonComponent {

  @Input()
  inGroup: boolean = true;

  @Input()
  hint: string;

  @Input()
  label: string;

  @Input()
  checked: boolean;

  @Input()
  icon: string;

  @Input('svg')
  svgUrl: string;

  @Input()
  disabled: boolean;

  @Input()
  negative: boolean;

  @Input()
  touched: boolean;

  @Input()
  circleText: string;
}
