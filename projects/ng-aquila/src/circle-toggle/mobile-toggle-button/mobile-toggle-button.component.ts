import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

/** @docs-private */
@Component({
  selector: 'nx-mobile-toggle-button',
  templateUrl: 'mobile-toggle-button.component.html',
  styleUrls: ['mobile-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-disabled]': 'disabled',
    '[class.is-negative]': 'negative',
    '[class.is-first]': 'isFirst',
    '[class.is-last]': 'isLast',
    '[class.is-flipped]': 'checked'
  }
})
export class NxMobileToggleButtonComponent {

  @Input()
  checked: boolean = false;

  @Input()
  negative: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  hint: string;

  @Input()
  label: string;

  @Input()
  circleText: string;

  /** @docs-private */
  isFirst: boolean;

  /** @docs-private */
  isLast: boolean;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  /** @docs-private */
  setFirstButton() {
    this.isFirst = true;
    this._changeDetectorRef.markForCheck();
  }

  /** @docs-private */
  setLastButton() {
    this.isLast = true;
    this._changeDetectorRef.markForCheck();
  }

  /** @docs-private */
  resetClasses() {
    this.isFirst = false;
    this.isLast = false;
    this._changeDetectorRef.markForCheck();
  }
}
