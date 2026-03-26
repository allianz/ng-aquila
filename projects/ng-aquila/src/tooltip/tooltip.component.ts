import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { TooltipPosition } from './tooltip.directive';

type TooltipVisibility = 'initial' | 'visible' | 'hidden';

/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
@Component({
  selector: 'nx-tooltip-component',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Forces the element to have a layout in IE and Edge. This fixes issues where the element
    // won't be rendered if the aninxions are disabled or there is no web aninxions polyfill.
    '[style.zoom]': 'visibility === "visible" ? 1 : null',
    '(body:click)': 'this._handleBodyInteraction()',
    'aria-hidden': 'true',
  },
  imports: [NgClass, NgStyle],
})
export class NxTooltipComponent implements OnDestroy {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  /** The timeout ID of any current timer set to show the tooltip */
  private _showTimeoutId: number | null = null;

  /** The timeout ID of any current timer set to hide the tooltip */
  private _hideTimeoutId: number | null = null;

  /** Message to display in the tooltip */
  private _message!: string;

  set message(value: string) {
    this._message = value;
    this._cdr.markForCheck();
  }
  get message(): string {
    return this._message;
  }

  _visibility: TooltipVisibility = 'initial';

  /** Property watched by the animation framework to show or hide the tooltip */
  get visibility(): TooltipVisibility {
    return this._visibility;
  }

  private readonly _position = signal<TooltipPosition>('bottom');

  /** @docs-private */
  set position(value: TooltipPosition) {
    this._position.set(value);
    this._cdr.markForCheck();
  }

  /** @docs-private */
  get position() {
    return this._position();
  }

  _arrowStyle: { [key: string]: string } = {};

  /** @docs-private */
  set arrowStyle(value) {
    this._arrowStyle = value;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  get arrowStyle() {
    return this._arrowStyle;
  }

  /** @docs-private */
  get arrowClass(): string {
    return `nx-tooltip__arrow--${this.position}`;
  }

  /** @docs-private */
  protected readonly _svgPath = computed(() => {
    const isVertical = this._position() === 'left' || this._position() === 'right';
    if (this.isAllianzOne()) {
      return isVertical
        ? 'M0.88097 0.43185C0.94670 0.46407 0.94774 0.51684 0.88328 0.54970L0 1L0 0Z'
        : 'M0.56815 0.88097C0.53593 0.94670 0.48316 0.94774 0.45030 0.88328L0 0L1 0Z';
    }
    return isVertical ? 'M1 0.50980L0 0L0 1Z' : 'M0.50980 1L0 0L1 0Z';
  });

  /** Whether interactions on the page should close the tooltip */
  private _closeOnInteraction = false;

  /** Subject for notifying that the tooltip has been hidden from the view */
  private readonly _onHide = new Subject<void>();

  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly isAllianzOne = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    readonly elementRef: ElementRef,
  ) {}
  /**
   * Shows the tooltip with an aninxion originating from the provided origin
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
      this._hideTimeoutId = null;
    }

    this._showTimeoutId = window.setTimeout(() => {
      this._visibility = 'visible';
      this._showTimeoutId = null;
      this._liveAnnouncer.announce(this.message);
      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._cdr.markForCheck();
    }, delay);
  }

  /**
   * Begins the animation to hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the tooltip.
   */
  hide(delay: number): void {
    if (this._hideTimeoutId) {
      return;
    }
    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
      this._showTimeoutId = null;
    }

    this._hideTimeoutId = window.setTimeout(() => {
      this._visibility = 'hidden';
      this._hideTimeoutId = null;
      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._cdr.markForCheck();
    }, delay);
  }

  /** Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  /** Whether the tooltip is being displayed. */
  isVisible(): boolean {
    return this.visibility === 'visible';
  }

  /** Whether the tooltip should be rendered in DOM (for measurement or display) */
  protected shouldRender(): boolean {
    return this.visibility !== 'hidden';
  }

  /** Whether the tooltip started a delay to be shown/hidden */
  isDelayed(): boolean {
    return this._showTimeoutId !== null || this._hideTimeoutId !== null;
  }

  ngOnDestroy(): void {
    this._onHide.complete();
  }

  /**
   * Interactions on the HTML body should close the tooltip immediately.
   */
  _handleBodyInteraction(): void {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }

  protected onEnter(): void {
    this._closeOnInteraction = true;
  }

  protected onLeave(): void {
    this._onHide.next();
  }
}
