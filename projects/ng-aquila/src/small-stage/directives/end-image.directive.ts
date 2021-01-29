import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';

/** A directive for passing info about end image to small stage component. */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-small-stage-end-image'
})
export class NxSmallStageEndImageDirective {
  /* Sets the source for loading the image */
  @Input() src: string;

  /**
   * **Expert option**
   *
   * Adds offset to the end of image container.
   */
  @Input()
  get offsetEnd(): boolean { return this._offsetEnd; }
  set offsetEnd(value: boolean) { this._offsetEnd = coerceBooleanProperty(value); }
  private _offsetEnd: boolean;

  static ngAcceptInputType_offsetEnd: BooleanInput;
}
