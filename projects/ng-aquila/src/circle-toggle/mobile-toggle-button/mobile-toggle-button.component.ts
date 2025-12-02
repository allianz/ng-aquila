import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
} from '@angular/core';

/** @docs-private */
@Component({
  selector: 'nx-mobile-toggle-button',
  templateUrl: 'mobile-toggle-button.component.html',
  styleUrls: ['mobile-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-disabled]': 'disabled()',
    '[class.is-readonly]': 'readonly()',
    '[class.is-negative]': 'negative()',
    '[class.is-first]': 'isFirst',
    '[class.is-last]': 'isLast',
    '[class.is-flipped]': 'checked()',
  },
  imports: [NxIconModule],
})
export class NxMobileToggleButtonComponent {
  readonly checked = input(false);
  readonly negative = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly hint = input('');
  readonly label = input('');
  readonly circleText = input('');

  /** @docs-private */
  isFirst = false;

  /** @docs-private */
  isLast = false;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  /** @docs-private */
  setFirstButton() {
    this.isFirst = true;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  setLastButton() {
    this.isLast = true;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  resetClasses() {
    this.isFirst = false;
    this.isLast = false;
    this._cdr.markForCheck();
  }
}
