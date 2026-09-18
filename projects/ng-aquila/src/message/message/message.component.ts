import { NxButtonModule } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { IdGenerationService, nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
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

/** @deprecated Use a specific context ('info', 'critical', 'positive', 'warning') instead. */
type RegularContext = 'regular';

/**
 * The contextual type of a message.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
// Listed as literals rather than composed from another alias: the API docs print the type
// expression verbatim, so an alias name there tells the reader nothing.
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

const ICONS: { [k: string]: string } = {
  info: 'info-circle',
  critical: 'exclamation-triangle',
  positive: 'check-circle',
  warning: 'exclamation-circle-warning',
};

const A1ICONS: { [k: string]: string } = {
  info: 'info-circle',
  critical: 'exclamation-circle',
  positive: 'check-circle',
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
    '[class.context-success]': '_effectiveContext() === "positive"',
    '[class.context-warning]': '_effectiveContext() === "warning"',
    '[class.context-error]': '_effectiveContext() === "critical"',
    '[class.nx-message--closable]': '_closable()',
    '[class.nx-message--plain]': '!contained()',
  },
})
export class NxMessageComponent implements AfterViewInit, OnDestroy {
  private readonly _idGenerator = inject(IdGenerationService);
  protected readonly _allianzOneOptions = inject(ALLIANZ_ONE, { optional: true });
  protected readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  readonly id = input<string>(this._idGenerator.nextId('nx-message'));

  /** Whether the message is rendered inside a filled, bordered surface (`true`, default) or as plain icon and text (`false`). */
  readonly contained = input(true, { transform: booleanAttribute });

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
   * Default: `true` for `nx-message`. Subclasses may resolve an unset value
   * differently — see the concrete component for its default.
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
  _context = signal<CONTEXT>('regular');

  /** Whether a message should have a close icon in order to be dismissed. */
  @Input({ transform: booleanAttribute }) set closable(value: boolean) {
    this._closable.set(value);
  }
  get closable(): boolean {
    return this._closable();
  }
  _closable = signal(false);

  /** Sets the label of the close button of the message. */
  @Input() set closeButtonLabel(value: string) {
    this._closeButtonLabel.set(value);
  }
  get closeButtonLabel(): string {
    return this._closeButtonLabel();
  }
  private readonly _closeButtonLabel = signal('Close dialog');

  protected _contextIcons(): { readonly [k: string]: string } {
    return this._isA1() ? A1ICONS : ICONS;
  }

  readonly _iconName = computed<string>(() => this._contextIcons()[this._effectiveContext()] ?? '');

  /** Event emitted when the close icon of the message has been clicked. */
  @Output('close') readonly closeEvent = new EventEmitter<void>();

  constructor(private readonly _focusMonitor: FocusMonitor) {}

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
    if (value !== this._context()) {
      this._context.set(value);
    }
  }
}
