import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { IdGenerationService, SignalErrorStateMatcher } from '@allianz/ng-aquila/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

import { NxToggleButtonComponent } from './toggle-button.component';

/** How the toggle buttons are sized while the automatic layout is enabled. */
export type NxToggleButtonColumnSizing = 'content' | 'equal';

@Component({
  selector: 'nx-toggle-button-group',
  templateUrl: './toggle-button-group.component.html',
  styleUrl: './toggle-button-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-toggle-button-group]': 'true',
    '[style.--nx-auto-grid-max-columns]': 'maxColumns()',
    '(focusout)': '_onFocusOut($event)',
  },
  providers: [
    {
      provide: NxAbstractControl,
      useExisting: forwardRef(() => NxToggleButtonGroupComponent),
    },
  ],
})
export class NxToggleButtonGroupComponent implements FormValueControl<any>, NxAbstractControl {
  /** Id of the toggle button group. */
  readonly id = inject(IdGenerationService).nextId('nx-toggle-button-group');

  /** The value of the selected toggle button. */
  readonly value = model<any>(null);

  /** Whether all toggle buttons of the group are disabled. Also set by the bound form control. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Whether all toggle buttons of the group are readonly. Also set by the bound form control. */
  readonly readonly = input(false, { transform: booleanAttribute });

  /**
   * Whether a selection is required. Only sets the aria attribute, validation stays with the form.
   * Also set by the bound form control.
   */
  readonly required = input(false, { transform: booleanAttribute });

  /**
   * Name of the toggle buttons, which is mandatory in conjunction with ngModel. Must be unique per
   * group, otherwise two groups merge into one native radio group (Default: the id of the group).
   */
  readonly name = input(this.id);

  /** Whether the toggle buttons are styled for a dark surface. */
  readonly negative = input(false, { transform: booleanAttribute });

  /** Whether the current value is invalid. Set by the bound form control. */
  readonly invalid = input(false, { transform: booleanAttribute });

  /** Whether the group has been touched. Set by the bound form control. */
  readonly touched = input(false, { transform: booleanAttribute });

  /** Emits when the user has finished interacting with the group. */
  readonly touch = output<void>();

  /** Whether the toggle buttons are laid out automatically. */
  readonly autoGrid = input(true, { transform: booleanAttribute });

  /** Maximum number of columns of the automatic layout. Unlimited by default. */
  readonly maxColumns = input<number | null>(null);

  /** Whether the toggle buttons are as wide as their content or all equally wide. */
  readonly columnSizing = input<NxToggleButtonColumnSizing>('content');

  /** Whether the group is readonly, either by the input or through the abstract control. */
  readonly _isReadonly = computed(() => this.readonly() || this._controlReadonly());

  protected readonly _label = contentChild(NxLabelComponent, { descendants: true });
  private readonly _errorComponents = contentChildren(NxErrorComponent, { descendants: true });
  private readonly _buttons = contentChildren<NxToggleButtonComponent>(
    forwardRef(() => NxToggleButtonComponent),
    { descendants: true },
  );

  readonly _errorIds = computed(() =>
    this._errorComponents()
      .map((error) => error.id)
      .join(' '),
  );

  readonly _errorState = computed(() =>
    this._errorStateMatcher.isErrorState({
      invalid: this.invalid(),
      touched: this.touched(),
    }),
  );

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _errorStateMatcher = inject(SignalErrorStateMatcher);

  private readonly _controlReadonly = signal(false);

  setReadonly(value: boolean): void {
    this._controlReadonly.set(value);
  }

  /** Focuses the selected toggle button, or the first one that can be selected. */
  focus(options?: FocusOptions): void {
    const buttons = this._buttons();
    const button = buttons.find((it) => it.selected()) ?? buttons.find((it) => !it._isDisabled());
    button?.focus(options);
  }

  _select(value: any): void {
    this.value.set(value);
  }

  protected _onFocusOut(event: FocusEvent): void {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Node)) {
      this.touch.emit();
    }
  }
}
