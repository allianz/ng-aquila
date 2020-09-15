import { Input, ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { clamp } from '@aposin/ng-aquila/utils';
import { NumberInput } from '@angular/cdk/coercion';
let progressbarId = 0;

@Component({
  selector: 'nx-progressbar',
  templateUrl: './progressbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./progressbar.component.scss'],
  host: {
    '[attr.aria-valuenow]': 'value'
  }
})
export class NxProgressbarComponent {

  /** @docs-private */
  progressbarId = `nx-progress-bar-${progressbarId++}`;

  /** Sets the value of the progress bar. Defaults to zero. Mirrored to aria-value now. */
  @Input()
  get value(): number { return this._value; }
  set value(value: number) { this._value = clamp(value || 0); }
  private _value: number = 0;

  _primaryTransform() {
    const scale = this.value;
    return {transform: `scaleX(${scale})`};
  }

  static ngAcceptInputType_value: NumberInput;
}
