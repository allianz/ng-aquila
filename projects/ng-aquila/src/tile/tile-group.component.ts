import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { ErrorStateMatcher, IdGenerationService } from '@allianz/ng-aquila/utils';
import {
  Component,
  computed,
  contentChild,
  contentChildren,
  DoCheck,
  effect,
  forwardRef,
  inject,
  Injector,
  input,
  model,
  OnDestroy,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { merge, Subscription } from 'rxjs';

import { NxTileComponent, NxTileLayout } from './tile.component';

export type NxTileSelectionMode = 'single' | 'multi';

@Component({
  selector: 'nx-tile-group',
  templateUrl: './tile-group.component.html',
  styleUrl: './tile-group.component.scss',
  host: {
    '[class.nx-tile-group]': 'true',
    '[class.is-multi-select]': "selectionMode() === 'multi'",
    '[class.is-single-select]': "selectionMode() === 'single'",
    '[class.auto-grid]': 'autoGrid()',
    '[style.--nx-auto-grid-max-columns]': 'maxColumns()',
    role: 'group',
    '[attr.aria-labelledby]': 'label()?.id || null',
    '[attr.aria-describedby]': '_errorState() ? errorIds() : null',
  },
})
export class NxTileGroupComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  readonly label = contentChild(NxLabelComponent, { descendants: true });
  readonly errors = contentChildren(NxErrorComponent, { descendants: true });
  readonly tiles = contentChildren<NxTileComponent>(forwardRef(() => NxTileComponent));

  readonly id = inject(IdGenerationService).nextId('nx-tile-group');

  /** Whether to enable automatic grid layout for the tiles. Default is true. */
  readonly autoGrid = input(true);

  /** Maximum number of columns when auto grid is enabled. Default is 4. */
  readonly maxColumns = input(4);

  /** Selection mode for the tile group. Can be 'single' or 'multi'. Default is 'single'. */
  readonly selectionMode = input<NxTileSelectionMode>('single');

  /** Whether the tile group is disabled. Default is false. */
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** Whether the tile group is readonly. Default is false. */
  readonly readonly = input(false);

  /** The value of the group. Should be a single value for single select, and an array of values for multi select. */
  readonly value = model<any | any[]>(null);

  /** The layout of the tiles in the group. Can be 'horizontal' or 'vertical'. Default is 'vertical'. */
  readonly tileLayout = input<NxTileLayout>('vertical');

  readonly errorIds = computed(() =>
    this.errors()
      .map((error) => error.id)
      .join(' '),
  );
  readonly disabled = computed(() => this.accessorDisabled() || this.disabledInput());

  protected readonly accessorDisabled = signal(false);
  protected readonly injector = inject(Injector);
  readonly _errorState = signal(false);

  private readonly _parentForm: NgForm | null = inject(NgForm, { optional: true });
  private readonly _parentFormGroup: FormGroupDirective | null = inject(FormGroupDirective, {
    optional: true,
  });
  private readonly _errorStateMatcher: ErrorStateMatcher = inject(ErrorStateMatcher);
  protected readonly ngControl: NgControl | null;

  private selectionSubscriptions = Subscription.EMPTY;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  /**
   * Effect that subscribes to tile selection changes and updates the group value accordingly.
   * Since the tiles can change dynamically, the effect takes care of unsubscribing and resubscribing to the tile outputs.
   */
  tilesChangedEffect = effect(() => {
    this.selectionSubscriptions.unsubscribe();
    runInInjectionContext(this.injector, () => {
      this.selectionSubscriptions = merge(
        // the tiles use the new output method which are not observables anymore.
        // Angular provides the outputToObservable utility to convert them.
        ...this.tiles().map((tile) => outputToObservable(tile.selectionChange)),
      )
        .pipe(takeUntilDestroyed())
        .subscribe((value) => {
          if (this.selectionMode() === 'single') {
            // For single selection we can just take the value as there is no deselection possible.
            this.value.set(value);
          } else {
            const currentValue = this.value();
            // For multi selection we sync if the value is already in the state then it is a deselection and we remove it.
            if (Array.isArray(currentValue) && currentValue.includes(value)) {
              this.value.set(currentValue.filter((v: any) => v !== value));
            } else {
              this.value.set([...(currentValue || []), value]);
            }
          }
          this.onChange(this.value());
        });
    });
  });

  constructor() {
    this.ngControl = inject(NgControl, { optional: true, self: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    this.value.set(value);
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.accessorDisabled.set(isDisabled);
  }

  ngDoCheck(): void {
    this.updateErrorState();
  }

  ngOnDestroy(): void {
    this.selectionSubscriptions.unsubscribe();
    this.tilesChangedEffect.destroy();
  }

  /**
   * Updates the error state based on the associated FormControl/NgControl.
   */
  private updateErrorState(): void {
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? this.ngControl.control : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);
    if (newState !== this._errorState()) {
      this._errorState.set(newState);
    }
  }

  // called by the tiles
  touch() {
    this.onTouched();
  }
}
