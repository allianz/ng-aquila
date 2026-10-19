import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxOverlayRef, NxOverlayService, NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import {
  NX_MULTI_PROGRESS_INDICATOR,
  NxMultiProgressIndicatorColorScheme,
  NxMultiProgressIndicatorLayout,
} from '../multi/multi-progress-indicator-types';
import { NxMultiProgressStepComponent } from '../multi/multi-progress-step.component';
import { NxProgressIndicatorStepActionComponent } from '../multi/progress-indicator-step-action.component';
import { NxCompactProgressIndicatorIntl } from './compact-progress-indicator.intl';

// Not a token: the overlay config takes a plain number.
const PANEL_OFFSET = 8;

@Component({
  selector: 'nx-compact-progress-indicator',
  templateUrl: './compact-progress-indicator.component.html',
  styleUrls: ['./compact-progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NX_MULTI_PROGRESS_INDICATOR,
      useExisting: forwardRef(() => NxCompactProgressIndicatorComponent),
    },
  ],
  host: {
    // Aliased inputs land here too; the panel's `<ol>` carries them.
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
  },
  imports: [NxIconModule, NxPlainButtonComponent],
})
export class NxCompactProgressIndicatorComponent {
  private readonly _overlay = inject(NxOverlayService);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly _intl = inject(NxCompactProgressIndicatorIntl);

  private readonly _id = inject(IdGenerationService).nextId('nx-compact-progress-indicator');
  protected readonly _counterId = `${this._id}-counter`;
  protected readonly _labelId = `${this._id}-label`;
  protected readonly _panelId = `${this._id}-panel`;

  /**
   * Sets the 1-based index of the active step, exactly as on `nx-multi-progress-indicator`. Also
   * drives the "X of Y" counter - without it, the counter falls back to whichever step sets its
   * own `current`.
   */
  readonly currentStep = input<number | undefined>(undefined);

  /** Button label, read after the counter. Defaults to the intl's `expandLabel`. */
  readonly expandLabel = input<string | null>(null);

  /** Sets the accessible name of the list of steps, e.g. "Order process". Bind as `aria-label`. */
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  /**
   * Names the list of steps after an existing element instead of a literal string. Bind as
   * `aria-labelledby`. Takes precedence over `aria-label`.
   */
  readonly ariaLabelledBy = input<string | null>(null, { alias: 'aria-labelledby' });

