import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  NgZone,
} from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { delay, throttleTime, takeUntil } from 'rxjs/operators';

import { NxWordComponent } from './word.component';

/** Size of the NLF. */
export type NxNaturalLanguageFormSize = 'small' | 'large';

const DEFAULT_SIZE = 'large';

@Component({
  selector: 'nx-natural-language-form',
  templateUrl: 'natural-language-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['natural-language-form.scss'],
  host: {
    '[class.is-negative]': 'negative',
    '[class.nx-natural-language-form--small]' : 'size === "small"',
    '[class.nx-natural-language-form--large]' : 'size === "large"',
  }
})

export class NxNaturalLanguageFormComponent implements AfterContentInit, OnDestroy {
  private _negative = false;

  /** @docs-private */
  resizeEvent$: Subject<void> = new Subject<void>();

  /** @docs-private */
  resizeObservable!: Observable<void>;

  private _destroyed = new Subject();

  @ContentChildren(NxWordComponent) _words!: QueryList<NxWordComponent>;

  /** @docs-private */
  updatePopoversSubscription: Subscription = Subscription.EMPTY;

  /** @docs-private */
  private _size: NxNaturalLanguageFormSize = DEFAULT_SIZE;

  /** Whether the negative set of stylings should be used. */
  @Input('nxNegative')
  set negative(value) {
    this._negative = coerceBooleanProperty(value);
  }

  get negative() {
    return this._negative;
  }

  /**
   * Sets the size of the NLF. Default value: large
   */
  @Input()
  set size(value: NxNaturalLanguageFormSize) {
    this._size = value;
    this._changeDetectorRef.markForCheck();
  }
  get size(): NxNaturalLanguageFormSize {
    return this._size;
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone
  ) {
    // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
    // if the consumer is using `zone-patch-rxjs`, the call throws `Maximum call stack size exceeded` error.
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.pipe(takeUntil(this._destroyed)).subscribe(() => {
        // wait until all elements are stable for repositioning popovers
        this.updatePositionPopovers();
      });
    });
  }

  /** @docs-private */
  @HostListener('window:orientationchange', ['$event'])
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.resizeEvent$.next();
  }

  ngAfterContentInit() {
    // Collect all words and listen for changes so we can update any open error popover
    // which would otherwise get wrongly positioned.
    const subjects = this._words.map((word: NxWordComponent) => word.inputChanges);
    const source = merge(...subjects);

    this.updatePopoversSubscription = source.subscribe( () => {
      this.updatePositionPopovers();
    });

    this.resizeObservable = this.resizeEvent$.pipe(throttleTime(500), delay(100));
    this.resizeObservable.subscribe(() => this.resizeWords());
  }

  /** @docs-private */
  resizeWords() {
    this._words.forEach((word: NxWordComponent) => {
      word.updateCurrentTextWidth();
    });
  }

  ngOnDestroy(): void {
    this.updatePopoversSubscription.unsubscribe();
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** @docs-private */
  updatePositionPopovers() {
    if (this._words) {
      this._words.forEach((word: NxWordComponent) => {
        word.repositionError();
      });
    }
  }

  static ngAcceptInputType_negative: BooleanInput;
}
