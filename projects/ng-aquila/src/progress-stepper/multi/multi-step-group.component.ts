import { Component, Input, QueryList, ContentChildren, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NxStepComponent } from '../progress-stepper.component';

@Component({
  templateUrl: './multi-step-group.component.html',
  selector: 'nx-step-group',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxMultiStepperGroupComponent {
  /** @docs-private */
  @ContentChildren(NxStepComponent, { descendants: true }) steps: QueryList<NxStepComponent>;

  /** Sets the label of a group that is shown to the user. */
  @Input()
  set label(value: string) {
    this._label = value;
    this._changeDetectorRef.markForCheck();
  }
  get label(): string {
    return this._label;
  }
  private _label;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