  /**
   * Points the list of steps at an element describing it in more detail. Bind as
   * `aria-describedby`.
   */
  readonly ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });

  /** Emits whenever the panel opens or closes. */
  readonly openedChange = output<boolean>();

  // Not `protected`: read by the steps for their position.
  readonly _steps = contentChildren(NxMultiProgressStepComponent, {
    descendants: true,
  });

  private readonly _actions = contentChildren(NxProgressIndicatorStepActionComponent, {
    descendants: true,
  });

  private readonly _keyManager = new FocusKeyManager(this._actions, inject(Injector))
    .withVerticalOrientation()
    .withWrap()
    .withHomeAndEnd();

  // Read by the projected steps and are fixed
  readonly numbered = signal(true).asReadonly();
  readonly colorScheme = signal<NxMultiProgressIndicatorColorScheme>('default').asReadonly();
  readonly layout = signal<NxMultiProgressIndicatorLayout>('vertical-no-bars').asReadonly();

  private readonly _panel = viewChild.required<TemplateRef<unknown>>('panel');

  // Keeps the button's active styling while the panel is open.
  private readonly _triggerButton = viewChild.required(NxTriggerButton);

  private readonly _trigger = viewChild.required('trigger', { read: ElementRef });

  private _overlayRef: NxOverlayRef<unknown> | null = null;

  protected readonly _isOpen = signal(false);

  protected readonly _counter = computed(() => {
    const explicit = this.currentStep();
    const index = explicit ?? this._steps().findIndex((step) => step._isCurrent()) + 1;
    return this._intl.stepCounterLabel()(index, this._steps().length);
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.close();
      this._keyManager.destroy();
    });
  }

  /** Whether the panel is currently open. */
  get opened(): boolean {
    return this._isOpen();
  }

  /** Opens the panel. No-op when it is already open. */
  open(): void {
    if (this._overlayRef) {
      return;
    }

    this._overlayRef = this._overlay.open(this._panel(), this._elementRef, {
      direction: 'bottom-start',
      fallbackOrientation: 'vertical',
      offset: PANEL_OFFSET,
      viewportMargin: 16,
      triggerButton: this._triggerButton(),
      // A disclosure: focus stays on the button until the user tabs into the panel.
      moveFocus: false,
    });

    // Capture phase: a modal stops the propagation of clicks inside it, so the overlay never sees them.
    fromEvent<MouseEvent>(document, 'click', { capture: true })
      .pipe(
        filter((event) => {
          const target = event.target as Node;
          return (
            !this._elementRef.nativeElement.contains(target) &&
            !document.getElementById(this._panelId)?.contains(target)
          );
        }),
        takeUntil(this._overlayRef.afterClosed()),
      )
      .subscribe(() => this.close());

    // The overlay closes on Escape keydown, but a host such as nx-modal closes on keyup and would follow suit.
    let escapePressed = false;
    fromEvent<KeyboardEvent>(document, 'keydown', { capture: true })
      .pipe(takeUntil(this._overlayRef.afterClosed()))
      .subscribe((event) => (escapePressed = event.key === 'Escape'));

    this._overlayRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        if (escapePressed) {
          fromEvent<KeyboardEvent>(document, 'keyup', { capture: true })
            .pipe(take(1))
            .subscribe((event) => event.stopPropagation());
        }
        this._overlayRef = null;
        this._isOpen.set(false);
        this.openedChange.emit(false);
      });

    this._isOpen.set(true);
    this.openedChange.emit(true);
  }

  /** Closes the panel. No-op when it is not open. */
  close(): void {
    this._overlayRef?.close();
  }

  /** Opens the panel if it is closed, closes it otherwise. */
  toggle(): void {
    if (this._overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }

  // The panel sits at the end of the overlay container, so Tab from the button would skip it.
  protected _onTriggerKeydown(event: KeyboardEvent): void {
    if (!this._overlayRef) {
      return;
    }

    const focusable = this._focusableActions();

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const target = event.key === 'ArrowDown' ? focusable[0] : focusable[focusable.length - 1];
      if (target) {
        event.preventDefault();
        target.focus();
      }
      return;
    }

    if (event.key !== 'Tab' || event.shiftKey) {
      return;
    }

    if (focusable[0]) {
      event.preventDefault();
      focusable[0].focus();
    } else {
      this.close();
    }
  }

  protected _onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      this._onPanelTab(event);
      return;
    }

    // Tab and the pointer move focus without the key manager knowing.
    const focused = this._actions().find(
      (action) => action._elementRef.nativeElement === document.activeElement,
    );
    if (focused) {
      this._keyManager.updateActiveItem(focused);
    }

    this._keyManager.onKeydown(event);
  }

  // Leaving the panel at either end continues the tab order as if the panel sat right after the
  // button, not at the end of the page.
  private _onPanelTab(event: KeyboardEvent): void {
    const focusable = this._focusableActions();
    const active = document.activeElement;

    if (event.shiftKey && active === focusable[0]) {
      event.preventDefault();
      this._trigger().nativeElement.focus();
    } else if (!event.shiftKey && active === focusable[focusable.length - 1]) {
      // The browser's own Tab then moves on from the button.
      this._trigger().nativeElement.focus();
      this.close();
    }
  }

  private _focusableActions(): HTMLElement[] {
    return this._actions()
      .filter((action) => !action.disabled)
      .map((action) => action._elementRef.nativeElement);
  }
}
