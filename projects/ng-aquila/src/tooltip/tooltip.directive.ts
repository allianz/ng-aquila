import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  FlexibleConnectedPositionStrategy,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  ScrollStrategy,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NxTooltipComponent } from './tooltip.component';

/**
 * Possible positions of the tooltip.
 */
export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * CSS class that will be attached to the overlay panel.
 * @docs-private
 */
export const NX_TOOLTIP_PANEL_CLASS = 'nx-tooltip-panel';

/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
export function getNxTooltipInvalidPositionError(position: string) {
  return Error(`Tooltip position "${position}" is invalid.`);
}

/** Default `nxTooltip` options that can be overridden. */
export interface NxTooltipDefaultOptions {

  /** The default delay in ms before showing the tooltip after show is called */
  showDelay: number;

  /** The default delay in ms before hiding the tooltip after hide is called */
  hideDelay: number;

  /** The default delay in ms before hiding the tooltip on touch devices */
  touchendHideDelay: number;

  /** The default position of the tooltip */
  position?: TooltipPosition;
}

/** Injection token to be used to override the default options for `nxTooltip`. */
export const NX_TOOLTIP_DEFAULT_OPTIONS =
    new InjectionToken<NxTooltipDefaultOptions>('nx-tooltip-default-options', {
      providedIn: 'root',
      factory: NX_TOOLTIP_DEFAULT_OPTIONS_FACTORY
    });

export function NX_TOOLTIP_DEFAULT_OPTIONS_FACTORY(): NxTooltipDefaultOptions {
  return {
    showDelay: 200,
    hideDelay: 200,
    touchendHideDelay: 1500,
  };
}

const fallbacks: ConnectionPositionPair[] = [
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',

  }
];

/**
 * Directive that attaches a tooltip to the host element.
 *
 */
@Directive({
  selector: '[nxTooltip]',
  exportAs: 'nxTooltip',
  host: {
    '(keydown)': '_handleKeydown($event)',
    '(touchend)': '_handleTouchend()',
  },
})
export class NxTooltipDirective implements OnDestroy, OnInit {
  _overlayRef: OverlayRef | null;
  _tooltipInstance: NxTooltipComponent | null;

  private _portal: ComponentPortal<NxTooltipComponent>;
  private _position: TooltipPosition = 'bottom';
  private _disabled: boolean = false;
  private _scrollStrategy: () => ScrollStrategy;
  private _embeddedViewRef: ComponentRef<NxTooltipComponent>;

  /** Allows the user to define the position of the tooltip relative to the parent element */
  @Input('nxTooltipPosition')
  get position(): TooltipPosition { return this._position; }
  set position(value: TooltipPosition) {
    if (value !== this._position) {
      this._position = value;

      if (this._overlayRef) {
        this._updatePosition();

        if (this._tooltipInstance) {
          this._tooltipInstance.position = this._position;
          this._tooltipInstance.show(0);
        }

        this._overlayRef.updatePosition();
      }
    }
  }

  /** Disables the display of the tooltip. */
  @Input('nxTooltipDisabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);

    // If tooltip is disabled, hide immediately.
    if (this._disabled) {
      this.hide(0);
    }
  }

  /** The default delay in ms before showing the tooltip after show is called */
  @Input('nxTooltipShowDelay') showDelay: number = this._defaultOptions.showDelay;

  /** The default delay in ms before hiding the tooltip after hide is called */
  @Input('nxTooltipHideDelay') hideDelay: number = this._defaultOptions.hideDelay;

  private _message: string = '';

