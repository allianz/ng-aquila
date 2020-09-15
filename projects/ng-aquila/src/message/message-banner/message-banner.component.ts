import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

export type BANNER_CONTEXT = 'info' | 'error' | 'warning';

const ICONS = {
  info: 'info-circle',
  error: 'exclamation-triangle',
  warning: 'exclamation-circle'
};

@Component({
  selector: 'nx-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessageBanner',
  host: {
    '[class.context-info]': 'context === "info"',
    '[class.context-error]': 'context === "error"',
    '[class.context-warning]': 'context === "warning"',
    '[class.nx-message-banner--closable]': 'closable'
  }
})
export class NxMessageBannerComponent {

  private _context: BANNER_CONTEXT = 'info';

  /**
   * Sets the context of the message banner.
   * Its box will color accordingly. Default: 'info' */
  @Input()
  set context(value: BANNER_CONTEXT) {
    if (value !== this._context) {
      this._context = value;
      this._icon = this.getIconName();
      this._changeDetectorRef.markForCheck();
    }
  }
  get context(): BANNER_CONTEXT {
    return this._context;
  }

  private _closable: boolean = true;

  /** Whether a message should have a close icon in order to be dismissed. */
  @Input()
  set closable(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._closable) {
      this._closable = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  get closable(): boolean {
    return this._closable;
  }

  private _icon: string = ICONS.info;

  /** @docs-private */
  get icon(): string {
    return this._icon;
  }

  private _closeButtonLabel: string = 'Close dialog';

  /** Sets the label of the close button of the message. */
  @Input()
  set closeButtonLabel(value: string) {
    if (value !== this._closeButtonLabel) {
      this._closeButtonLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  get closeButtonLabel(): string {
    return this._closeButtonLabel;
  }

  /** Event emitted when the close icon of the message has been clicked. */
  @Output('close') closeEvent = new EventEmitter<void>();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  /** @docs-private */
  _emitCloseEvent() {
    this.closeEvent.emit();
  }

  /** @docs-private */
  getIconName(): string {
    if (this._context === 'error') {
      return ICONS.error;
    } else if (this._context === 'warning') {
      return ICONS.warning;
    }
    return ICONS.info;
  }

  static ngAcceptInputType_closable: BooleanInput;
}
