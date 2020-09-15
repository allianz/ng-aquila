import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

/** The contextual type of a message. */
export type CONTEXT = 'regular' | 'info' | 'error' | 'success' | 'warning';

const ICONS = {
  info: 'info-circle',
  error: 'exclamation-triangle',
  success: 'check-circle',
  warning: 'exclamation-circle'
};

@Component({
  selector: 'nx-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessage',
  host: {
    '[class.context-info]': 'context === "info"',
    '[class.context-error]': 'context === "error"',
    '[class.context-success]': 'context === "success"',
    '[class.context-warning]': 'context === "warning"',
    '[class.nx-message--closable]': 'closable'
  }
})
export class NxMessageComponent {

  private _context: CONTEXT = 'regular';

  /**
   * Sets the context of the message.
   * The message box will color accordingly. Default: 'regular' */
  @Input('nxContext')
  set context(value: CONTEXT) {
    if (value !== this._context) {
      this._context = value;
      this._icon = this.getIconName();
      this._changeDetectorRef.markForCheck();
    }
  }
  get context(): CONTEXT {
    return this._context;
  }

  private _closable: boolean = false;

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

  private _icon: string;

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
    if (this._context === 'info') {
      return ICONS.info;
    } else if (this._context === 'error') {
      return ICONS.error;
    } else if (this._context === 'success') {
      return ICONS.success;
    } else if (this._context === 'warning') {
      return ICONS.warning;
    }
    return '';
  }

  static ngAcceptInputType_showIcon: BooleanInput;
  static ngAcceptInputType_closable: BooleanInput;
}
