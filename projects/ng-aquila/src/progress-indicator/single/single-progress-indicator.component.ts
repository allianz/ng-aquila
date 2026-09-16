import { NxProgressbarColorScheme, NxProgressbarComponent } from '@allianz/ng-aquila/progressbar';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import {
  AfterContentChecked,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';

import { NxSingleProgressIndicatorIntl } from './single-progress-indicator.intl';

@Component({
  selector: 'nx-single-progress-indicator',
  templateUrl: './single-progress-indicator.component.html',
  styleUrls: ['./single-progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxProgressbarComponent],
})
export class NxSingleProgressIndicatorComponent implements AfterContentChecked {
  protected readonly _intl = inject(NxSingleProgressIndicatorIntl);

  /** Sets the current value of the progress bar. Defaults to zero. Forwarded to the underlying `nx-progressbar`. */
  readonly value = input(0, { transform: numberAttribute });

  /** The minimum value of the progress bar. Defaults to 0. Forwarded to the underlying `nx-progressbar`. */
  readonly min = input(0, { transform: numberAttribute });

  /** The maximum value of the progress bar. Defaults to 1. Forwarded to the underlying `nx-progressbar`. */
  readonly max = input(1, { transform: numberAttribute });

  /** Sets the color scheme of the progress bar. Defaults to "default". Forwarded to the underlying `nx-progressbar`. */
  readonly colorScheme = input<NxProgressbarColorScheme>('default');

  /** Makes the progress bar's background transparent. Defaults to false. Forwarded to the underlying `nx-progressbar`. */
  readonly transparentBackground = input(false, { transform: booleanAttribute });

  /**
   * Sets a second, right-aligned label. Hidden unless set.
   */
  readonly labelEnd = input<string | undefined>(undefined);

  /**
   * Overrides the `aria-label` of the underlying `nx-progressbar`.
   */
  readonly ariaLabel = input<string | undefined>(undefined);

  /**
   * passes to the `aria-labelledby` of the underlying `nx-progressbar`. Defaults to the visible
   * label(s)
   */
  readonly ariaLabelledBy = input<string | undefined>(undefined);

  protected readonly _labelId = inject(IdGenerationService).nextId(
    'nx-single-progress-indicator-label',
  );

  // Matches the progressbar's own fill fraction ((value - min) / (max - min)), so the default
  // label's numbers always agree with what the bar visually shows.
  protected readonly _currentStep = computed(() => this.value() - this.min());
  protected readonly _totalSteps = computed(() => this.max() - this.min());

  protected readonly _defaultLabel = computed(() =>
    this._intl.label()(this._currentStep(), this._totalSteps()),
  );

  // `aria-labelledby` wins over `aria-label` per ARIA naming precedence, so it must not fall
  // back to `_labelId` when only `ariaLabel` is set - that would silently override it.
  protected readonly _progressbarAriaLabelledBy = computed(() => {
    const ariaLabelledBy = this.ariaLabelledBy();
    if (ariaLabelledBy) {
      return ariaLabelledBy;
    }
    return this.ariaLabel() ? undefined : this._labelId;
  });

  private readonly _projectedLabel = viewChild<ElementRef<HTMLElement>>('projectedLabel');

  // Checked via rendered content rather than e.g. a `contentChild` query, since projected content
  // is often plain text or a non-text node (icon, image, svg) with no directive to query for.
  // Drives the default label's fallback.
  protected readonly _hasProjectedLabel = signal(false);

  ngAfterContentChecked(): void {
    const el = this._projectedLabel()?.nativeElement;
    this._hasProjectedLabel.set(
      (el?.textContent?.trim().length ?? 0) > 0 || (el?.children.length ?? 0) > 0,
    );
  }
}
