import { Input, Component, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';

const visibilityIcons = {
  show: 'password-show-o',
  hide: 'password-hide-o'
};

@Component({
  selector: 'nx-password-toggle',
  template:
    `<nx-icon
      aria-hidden="true"
      [name]="_currentIcon">
    </nx-icon>`,
  styleUrls: ['./password-toggle.component.scss'],
  host: {
    '[attr.aria-label]': 'ariaLabel',
    '[attr.tabindex]': 'tabindex',
    '[attr.aria-pressed]': '_pressed',
    'role': 'button',
    '(click)': 'toggleInputType()',
    '(keydown)': '_onKeydown($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxPasswordToggleComponent implements AfterViewInit, OnDestroy {

  /** Input element using the toggle functionality. */
  @Input() control!: HTMLInputElement;

  /**@docs-private */
  _currentIcon: string = visibilityIcons['show'];
  /**@docs-private */
  _pressed: boolean = false;
  private _ariaLabel: string = 'Show password';

  /** Sets the aria-label needed for accessibility.
   * Notice that this `aria-label` should describe the initial action according to the status of the visibility.
   * E.g if you have an `input[type=password]` at the beginning then the
   * password will be hidden and the correct aria-label would be 'Show password.'
   */
  @Input()
  set ariaLabel(value: string) {
    if (value !== this._ariaLabel) {
      this._ariaLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  get ariaLabel(): string {
    return this._ariaLabel;
  }

  constructor (
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor
  ) {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngAfterViewInit() {
    if (!this.control) {
      console.warn('You need to pass an input as a control to the password toggle.');
    } else {
      // show the right icon according to the initial type of the input
      this._currentIcon = this.control.type === 'password' ? visibilityIcons['show'] : visibilityIcons['hide'];
    }
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Toggles the type of the input. */
  toggleInputType(): void {
    if (this.control) {
      this.control.type = this.control.type === 'password' ? 'text' : 'password';
      this._pressed = !this._pressed;
      this.toggleIcon();
      this._changeDetectorRef.markForCheck();
    }
  }

  /**@docs-private */
  toggleIcon(): void {
    this._currentIcon = this._currentIcon === visibilityIcons['show'] ? visibilityIcons['hide'] : visibilityIcons['show'];
  }

  /**@docs-private */
  _onKeydown($event: KeyboardEvent) {
    if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
      this.toggleInputType();
    }
  }

  /**@docs-private */
  get tabindex(): number | null {
    if (this.control) {
      return this.control.disabled ? -1 : 0;
    }
    return null;
  }
 }
