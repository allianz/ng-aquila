import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, Attribute, Directive, ElementRef, OnDestroy } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty, BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

export type NxMenuButtonType = 'root' | 'nested';

/**
 * @title MenuButton
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nxMenuButton]',
  templateUrl: 'menu-button.component.html',
  styleUrls: ['menu-button.component.scss'],
  host: {
    '[class.is-expanded]': 'expandable && expanded',
    '[class.is-expandable]': 'expandable',
    '[class.nx-menu-button--nested]': 'type === "nested"',
    '[class.nx-menu-button--root]': 'type === "root"',
    'class': 'nx-menu-button'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxMenuButtonComponent implements OnDestroy {
  /** Whether this menu button is expandable or not. Will add a caret icon. */
  @Input()
  set expandable(value: boolean) {
    this._expandable = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get expandable(): boolean {
    return this._expandable;
  }
  private _expandable: boolean = false;

  /**
   * Whether this menu button is expanded or not.
   * Only works in combination with the `expandable` option set to `true`.
   */
  @Input()
  set expanded(value: boolean) {
    this._expanded = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get expanded() {
    return this._expanded;
  }
  private _expanded: boolean = false;

  /**
   * The type of this menu button.
   * Can be `primary` or `secondary`, defaults to `primary`.
   */
  @Input('nxType')
  set type(value: NxMenuButtonType) {
    if (value === 'root' || value === 'nested') {
      this._type = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  get type(): NxMenuButtonType {
    return this._type;
  }
  private _type: NxMenuButtonType = 'root';

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef
  ) {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  static ngAcceptInputType_expandable: BooleanInput;
  static ngAcceptInputType_expanded: BooleanInput;
}

/**
 * Icon that can be added to a [nxButton].
 */
@Directive({
  selector: '[nxMenuButtonIcon]',
  host: {
    class: 'nx-menu-button__icon'
  }
})
export class NxMenuButtonIconDirective {}
