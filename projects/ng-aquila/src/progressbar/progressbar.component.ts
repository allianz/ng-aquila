import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'nx-progressbar',
  templateUrl: './progressbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./progressbar.component.scss'],
  host: {
    '[attr.aria-valuenow]': 'value',
    '[attr.role]': '"progressbar"',
    '[attr.aria-valuemax]': 'this.max',
    '[attr.aria-valuemin]': 'this.min',
    '[attr.aria-label]': 'this.ariaLabel',
    '[attr.aria-labelledby]': 'this.ariaLabelledBy',
  },
  imports: [NgStyle],
})
export class NxProgressbarComponent {
  /** Overrides the `aria-label` of the nx-progressbar. Defaults to "Progress" */
  @Input() ariaLabel: string | undefined = 'Progress';

  /** Sets the `aria-labelledby` of the nx-progressbar */
  @Input() ariaLabelledBy: string | undefined;

  /** Sets the value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  @Input({ transform: numberAttribute }) value = 0;

  /** The minimum value of the progress bar. Used for percentage calculation and mirrored to `aria-valuemin`. Defaults to 0 */
  @Input({ transform: numberAttribute }) min = 0;

  /** The maximum value of the progress bar. Used for percentage calculation and mirrored to `aria-valuemax`. Defaults to 1 */
  @Input({ transform: numberAttribute }) max = 1;

  _primaryTransform() {
    const scale = (this.value - this.min) / (this.max - this.min);
    return { transform: `scaleX(${scale})` };
  }
}
