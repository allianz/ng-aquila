import { injectSurface } from '@allianz/ng-aquila/surface';
import { IdGenerationService, nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  Inject,
  inject,
  InjectionToken,
  Input,
  input,
  Optional,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';

export interface LabelDefaultOptions {
  /** Sets the default appearance. (optional) */
  size?: LABEL_SIZE_TYPE;
}

/** Options for sizing of the label. */
export type LABEL_SIZE_TYPE = 'small' | 'large';
const DEFAULT_SIZE = 'large';

export const LABEL_DEFAULT_OPTIONS = new InjectionToken<LabelDefaultOptions>(
  'LABEL_DEFAULT_OPTIONS',
);
@Component({
  selector: 'nx-label',
  templateUrl: './label.component.html',
  styleUrls: ['label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.disabled]': 'disabled',
    '[class.nx-label--negative]': 'inverse()',
    '[class.nx-label--large]': 'size === "large"',
    '[class.nx-label--small]': 'size === "small"',
  },
  standalone: true,
})
export class NxLabelComponent {
  readonly _stateChanges = new Subject<void>();

  /** Sets the label to disabled */
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._stateChanges.next();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /**
   * Whether the inverse set of styles, for use on a dark background, is applied.
   * When not set, it follows the surface the label is placed on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    alias: 'inverse',
    transform: nxOptionalBooleanAttribute,
  });

  private readonly _surface = injectSurface();

  /**
   * Whether the style for a dark background is used.
   * @deprecated Use `inverse` instead. Kept for backwards compatibility.
   */
  @Input() set negative(value: BooleanInput) {
    this._negative.set(coerceBooleanProperty(value));
    this._stateChanges.next();
  }
  get negative(): boolean {
    return this._negative();
  }
  private readonly _negative = signal(false);

  /**
   * Whether the inverse set of styles is applied.
   *
   * An explicit `inverse` wins, then the legacy `negative` input, then the surface the
   * label sits on — the same order as `nx-error`, so a label and the error under it
   * never disagree.
   */
  readonly inverse = computed(
    () => this.inverseInput() ?? (this._negative() || this._surface().surface === 'attention'),
  );

  /**
   * Optional text shown after the label, e.g. to indicate that the associated form
   * control is not mandatory. Rendered wrapped in parentheses; pass the text without them.
   */
  readonly optionalLabel = input<string | undefined>(undefined);

  /** Hint text shown below the label. Automatically adjusts to the `inverse` and `disabled` states. */
  readonly hint = input<string | undefined>(undefined);

  /** Sets the Id of the label */
  @Input() set id(value: string) {
    this._id.set(value);
  }
  get id(): string {
    return this._id();
  }
  private readonly _id = signal(inject(IdGenerationService).nextId('nx-label'));

  /**
   * Id of the rendered hint, or `null` when there is no hint.
   *
   * The label sits next to the control it describes rather than owning it, so the control
   * has to pick this up itself and merge it into its own `aria-describedby`.
   */
  readonly hintId = computed(() => (this.hint() && this._id() ? `${this._id()}-hint` : null));

  /**
   * **Expert option**
   *
   * Sets the appearance of the label.
   */
  @Input() set size(value: LABEL_SIZE_TYPE) {
    this._size = value;
    this._stateChanges.next();
  }
  get size(): LABEL_SIZE_TYPE {
    return this._size || this._defaultOptions?.size || DEFAULT_SIZE;
  }
  private _size?: LABEL_SIZE_TYPE;

  /**
   * Sets the html `for` attribute on the label.
   */
  @Input() set for(value: string | null) {
    this._for = value;
    this._cdr.markForCheck();
    this._stateChanges.next();
  }
  get for() {
    return this._for;
  }
  private _for: string | null = null;

  constructor(
    @Optional()
    @Inject(LABEL_DEFAULT_OPTIONS)
    private readonly _defaultOptions: LabelDefaultOptions | null,
    private readonly _cdr: ChangeDetectorRef,
  ) {}
}
