import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
} from '@angular/core';

import { NxMultiProgressStepComponent } from './multi-progress-step.component';

export type NxMultiProgressIndicatorColorScheme = 'default' | 'positive';

export type NxMultiProgressIndicatorLayout =
  'horizontal' | 'horizontal-labels-below' | 'vertical' | 'vertical-no-labels' | 'vertical-no-bars';

@Component({
  selector: 'nx-multi-progress-indicator',
  templateUrl: './multi-progress-indicator.component.html',
  styleUrls: ['./multi-progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.positive]': 'colorScheme() === "positive"',
    '[class.vertical]':
      'layout() === "vertical" || layout() === "vertical-no-labels" || layout() === "vertical-no-bars"',
    '[class.no-bars]': 'layout() === "vertical-no-bars"',
    // The inputs below are aliased to the aria attribute names, so Angular also writes them onto
    // this host element - strip them here, as the `<ol>` in the template is what carries them.
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
  },
})
export class NxMultiProgressIndicatorComponent {
  /** Whether the steps show their number in the bullet. Defaults to true. */
  readonly numbered = input(true, { transform: booleanAttribute });

  /** Sets the color scheme of the progress indicator. Defaults to "default". */
  readonly colorScheme = input<NxMultiProgressIndicatorColorScheme>('default');

  /**
   * Sets the layout of the progress indicator. Defaults to "horizontal" (bar for the current
   * step only, label beside the bullet). "horizontal-labels-below" bars every step and moves labels
   * below the bullet. "vertical" stacks steps top to bottom with a bar between each one.
   * "vertical-no-labels" and "vertical-no-bars" are "vertical" without a visible label or bar,
   * respectively. A compact layout is not yet implemented.
   */
  readonly layout = input<NxMultiProgressIndicatorLayout>('horizontal');

  /**
   * Sets the 1-based index of the active step. Steps before it are marked completed and the
   * step at this index is marked current - both automatically, without setting `completed`/
   * `current` on every `nx-multi-progress-step` yourself. A step can still override this by
   * setting its own `completed`/`current` input, e.g. to mark an out-of-order step as done.
   */
  readonly currentStep = input<number | undefined>(undefined);

  /**
   * Sets the accessible name of the list of steps, e.g. "Order process". Bind as `aria-label`.
   * Give the list a name through either this or `aria-labelledby` - without one, screen reader
   * users get an unlabelled list of steps.
   */
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  /**
   * Names the list of steps after an existing element instead of a literal string, e.g. the
   * heading above it. Bind as `aria-labelledby`. Takes precedence over `aria-label`.
   */
  readonly ariaLabelledBy = input<string | null>(null, { alias: 'aria-labelledby' });

  /**
   * Points the list of steps at an element describing it in more detail, e.g. a hint about what
   * happens after the last step. Bind as `aria-describedby`.
   */
  readonly ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });

  // Not `protected`: read by `NxMultiProgressStepComponent` to derive its own position -
  // see that class's `_index`/`_first`/`_last`.
  readonly _steps = contentChildren(NxMultiProgressStepComponent, {
    descendants: true,
  });
}
