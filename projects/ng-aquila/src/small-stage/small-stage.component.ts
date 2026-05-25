import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  input,
  Optional,
} from '@angular/core';

/**
 * Appearance options for the small stage component.
 */
export type NxSmallStageAppearance = 'default' | 'expert';

export type NxSmallStageColorScheme = 'default' | 'emphasis';

/**
 * Represents the default options for the small stage.
 * It can be configured using the `NX_SMALL_STAGE_DEFAULT_OPTIONS` injection token.
 */
export interface SmallStageDefaultOptions {
  /**
   * Sets the default appearance (optional).
   */
  appearance?: NxSmallStageAppearance;

  /**
   * Limits the width of the small stage on large screens. defaults to `true`.
   * Usually `true` for customer facing apps and `false` for functional apps.
   */
  maxWidthContent?: boolean;
}

export const SMALL_STAGE_DEFAULT_OPTIONS = new InjectionToken<SmallStageDefaultOptions>(
  'SMALL_STAGE_DEFAULT_OPTIONS',
);

@Component({
  selector: 'nx-small-stage',
  templateUrl: './small-stage.component.html',
  styleUrls: ['./small-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    '[class.is-expert]': 'expertActive()',
    '[class.max-width]': 'maxWidth()',
    '[class.is-emphasis]': 'colorScheme() === "emphasis"',
  },
})
export class NxSmallStageComponent {
  /**
   * **Expert option**
   *
   * Sets the appearance of the small stage.
   *
   * Default: `'default'`.
   */
  @Input() set appearance(value: NxSmallStageAppearance) {
    if (this._appearance !== value) {
      this._appearance = value;
    }
  }
  get appearance(): NxSmallStageAppearance {
    return this._appearance || this._defaultOptions?.appearance || 'default';
  }
  private _appearance?: NxSmallStageAppearance;
  protected readonly expertActive = computed(() => this.appearance === 'expert');

  /**
   * Limits the width of the small stage content  on large screens. defaults to `true`.
   */
  readonly maxWidthContentInput = input<boolean | null, boolean | string | null>(null, {
    transform: (v) => (v === null ? null : booleanAttribute(v)),
    alias: 'maxWidthContent',
  });
  readonly maxWidth = computed(() => {
    // Option 1: return input if set
    if (this.maxWidthContentInput() !== null) {
      return this.maxWidthContentInput();
    }

    // Option 2: return default options if set
    if (this._defaultOptions?.maxWidthContent !== undefined) {
      return this._defaultOptions.maxWidthContent;
    }

    // return true as default value
    return true;
  });

  readonly colorScheme = input<NxSmallStageColorScheme>('default');

  /**
   * Reduces the width of the text to 6/12 instead of 8/12.
   *
   * **Only works with appearance = 'expert'.**.
   */
  @Input() @HostBinding('class.is-narrow') set narrow(value: BooleanInput) {
    this._narrow = coerceBooleanProperty(value);
  }
  get narrow() {
    return this._narrow;
  }
  private _narrow = false;

  constructor(
    @Optional()
    @Inject(SMALL_STAGE_DEFAULT_OPTIONS)
    private readonly _defaultOptions: SmallStageDefaultOptions | null,
  ) {}
}
