import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { IdGenerationService, nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  booleanAttribute,
  computed,
  Directive,
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

/** @deprecated Use a specific context ('info', 'critical', 'positive', 'warning') instead. */
type RegularContext = 'regular';

/**
 * The contextual type of a message.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
export type CONTEXT =
  'regular' | 'info' | 'critical' | 'positive' | 'warning' | 'error' | 'success';

/**
 * A `CONTEXT` with the deprecated aliases resolved. Only the styling and the icon lookup work with
 * this; consumers set and read `CONTEXT`.
 * @docs-private
 */
export type ResolvedContext = RegularContext | 'info' | 'critical' | 'positive' | 'warning';

/** Maps the deprecated context names onto the ones they were renamed to. */
const CONTEXT_ALIASES: { readonly [k: string]: ResolvedContext } = {
  error: 'critical',
  success: 'positive',
};

/**
 * State and behaviour shared by `nx-message` and `nx-message-banner`, including the host classes
 * the shared stylesheet keys off. Each of them brings its own template and additional styles.
 * @docs-private
 */
@Directive({
  host: {
    '[attr.id]': 'id()',
    '[class.context-info]': '_effectiveContext() === "info"',
    '[class.context-success]': '_effectiveContext() === "positive"',
    '[class.context-warning]': '_effectiveContext() === "warning"',
    '[class.context-error]': '_effectiveContext() === "critical"',
    '[class.nx-message--closable]': '_showCloseButton()',
  },
})
export abstract class NxMessageBase implements AfterViewInit, OnDestroy {
  private readonly _idGenerator = inject(IdGenerationService);
  private readonly _focusMonitor = inject(FocusMonitor);
  protected readonly _allianzOneOptions = inject(ALLIANZ_ONE, { optional: true });
  protected readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  readonly id = input<string>(this._idGenerator.nextId('nx-message'));

  // `_context` keeps whatever the consumer set, so reading `context` back returns their own value.
  // The deprecated names are resolved here instead, where the colors and the icon are picked.
  protected readonly _effectiveContext = computed<ResolvedContext>(() => {
    const raw = this._context();
    const context = CONTEXT_ALIASES[raw] ?? (raw as ResolvedContext);
    if (context === 'regular' && this._isA1()) {
      return 'info';
    }
    return context;
  });

  /**
   * Whether the context icon is shown.
   *
   * Default: `true` for `nx-message`. Subclasses may resolve an unset value differently — see the
   * concrete component for its default.
   */
  // Keeps `undefined` so a subclass can default by theme
  readonly showContextIcon = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
  });

  protected readonly _showContextIcon = computed(() => this.showContextIcon() ?? true);

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
  protected _context = signal<CONTEXT>('regular');

  /** Whether a message should have a close icon in order to be dismissed. */
  @Input({ transform: booleanAttribute }) set closable(value: boolean) {
    this._closable.set(value);
  }
  get closable(): boolean {
    return this._closable();
  }
  _closable = signal(false);

  protected readonly _showCloseButton = computed(() => this._closable());

  /** Sets the label of the close button of the message. */
  @Input() set closeButtonLabel(value: string) {
    this._closeButtonLabel.set(value);
  }
  get closeButtonLabel(): string {
    return this._closeButtonLabel();
  }
  private readonly _closeButtonLabel = signal('Close dialog');

  /** Event emitted when the close icon of the message has been clicked. */
  @Output('close') readonly closeEvent = new EventEmitter<void>();

  ngAfterViewInit(): void {
    if (this._showCloseButton()) {
      this._focusMonitor.monitor(this._closeButton);
    }
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._closeButton);
  }

  _emitCloseEvent() {
    this.closeEvent.emit();
  }

  protected _updateContext(value: CONTEXT) {
    if (value !== this._context()) {
      this._context.set(value);
    }
  }
}
