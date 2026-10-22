import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NxComparisonTableIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes = new Subject<void>();

  /** Aria label for the "previous" navigation button in overflow mode. */
  previousAriaLabel = 'Previous products';

  /** Aria label for the "next" navigation button in overflow mode. */
  nextAriaLabel = 'Next products';

  /** Screen reader label of the `check` icon of a comparison table feature. */
  featureIncludedLabel = 'Included';

  /** Screen reader label of the `minus` and `cross` icons of a comparison table feature. */
  featureNotIncludedLabel = 'Not included';
}
