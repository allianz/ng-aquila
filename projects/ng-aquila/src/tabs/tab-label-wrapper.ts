import { FocusableOption } from '@angular/cdk/a11y';
import { Directive, ElementRef, Input } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

/** @docs-private */
@Directive({ selector: '[nxTabLabelWrapper]' })
export class NxTabLabelWrapperDirective implements FocusableOption {
  private _disabled: boolean = false;

  constructor(public elementRef: ElementRef) {}

  /** Whether the tab group is disabled. Default: false. */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (this.disabled !== newValue) {
      this._disabled = newValue;
    }
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