  /** The message to be displayed in the tooltip */
  @Input('nxTooltip')
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message);

    // If the message is not a string (e.g. number), convert it to a string and trim it.
    this._message = value != null ? `${value}`.trim() : '';

    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._updateTooltipMessage();
      this._ariaDescriber.describe(this._elementRef.nativeElement, this.message);
    }
  }

  private _manualListeners = new Map<string, EventListenerOrEventListenerObject>();

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _scrollDispatcher: ScrollDispatcher,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone,
    platform: Platform,
    private _ariaDescriber: AriaDescriber,
    private _focusMonitor: FocusMonitor,
    @Optional() private _dir: Directionality,
    @Optional() @Inject(NX_TOOLTIP_DEFAULT_OPTIONS)
      private _defaultOptions: NxTooltipDefaultOptions) {

    this._scrollStrategy = this._overlay.scrollStrategies.reposition;
    const element: HTMLElement = _elementRef.nativeElement;

    // The mouse events shouldn't be bound on mobile devices, because they can prevent the
    // first tap from firing its click event or can cause the tooltip to open for clicks.
    if (!platform.IOS && !platform.ANDROID) {
      this._manualListeners
        .set('mouseenter', () => this.show())
        .set('mouseleave', () => this.hide());
    } else {
      // Fall back to showing on `touchstart`, otherwise
      // there's no way for the user to trigger the tooltip on a touch device.
      this._manualListeners.set('touchstart', () => this.show());
    }

    this._manualListeners.forEach((listener, event) => element.addEventListener(event, listener));

    _focusMonitor.monitor(_elementRef).pipe(takeUntil(this._destroyed)).subscribe(origin => {
      // Note that the focus monitor runs outside the Angular zone.
      if (!origin) {
        _ngZone.run(() => this.hide(0));
      } else if (origin === 'keyboard') {
        _ngZone.run(() => this.show());
      }
    });

    if (_defaultOptions && _defaultOptions.position) {
      this.position = _defaultOptions.position;
    }
  }

  /**
   * Setup styling-specific things
   */
  ngOnInit() {
    const element = this._elementRef.nativeElement;
    const elementStyle = element.style as CSSStyleDeclaration & {webkitUserDrag: string};
    const userSelect = element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA' ? '' : 'none';
    elementStyle.webkitUserSelect = elementStyle.userSelect = (elementStyle as any).msUserSelect = userSelect;
  }

  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }

    // Clean up the event listeners set in the constructor
    this._manualListeners.forEach((listener, event) => {
      this._elementRef.nativeElement.removeEventListener(event, listener);
    });
    this._manualListeners.clear();

    this._destroyed.next();
    this._destroyed.complete();

    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.message);
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
  show(delay: number = this.showDelay): void {
    if (this.disabled || !this.message || (this._isTooltipVisible() &&
      !this._tooltipInstance.isDelayed())) {
        return;
    }

    const overlayRef = this._createOverlay();

    this._detach();
    this._portal = this._portal || new ComponentPortal(NxTooltipComponent, this._viewContainerRef);
    this._embeddedViewRef = overlayRef.attach(this._portal);
    this._tooltipInstance = this._embeddedViewRef.instance;
    this._tooltipInstance.afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());
    this._updateTooltipMessage();
    this._tooltipInstance.show(delay);
  }

  /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
  hide(delay: number = this.hideDelay): void {
    if (this._tooltipInstance) {
      this._tooltipInstance.hide(delay);
    }
  }

  /** Shows/hides the tooltip */
  toggle(): void {
    this._isTooltipVisible() ? this.hide() : this.show();
  }

  /** Returns true if the tooltip is currently visible to the user */
  _isTooltipVisible(): boolean {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }

  /** Handles the keydown events on the host element. */
  _handleKeydown(e: KeyboardEvent) {
    if (this._isTooltipVisible() && e.keyCode === ESCAPE) {
      e.stopPropagation();
      this.hide(0);
    }
  }

  /** Handles the touchend events on the host element. */
  _handleTouchend() {
    this.hide(this._defaultOptions.touchendHideDelay);
  }

  /** Create the overlay config and position strategy */
  private _createOverlay(): OverlayRef {
    if (this._overlayRef && !!this._overlayRef.hostElement) {
      return this._overlayRef;
    }

    const scrollableAncestors =
        this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);

    // Create connected position strategy that listens for scroll events to reposition.
    const strategy = this._overlay.position()
                         .flexibleConnectedTo(this._elementRef)
                         .withLockedPosition(true)
                         .withFlexibleDimensions(false)
                         .withPush(true);

    strategy.withScrollableContainers(scrollableAncestors);

    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(change => {
      if (this._tooltipInstance) {

        const pair = change.connectionPair;

        this._ngZone.run(() => this._positionArrow(pair));

        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          // After position changes occur and the overlay is clipped by
          // a parent scrollable then close the tooltip.
          this._ngZone.run(() => this.hide(0));
        }
      }
    });

    this._overlayRef = this._overlay.create({
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: NX_TOOLTIP_PANEL_CLASS,
      scrollStrategy: this._scrollStrategy(),
      disposeOnNavigation: true
    });

    this._updatePosition();

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    return this._overlayRef;
  }

  /** Detaches the currently-attached tooltip. */
  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }

    this._tooltipInstance = null;
  }

  /** Updates the position of the current tooltip. */
  private _updatePosition() {
    const position =
        this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      {
        ...origin,
        ...overlay
      },
      ...fallbacks
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'left' -> 'right'`).
   */
  _getOrigin(): OriginConnectionPosition {
    const isLtr = !this._dir || this._dir.value === 'ltr';
    const position = this.position;
    let originPosition: OriginConnectionPosition;

    if (position === 'top' || position === 'bottom') {
      originPosition = {
        originX: 'center',
        originY: position
      };
    } else if (
      (position === 'left' && isLtr) ||
      (position === 'right' && !isLtr)) {
      originPosition = {originX: 'start', originY: 'center'};
    } else if (
      (position === 'right' && isLtr) ||
      (position === 'left' && !isLtr)) {
      originPosition = {originX: 'end', originY: 'center'};
    } else {
      throw getNxTooltipInvalidPositionError(position);
    }

    return originPosition;
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition(): OverlayConnectionPosition {
    const isLtr = !this._dir || this._dir.value === 'ltr';
    const position = this.position;
    let overlayPosition: OverlayConnectionPosition;

    if (position === 'top') {
      overlayPosition = {overlayX: 'center', overlayY: 'bottom'};
    } else if (position === 'bottom') {
      overlayPosition = {overlayX: 'center', overlayY: 'top'};
    } else if (
      (position === 'left' && isLtr) ||
      (position === 'right' && !isLtr)) {
      overlayPosition = {overlayX: 'end', overlayY: 'center'};
    } else if (
      (position === 'right' && isLtr) ||
      (position === 'left' && !isLtr)) {
      overlayPosition = {overlayX: 'start', overlayY: 'center'};
    } else {
      throw getNxTooltipInvalidPositionError(position);
    }

    return overlayPosition;
  }

  /** Updates the tooltip message and repositions the overlay according to the new message length */
  private _updateTooltipMessage() {
    // Must wait for the message to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of the text.
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;

      this._ngZone.onMicrotaskEmpty.asObservable().pipe(
        take(1),
        takeUntil(this._destroyed)
      ).subscribe(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      });
    }
  }

  private _positionArrow(pair: ConnectionPositionPair) {
    const parentElementPositionX = this._elementRef.nativeElement.getBoundingClientRect().left;
    const parentElementWidth = this._elementRef.nativeElement.getBoundingClientRect().width / 2;
    const overlayElementLeftOffset = this._overlayRef
      .overlayElement
      .getBoundingClientRect()
      .left;

    // calculation for x position of the parent element. In this case, overlay left offset is the one thing to consider.
    const targetPosition = (parentElementPositionX + parentElementWidth) - (overlayElementLeftOffset);

    if (pair.originX === pair.overlayX) {
      const direction = 'left';
      const arrowStyle = {};

      arrowStyle[direction] = targetPosition + 'px';
      this._tooltipInstance.arrowStyle = arrowStyle;
    }

    if (pair.originX === 'end' && pair.overlayX === 'start') {
      this._tooltipInstance.arrowStyle = {
        top: '50%',
      };
      this._tooltipInstance.position = 'right';
    } else if (pair.originY === 'bottom' && pair.overlayY === 'top') {
      this._tooltipInstance.arrowStyle = {
        left: targetPosition + 'px',
      };
      this._tooltipInstance.position = 'bottom';
    } else if (pair.originX === 'start' && pair.overlayX === 'end') {
      this._tooltipInstance.arrowStyle = {
        top: '50%',
      };
      this._tooltipInstance.position = 'left';
    } else if (pair.originY === 'top' && pair.overlayY === 'bottom') {
      this._tooltipInstance.arrowStyle = {
        left: targetPosition + 'px',
      };
      this._tooltipInstance.position = 'top';
    }
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
