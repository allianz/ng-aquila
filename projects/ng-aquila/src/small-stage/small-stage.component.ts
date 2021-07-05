import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, ChangeDetectionStrategy, HostBinding, InjectionToken, Optional, Inject } from '@angular/core';

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
   * Sets the default appearance. (optional)
   */
  appearance?: NxSmallStageAppearance;
}

export const SMALL_STAGE_DEFAULT_OPTIONS =
  new InjectionToken<SmallStageDefaultOptions>('SMALL_STAGE_DEFAULT_OPTIONS');

@Component({
  selector: 'nx-small-stage',
  templateUrl: './small-stage.component.html',
  styleUrls: ['./small-stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSmallStageComponent {
  static ngAcceptInputType_narrow: BooleanInput;

  private _narrow: boolean = false;

  /**
   * Sets the appearance of the small stage. Default: 'default'
   */
  @Input()
  appearance: NxSmallStageAppearance = 'default';

  /**
   * Reduces the width of the text to 6/12 instead of 8/12.
   *
   * **Only works with appearance = 'expert'.**
   */
  @Input()
  @HostBinding('class.is-narrow')
  set narrow(value: boolean) {
    this._narrow = coerceBooleanProperty(value);
  }
  get narrow() {
    return this._narrow;
  }

  @HostBinding('class.is-expert')
  get _isExpert() {
    return this.appearance === 'expert';
  }

  constructor(@Optional() @Inject(SMALL_STAGE_DEFAULT_OPTIONS) defaultOptions: SmallStageDefaultOptions) {
    if (defaultOptions && defaultOptions.appearance) {
      this.appearance = defaultOptions.appearance;
    }
  }
}
