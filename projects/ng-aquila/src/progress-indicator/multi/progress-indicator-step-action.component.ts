import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  Renderer2,
} from '@angular/core';

import { NxMultiProgressStepComponent } from './multi-progress-step.component';

/**
 * Put this on a projected `<a>`/`<button>` inside `nx-multi-progress-step` to reflect the
 * step's state onto it: until the step is completed the action is neither focusable nor
 * activatable, while staying in the accessibility tree so its content is still read.
 *
 * A `<button>` gets the native `disabled` attribute. `disabled` is not valid on `<a>`, so an
 * anchor gets `aria-disabled` + `tabindex="-1"` and a click guard instead. That reliably keeps it
 * out of the tab order and unactivatable, but an anchor with an `href` keeps its `link` role and
 * `aria-disabled` support on links varies - see `progress-indicator.md` for how to opt out of
 * link semantics entirely.
 */
@Component({
  selector: 'a[nxProgressIndicatorStepAction], button[nxProgressIndicatorStepAction]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-progress-indicator-step-action--disabled]': '_isDisabled()',
    '[attr.disabled]': '(!_isAnchor && _isDisabled()) || null',
    '[attr.aria-disabled]': '(_isAnchor && _isDisabled()) || null',
    '[attr.tabindex]': '_isAnchor && _isDisabled() ? -1 : null',
  },
})
export class NxProgressIndicatorStepActionComponent {
  private readonly _step = inject(NxMultiProgressStepComponent);

  private readonly _elementRef = inject(ElementRef);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _renderer = inject(Renderer2);
  private readonly _ngZone = inject(NgZone);

  protected readonly _isAnchor = this._elementRef.nativeElement.tagName === 'A';

  protected readonly _isDisabled = computed(() => !this._step._isCompleted());

  constructor() {
    // Defence in depth behind `pointer-events: none`: still catches a programmatic `.click()` or
    // an activation through the screen reader's virtual cursor, which pointer events don't cover.
    const cleanUp = this._ngZone.runOutsideAngular(() =>
      this._renderer.listen(this._elementRef.nativeElement, 'click', (event: Event) => {
        if (this._isAnchor && this._isDisabled()) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }),
    );
    this._destroyRef.onDestroy(cleanUp);
  }
}
