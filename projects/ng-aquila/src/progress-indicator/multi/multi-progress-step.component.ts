import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';

import { NxMultiProgressIndicatorComponent } from './multi-progress-indicator.component';
import { NxMultiProgressIndicatorIntl } from './multi-progress-indicator.intl';

@Component({
  selector: 'nx-multi-progress-step',
  templateUrl: './multi-progress-step.component.html',
  styleUrls: ['./multi-progress-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'listitem',
    '[class.is-current]': '_isCurrent()',
    '[class.is-completed]': '_isCompleted()',
    '[class.is-critical]': 'critical()',
    '[class.is-positive]': '_colorScheme() === "positive"',
    '[class.is-horizontal-labels-below]': '_layout() === "horizontal-labels-below"',
    '[class.is-vertical]': '_isVertical()',
    '[class.is-vertical-no-labels]': '_layout() === "vertical-no-labels"',
    '[class.is-first]': '_first()',
    '[class.is-last]': '_last()',
    '[attr.aria-current]': '_isCurrent() ? "step" : null',
  },
  imports: [NxIconModule],
})
export class NxMultiProgressStepComponent {
  private readonly _parent = inject<NxMultiProgressIndicatorComponent>(
    forwardRef(() => NxMultiProgressIndicatorComponent),
  );

  protected readonly _intl = inject(NxMultiProgressIndicatorIntl);

  /**
   * Marks the step as completed. Set this explicitly to override the value derived from the
   * parent's `currentStep`, e.g. to mark an out-of-order step as done.
   */
  readonly completed = input(false, { transform: booleanAttribute });

  /**
   * Marks the step as the current step. Set this explicitly to override the value derived from
   * the parent's `currentStep`.
   */
  readonly current = input(false, { transform: booleanAttribute });

  /** Marks the step as critical. */
  readonly critical = input(false, { transform: booleanAttribute });

  // Derived from the parent's own `_steps` query rather than written into by the parent, so
  // there's no imperative "push state down" effect to keep in sync.
  /** This step's 1-based position among its siblings. */
  protected readonly _index = computed(() => {
    const index = this._parent._steps().indexOf(this);
    // Keep -1 as-is so it never collides with an unset/`0` `currentStep`.
    return index === -1 ? -1 : index + 1;
  });

  /** True for the first step. */
  protected readonly _first = computed(() => this._index() === 1);

  /** True for the last step. */
  protected readonly _last = computed(() => this._index() === this._parent._steps().length);

  /** Whether the bullet shows the step number. Controlled by the parent list. */
  protected readonly _numbered = computed(() => this._parent.numbered());

  /** Color scheme, read reactively from the parent list. */
  protected readonly _colorScheme = computed(() => this._parent.colorScheme());

  /** Layout, read reactively from the parent list. */
  protected readonly _layout = computed(() => this._parent.layout());

  // True for any layout that stacks steps vertically, so they can share the "is-vertical" styles.
  protected readonly _isVertical = computed(
    () =>
      this._layout() === 'vertical' ||
      this._layout() === 'vertical-no-labels' ||
      this._layout() === 'vertical-no-bars',
  );

  protected readonly _isCurrent = computed(
    () => this.current() || this._index() === this._parent.currentStep(),
  );

  // Not `protected`: read by `NxProgressIndicatorStepActionComponent` to decide whether it's
  // disabled.
  readonly _isCompleted = computed(() => {
    const currentStep = this._parent.currentStep();
    return this.completed() || (currentStep != null && this._index() < currentStep);
  });

  // "vertical-no-bars" must never show a bar, even for the current step - a plain `||` chain here
  // previously leaked one in via the default layout's `_isCurrent()` fallback.
  protected readonly _showBar = computed(() => {
    if (this._last()) {
      return false;
    }
    switch (this._layout()) {
      case 'horizontal-labels-below':
      case 'vertical':
      case 'vertical-no-labels':
        return true;
      case 'vertical-no-bars':
        return false;
      default:
        return this._isCurrent();
    }
  });
}
