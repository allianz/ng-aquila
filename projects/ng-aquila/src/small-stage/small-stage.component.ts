import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  Inject,
  inject,
  InjectionToken,
  Input,
  Optional,
} from '@angular/core';

/**
 * Appearance options for the small stage component.
 */
export type NxSmallStageAppearance = 'default' | 'expert';

/**
 * Represents the default options for the small stage.
 * It can be configured using the `NX_SMALL_STAGE_DEFAULT_OPTIONS` injection token.
 */
export interface SmallStageDefaultOptions {
  /**
   * Sets the default appearance (optional).
   */
  appearance?: NxSmallStageAppearance;
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
    '[class.is-expert]': 'expertActive() || a1Enabled()',
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
   * Workaround to determine which A1 grid should be used.
   * SmallStage is used by retail and expert apps. We need map retail apps to default grid and expert apps to functional grid.
   * TODO: remove this workaround when a solution for grid handling in A1 is found.
   */
  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly a1Enabled = computed<boolean>(
    () => this._allianzOneOptions?.enabled?.() || false,
  );

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
