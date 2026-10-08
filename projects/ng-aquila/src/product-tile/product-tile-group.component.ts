import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { ErrorStateMatcher, IdGenerationService } from '@allianz/ng-aquila/utils';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DoCheck,
  effect,
  ElementRef,
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

import { NxProductTileComponent } from './product-tile.component';
import { NxProductTileCarouselComponent } from './product-tile-carousel.component';
import {
  NX_PRODUCT_TILE_CAROUSEL_ITEMS,
  NxProductTileCarouselItems,
} from './product-tile-carousel-item';

/**
 * Groups product tiles into one selectable set, so that picking one tile updates a single value.
 * Every tile needs one: the group is what holds the selection, so a tile outside it has nothing to
 * report to and throws.
 *
 * The group lays its tiles out on a carousel track, which keeps them on one line and only turns into
 * a scrollable one once there are more of them than the viewport fits.
 */
@Component({
  selector: 'nx-product-tile-group',
  templateUrl: './product-tile-group.component.html',
  styleUrl: './product-tile-group.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileCarouselComponent],
  providers: [
    {
      provide: NX_PRODUCT_TILE_CAROUSEL_ITEMS,
      useExisting: forwardRef(() => NxProductTileGroupComponent),
    },
  ],
  host: {
    '[class.nx-product-tile-group]': 'true',
    role: 'radiogroup',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.aria-describedby]': '_errorState() ? _errorIds() : null',
    '(focusout)': '_onFocusOut($event)',
    '(focusin)': '_onFocusIn($event)',
    '(pointerdown)': '_pointerAimed = true',
    '(pointerup)': '_pointerAimed = false',
  },
})
export class NxProductTileGroupComponent
  implements ControlValueAccessor, DoCheck, OnDestroy, NxProductTileCarouselItems
{
  private readonly _errors = contentChildren(NxErrorComponent, { descendants: true });
  /** `descendants`, so that tiles nested in a layout - a carousel, a `@for` - are still seen. */
  private readonly _tiles = contentChildren<NxProductTileComponent>(
    forwardRef(() => NxProductTileComponent),
    { descendants: true },
  );

  /** The tiles the group's own carousel puts on its tab bar. */
  readonly _items = this._tiles;

  readonly _id = inject(IdGenerationService).nextId('nx-product-tile-group');

  /** The value of the tile that is picked. */
  readonly value = model<any>(null);

  /**
   * Names the group after an element of your own - a section headline, say. The host binding is what
   * carries it, so an attribute set past the component would be overwritten.
   */
  readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });

  readonly _errorIds = computed(() =>
    this._errors()
      .map((error) => error.id)
      .join(' '),
  );

  readonly _errorState = signal(false);

  /** Whether a pointer went down in the group, so the focus it moves is aimed rather than tabbed. */
  protected _pointerAimed = false;

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });
  private readonly _errorStateMatcher = inject(ErrorStateMatcher);
  private readonly _injector = inject(Injector);
  private readonly _ngControl = inject(NgControl, { optional: true, self: true });

  private _selectionSubscriptions = Subscription.EMPTY;
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  /**
   * Tiles come and go, and their `selectionChange` is an `output()` rather than an observable, so
   * the subscription set is rebuilt whenever the query result changes.
   */
  private readonly _tilesChangedEffect = effect(() => {
    this._selectionSubscriptions.unsubscribe();
    runInInjectionContext(this._injector, () => {
      this._selectionSubscriptions = merge(
        ...this._tiles().map((tile) => outputToObservable(tile.selectionChange)),
      )
        .pipe(takeUntilDestroyed())
        .subscribe((value) => {
          this.value.set(value);
          this._onChange(value);
        });
    });
  });

  constructor() {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  /** @docs-private */
  writeValue(value: any): void {
    this.value.set(value);
  }

  /** @docs-private */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /** @docs-private */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  ngDoCheck(): void {
    this._updateErrorState();
  }

  ngOnDestroy(): void {
    this._selectionSubscriptions.unsubscribe();
    this._tilesChangedEffect.destroy();
  }

  protected _onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Node)) {
      this._onTouched();
    }
  }

  /**
   * Tabbing in lands on the picked tile rather than on whatever the group happens to hold first. The
   * picked tile is the one the reader is being asked about, and the tiles ahead of it each carry an
   * action of their own, so plain document order would walk them through those first.
   *
   * Direction comes from where the focus landed: coming forwards it lands ahead of the picked tile,
   * and shift-tabbing in lands behind it - that belongs at the end of the group, not pulled into the
   * middle.
   */
  protected _onFocusIn(event: FocusEvent): void {
    // A pointer was aimed at something in particular, so it gets what it aimed at. Only tabbing in
    // arrives without a target of its own for the group to answer for.
    const aimed = this._pointerAimed;
    this._pointerAimed = false;
    if (aimed) {
      return;
    }
    const root = this._elementRef.nativeElement;
    const from = event.relatedTarget as Node | null;
    if (from && root.contains(from)) {
      return;
    }
    const picked = this._tiles().find((tile) => tile.selected());
    const target = event.target as HTMLElement | null;
    if (!picked || !target) {
      return;
    }
    const tile = picked._elementRef.nativeElement;
    const entersAhead = !!(tile.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_PRECEDING);
    if (!entersAhead || tile.contains(target)) {
      return;
    }
    tile.querySelector<HTMLElement>('.nx-product-tile__input')?.focus();
  }

  private _updateErrorState(): void {
    const parent = this._parentFormGroup || this._parentForm;
    const control = this._ngControl ? this._ngControl.control : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);
    if (newState !== this._errorState()) {
      this._errorState.set(newState);
    }
  }
}
