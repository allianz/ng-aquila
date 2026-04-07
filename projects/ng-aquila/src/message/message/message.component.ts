import { NxButtonModule } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  input,
  OnDestroy,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

/** @deprecated Use a specific context ('info', 'error', 'success', 'warning') instead. */
type RegularContext = 'regular';

/** The contextual type of a message. */
export type CONTEXT = RegularContext | 'info' | 'error' | 'success' | 'warning';

const ICONS: { [k: string]: string } = {
  info: 'info-circle',
  error: 'exclamation-triangle',
  success: 'check-circle',
  warning: 'exclamation-circle-warning',
};

const A1ICONS: { [k: string]: string } = {
  info: 'info-circle',
  error: 'exclamation-circle',
  success: 'check-circle',
  warning: 'exclamation-triangle',
};

@Component({
  selector: 'nx-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessage',
  imports: [NxIconModule, NxButtonModule],
  host: {
    '[attr.id]': 'id()',
    '[class.context-info]': '_effectiveContext() === "info"',
    '[class.context-success]': '_effectiveContext() === "success"',
    '[class.context-warning]': '_effectiveContext() === "warning"',
    '[class.context-error]': '_effectiveContext() === "error"',
    '[class.nx-message--closable]': '_closable',
  },
})
export class NxMessageComponent implements AfterViewInit, OnDestroy {
  private readonly _idGenerator = inject(IdGenerationService);
  protected readonly _allianzOneOptions = inject(ALLIANZ_ONE, { optional: true });
  protected readonly _isAllianzOne = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  readonly id = input<string>(this._idGenerator.nextId('nx-message'));

  protected readonly _effectiveContext = computed<CONTEXT>(() => {
    if (this._context() === 'regular' && this._isAllianzOne()) {
      return 'info';
    }
    return this._context();
  });

  protected _hideIcon = computed(() => false);

  _allowedContexts: CONTEXT[] = ['regular', 'info', 'error', 'warning', 'success'];

  @ViewChild('closeButton') _closeButton!: ElementRef;

  /**
   * Sets the context of the message.
   * The message box will color accordingly. Default: 'regular'.
   */
  @Input() set context(value: CONTEXT) {
    this._updateContext(value);
  }
  get context(): CONTEXT {
    return this._context();
  }
  _context = signal<CONTEXT>('regular');

  /** Whether a message should have a close icon in order to be dismissed. */
  @Input() set closable(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._closable) {
      this._closable = newValue;
      this._cdr.markForCheck();
    }
  }
  get closable(): boolean {
    return this._closable;
  }
  _closable = false;

  /** Sets the label of the close button of the message. */
  @Input() set closeButtonLabel(value: string) {
    if (value !== this._closeButtonLabel) {
      this._closeButtonLabel = value;
      this._cdr.markForCheck();
    }
  }
  get closeButtonLabel(): string {
    return this._closeButtonLabel;
  }
  private _closeButtonLabel = 'Close dialog';

  readonly _iconName = computed<string>(() => {
    const context = this._allowedContexts.includes(this._effectiveContext())
      ? this._effectiveContext()
      : this._allowedContexts[0];

    return this._isAllianzOne() ? A1ICONS[context] : ICONS[context];
  });

  /** Event emitted when the close icon of the message has been clicked. */
  @Output('close') readonly closeEvent = new EventEmitter<void>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}

  ngAfterViewInit(): void {
    if (this.closable) {
      this._focusMonitor.monitor(this._closeButton);
    }
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._closeButton);
  }

  _emitCloseEvent() {
    this.closeEvent.emit();
  }

  _updateContext(value: CONTEXT) {
    if (value === 'regular') {
      console.warn(
        `NxMessageComponent: context 'regular' is deprecated and will be removed in a future version. Use a specific context ('info', 'error', 'success', 'warning') instead.`,
      );
    }
    if (value !== this._context()) {
      this._context.set(value);
    }
  }
}
