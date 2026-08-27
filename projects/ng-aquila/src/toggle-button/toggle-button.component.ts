import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';

import { NxToggleButtonGroupComponent } from './toggle-button-group.component';

@Component({
  selector: 'nx-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-toggle-button]': 'true',
    '[class.is-selected]': 'selected()',
    '[class.is-disabled]': '_isDisabled()',
    '[class.is-readonly]': '_isReadonly()',
    '[class.has-error]': '_showError()',
    '[class.can-interact]': '!_isDisabled() && !_isReadonly()',
    '[class.is-negative]': '_group.negative()',
  },
})
export class NxToggleButtonComponent implements OnInit, OnDestroy {
  /** Id of the toggle button. */
  readonly id = inject(IdGenerationService).nextId('nx-toggle-button');

  /** Value of the toggle button. Becomes the value of the group when selected. */
  readonly value = input<any>(null);

  /** Whether the toggle button is disabled. Also set by the group. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Whether the toggle button is readonly. Also set by the group. */
  readonly readonly = input(false, { transform: booleanAttribute });

  protected readonly _group = inject(NxToggleButtonGroupComponent);

  /** Whether the toggle button is selected. */
  readonly selected = computed(() => this._group.value() === this.value());

  /** Whether the toggle button is disabled, either on its own or through the group. */
  readonly _isDisabled = computed(() => this._group.disabled() || this.disabled());

  /** Whether the toggle button is readonly, either on its own or through the group. */
  readonly _isReadonly = computed(() => this._group._isReadonly() || this.readonly());

  // A disabled or readonly toggle button keeps its neutral styling while the group has an error.
  protected readonly _showError = computed(
    () => this._group._errorState() && !this._isDisabled() && !this._isReadonly(),
  );

  protected readonly _inputId = `${this.id}-input`;

  protected readonly _ariaDescribedBy = computed(
    () => (this._group._errorState() && this._group._errorIds()) || null,
  );

  private readonly _input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit(): void {
    this._focusMonitor.monitor(this._elementRef, true);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Focuses the toggle button. */
  focus(options?: FocusOptions): void {
    this._input().nativeElement.focus(options);
  }

  protected _onClick(event: Event): void {
    event.stopPropagation();
    if (this._isReadonly()) {
      event.preventDefault();
      return;
    }
    this._group._select(this.value());
  }
}
