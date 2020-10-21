import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'nx-notification-panel-item, [nxNotificationPanelItem]',
  templateUrl: 'notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  host: {
    '[class.nx-notification-item--read]': 'read',
    '[class.nx-notification-item--clickable]': 'clickable',
    'tabindex': '0',
    '(focus)': 'focus()',
    '(blur)': '_blur()'
  }
})

export class NxNotificationPanelItemComponent implements FocusableOption {

  private _read: boolean = false;
  private _clickable: boolean = true;
  private _hasFocus = false;

  focused = new Subject<NxNotificationPanelItemComponent>();

  @Input()
  set read(value: boolean) {
    this._read = coerceBooleanProperty(value);
  }
  get read() {
    return this._read;
  }

  @Input()
  set clickable(value: boolean) {
    this._clickable = coerceBooleanProperty(value);
  }
  get clickable() {
    return this._clickable;
  }

  constructor(private _elementRef: ElementRef) { }

  focus(focusOrigin?: FocusOrigin) {
    // the focus key manager calls this method with the focusOrigin
    // property. if it is not set we know the focus comes from another source
    // like the user using TAB to go through the list. Then we want to notify
    // the focus manager about this change of focus.
    if (typeof focusOrigin === 'undefined' && !this._hasFocus) {
      this.focused.next(this);
      this._hasFocus = true;
    }

    if (!this._hasFocus) {
      this._elementRef.nativeElement.focus();
      this._hasFocus = true;
    }
  }

  _blur() {
    this._hasFocus = false;
  }

  static ngAcceptInputType_read: BooleanInput;
  static ngAcceptInputType_clickable: BooleanInput;
}
