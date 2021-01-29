import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';

/** A directive for passing content to small stage component. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-small-stage-content'
})
export class NxSmallStageContentDirective {
  /**
   * **Expert option**
   *
   * Changes appearance of the component for narrow content
   */
  @Input()
  get narrow(): boolean { return this._narrow; }
  set narrow(value: boolean) { this._narrow = coerceBooleanProperty(value); }
  private _narrow: boolean;

  static ngAcceptInputType_narrow: BooleanInput;
}
