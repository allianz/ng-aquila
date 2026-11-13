import { NxStatusIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverModule,
  PopoverDirection,
  PopoverTriggerScrollStrategy,
} from '@allianz/ng-aquila/popover';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
} from '@angular/core';

/**
 * The contextual type of a signal button.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
export type NxSignalButtonContext =
  'critical' | 'positive' | 'warning' | 'info' | 'error' | 'success';

type ResolvedSignalButtonContext = 'critical' | 'positive' | 'warning' | 'info';

const CONTEXT_ALIASES: { readonly [k: string]: ResolvedSignalButtonContext } = {
  error: 'critical',
  success: 'positive',
};

/** Type for the size of a signal button. */
export type NxSignalButtonSize = 's' | 'm';

@Component({
  selector: 'nx-signal-button',
  templateUrl: './signal-button.component.html',
  styleUrls: ['./signal-button.component.scss'],
  host: {
    '[class.context-success]': '_resolvedContext === "positive"',
    '[class.context-warning]': '_resolvedContext === "warning"',
    '[class.context-error]': '_resolvedContext === "critical"',
    '[class.context-info]': '_resolvedContext === "info"',
    '[class.size-s]': 'this.size() === "s"',
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxPopoverModule, NxStatusIconComponent],
})
export class NxSignalButtonComponent {
  private _popoverDirection: PopoverDirection = 'bottom';
  private _scrollStrategy: PopoverTriggerScrollStrategy = 'close';

  private _ariaLabel = 'signal button';
  private _ariaLabelledby = '';
  /** The event emitter for open. */
  @Output() opened = new EventEmitter<boolean>();

  /** The event emitter for close. */
  @Output() closed = new EventEmitter<boolean>();

  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  get active(): boolean {
    return this._active;
  }
  private _active = false;

  /**
   * Sets the context of the signal button.
   */
  @Input() set context(value: NxSignalButtonContext) {
    this._updateContext(value);
  }
  get context(): NxSignalButtonContext {
    return this._context;
  }
  _context: NxSignalButtonContext = 'positive';

  protected get _resolvedContext(): ResolvedSignalButtonContext {
    return CONTEXT_ALIASES[this._context] ?? (this._context as ResolvedSignalButtonContext);
  }

  /**
   * Sets the size of the signal button.
   *
   * Only supported under A1.
   */
  readonly size = input<NxSignalButtonSize>('m');

  /** Which aria-label will be reading from screen reader.  */
  @Input('aria-label')
  set ariaLabel(ariaLabel: string) {
    this._ariaLabel = ariaLabel;
  }

  get ariaLabel(): string {
    return this._ariaLabel;
  }

  /** Which aria-labelledby will be reading from screen reader.  */
  @Input('aria-labelledby')
  set ariaLabelledby(ariaLabelledby: string) {
    this._ariaLabelledby = ariaLabelledby;
  }

  get ariaLabelledby(): string {
    return this._ariaLabelledby;
  }

  /**
   * The direction of the popover. The options are `left` | `top` | `right` | `bottom`.
   */
  @Input()
  set popoverDirection(value: PopoverDirection) {
    this._popoverDirection = value;
  }
  get popoverDirection() {
    return this._popoverDirection;
  }

  /**
   * Sets the scroll strategy. 'close' closes the popover on scroll while 'reposition' scrolls the popover with the origin.
   */
  @Input()
  set scrollStrategy(value: PopoverTriggerScrollStrategy) {
    this._scrollStrategy = value;
  }
  get scrollStrategy() {
    return this._scrollStrategy;
  }

  _onActiveChange(active: boolean) {
    this._active = active;

    if (this._active) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  _updateContext(value: NxSignalButtonContext) {
    if (value !== this._context) {
      this._context = value;
    }
  }
}
