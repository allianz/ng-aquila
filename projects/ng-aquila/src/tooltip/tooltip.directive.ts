import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
    ConnectionPositionPair,
    FlexibleConnectedPositionStrategy,
    HorizontalConnectionPos,
    OriginConnectionPosition,
    Overlay,
    OverlayConnectionPosition,
    OverlayRef,
    ScrollStrategy,
    VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ComponentRef, Directive, ElementRef, Inject, InjectionToken, Input, NgZone, OnDestroy, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { NxTooltipComponent } from './tooltip.component';

const BASE_OFFSET = 12;

/**
 * Possible positions of the tooltip.
 */
export type TooltipPosition = TooltipVerticalPosition | TooltipHorizontalPosition;
export type TooltipHorizontalPosition = 'left' | 'right';
export type TooltipVerticalPosition = 'top' | 'bottom';

/** Injection token that determines the scroll handling while a tooltip is open. */
export const NX_TOOLTIP_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-tooltip-scroll-strategy');

/** @docs-private */
export function NX_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_TOOLTIP_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_TOOLTIP_SCROLL_STRATEGY,
    useFactory: NX_TOOLTIP_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

/**
 * CSS class that will be attached to the overlay panel.
 * @docs-private
 */
export const NX_TOOLTIP_PANEL_CLASS = 'nx-tooltip-panel';

/**
 * Creates an error to be thrown if the user provided an invalid tooltip position.
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
export const NX_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken<NxTooltipDefaultOptions>('nx-tooltip-default-options', {
    providedIn: 'root',
    factory: NX_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
});

export function NX_TOOLTIP_DEFAULT_OPTIONS_FACTORY(): NxTooltipDefaultOptions {
    return {
        showDelay: 200,
        hideDelay: 200,
        touchendHideDelay: 1500,
    };
}

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
    _overlayRef!: OverlayRef | null;
    _tooltipInstance!: NxTooltipComponent | null;

    private _portal!: ComponentPortal<NxTooltipComponent>;
    private _embeddedViewRef!: ComponentRef<NxTooltipComponent>;
    private readonly _possibleTooltipPositions: TooltipPosition[] = ['bottom', 'top', 'left', 'right'];

    /** Allows the user to define the position of the tooltip relative to the parent element */
    @Input('nxTooltipPosition') set position(value: TooltipPosition) {
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
    get position(): TooltipPosition {
        return this._position;
    }
    private _position: TooltipPosition = 'bottom';

    /** Disables the display of the tooltip. */
    @Input('nxTooltipDisabled') set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);

        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /**
     * Allow selection of text within tooltip trigger.
     *
     * NOTE: inputs and textareas always remain selectable, ignoring this input.
     */
    @Input('nxTooltipSelectable') set selectable(value: BooleanInput) {
        const oldValue = this._selectable;
        this._selectable = coerceBooleanProperty(value);
        if (this._selectable !== oldValue) {
            this._updateSelectabilityStyles();
        }
    }
    get selectable(): boolean {
        return this._selectable;
    }
    private _selectable = false;

    /** The default delay in ms before showing the tooltip after show is called */
    @Input('nxTooltipShowDelay') showDelay: number = this._defaultOptions!.showDelay;

    /** The default delay in ms before hiding the tooltip after hide is called */
    @Input('nxTooltipHideDelay') hideDelay: number = this._defaultOptions!.hideDelay;

    /** The message to be displayed in the tooltip */
    @Input('nxTooltip') set message(value: string) {
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
    get message(): string {
        return this._message;
    }
    private _message = '';

    /** Strategy factory that will be used to handle scrolling while the tooltip panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    private readonly _manualListeners = new Map<string, EventListenerOrEventListenerObject>();

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _overlay: Overlay,
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _scrollDispatcher: ScrollDispatcher,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _ngZone: NgZone,
        platform: Platform,
        private readonly _ariaDescriber: AriaDescriber,
        private readonly _focusMonitor: FocusMonitor,
        @Optional() private readonly _dir: Directionality | null,
        @Optional() @Inject(NX_TOOLTIP_DEFAULT_OPTIONS) private readonly _defaultOptions: NxTooltipDefaultOptions | null,
        @Inject(NX_TOOLTIP_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
    ) {
        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(this._dirChangeHandler.bind(this));

        const element: HTMLElement = _elementRef.nativeElement;

        // The mouse events shouldn't be bound on mobile devices, because they can prevent the
        // first tap from firing its click event or can cause the tooltip to open for clicks.
        if (!platform.IOS && !platform.ANDROID) {
            this._manualListeners.set('mouseenter', () => this.show()).set('mouseleave', () => this.hide());
        } else {
            // Fall back to showing on `touchstart`, otherwise
            // there's no way for the user to trigger the tooltip on a touch device.
            this._manualListeners.set('touchstart', () => this.show());
        }

        this._manualListeners.forEach((listener, event) => element.addEventListener(event, listener));

        _focusMonitor
            .monitor(_elementRef)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
                // Note that the focus monitor runs outside the Angular zone.
                if (!origin) {
                    _ngZone.run(() => this.hide(0));
                } else if (origin === 'keyboard') {
                    _ngZone.run(() => this.show());
                }
            });

        if (_defaultOptions?.position) {
            this.position = _defaultOptions.position;
        }
    }

    ngOnInit(): void {
        this._updateSelectabilityStyles();
    }

    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy(): void {
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
        if (this.disabled || !this.message || (this._isTooltipVisible() && !this._tooltipInstance?.isDelayed())) {
            return;
        }

        const overlayRef = this._createOverlay();

        this._detach();
        this._portal = this._portal || new ComponentPortal(NxTooltipComponent, this._viewContainerRef);
        this._embeddedViewRef = overlayRef.attach(this._portal);
        this._tooltipInstance = this._embeddedViewRef.instance;
        this._tooltipInstance
            .afterHidden()
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
        this.hide(this._defaultOptions?.touchendHideDelay);
    }

    /**
     * Setup styling-specific things.
     */
    _updateSelectabilityStyles(): void {
        const element = this._elementRef.nativeElement;
        const elementStyle = element.style as CSSStyleDeclaration & { webkitUserDrag: string };
        const isSelectable = element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA' || this._selectable;
        const userSelect = isSelectable ? 'auto' : 'none';
        elementStyle.webkitUserSelect = elementStyle.userSelect = (elementStyle as any).msUserSelect = userSelect;
    }

    /** Create the overlay config and position strategy */
    private _createOverlay(): OverlayRef {
        if (this._overlayRef && !!this._overlayRef.hostElement) {
            return this._overlayRef;
        }

        const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);

        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this._overlay.position().flexibleConnectedTo(this._elementRef).withLockedPosition(true).withFlexibleDimensions(false).withPush(true);

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
            direction: this._dir?.value || 'ltr',
            positionStrategy: strategy,
            panelClass: NX_TOOLTIP_PANEL_CLASS,
            scrollStrategy: this._scrollStrategyFactory(),
            disposeOnNavigation: true,
        });

        this._updatePosition();

        this._overlayRef
            .detachments()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._detach());

        return this._overlayRef;
    }

    /** Detaches the currently-attached tooltip. */
    private _detach() {
        if (this._overlayRef?.hasAttached()) {
            this._overlayRef.detach();
        }

        this._tooltipInstance = null;
    }

    /** Updates the position of the current tooltip. */
    private _updatePosition() {
        if (!this._overlayRef) {
            return;
        }
        const position = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const origin = this._getOrigin(this.position);
        const overlay = this._getOverlayPosition(this.position);
        const offset = this._getOffset(this.position);
        const fallbacks = this._getFallbackPositions(this.position);

        position.withPositions([
            {
                ...origin,
                ...overlay,
                ...offset,
            },
            ...fallbacks,
        ]);
    }

    /**
     * Returns the origin position based on the user's position preference.
     */
    _getOrigin(position: TooltipPosition): OriginConnectionPosition {
        switch (position) {
            case 'top':
            case 'bottom': {
                return {
                    originX: 'center',
                    originY: position,
                };
            }
            case 'left': {
                return {
                    originX: this._isLtr ? 'start' : 'end',
                    originY: 'center',
                };
            }
            case 'right': {
                return {
                    originX: this._isLtr ? 'end' : 'start',
                    originY: 'center',
                };
            }
            default: {
                throw getNxTooltipInvalidPositionError(position);
            }
        }
    }

    /** Returns the overlay position based on the user's preference */
    _getOverlayPosition(position: TooltipPosition): OverlayConnectionPosition {
        switch (position) {
            case 'top':
            case 'bottom': {
                return {
                    overlayX: 'center',
                    overlayY: this._getInversePosition(position) as VerticalConnectionPos,
                };
            }
            case 'left': {
                return {
                    overlayX: this._isLtr ? 'end' : 'start',
                    overlayY: 'center',
                };
            }
            case 'right': {
                return {
                    overlayX: this._isLtr ? 'start' : 'end',
                    overlayY: 'center',
                };
            }
            default: {
                throw getNxTooltipInvalidPositionError(position);
            }
        }
    }

    /** Returns the overlay offset required by the user's position preference */
    private _getOffset(position: TooltipPosition) {
        switch (position) {
            case 'top': {
                return {
                    offsetY: BASE_OFFSET * -1,
                };
            }
            case 'bottom': {
                return {
                    offsetY: BASE_OFFSET,
                };
            }
            case 'left': {
                return {
                    offsetX: BASE_OFFSET * -1,
                };
            }
            case 'right': {
                return {
                    offsetX: BASE_OFFSET,
                };
            }
            default: {
                throw getNxTooltipInvalidPositionError(position);
            }
        }
    }

    /** Returns the opposite position, using aquila tooltip position naming: top, right, bottom, left */
    private _getInverseTooltipPosition(position: TooltipPosition): TooltipPosition {
        const tooltopPositionPairs = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        };
        return tooltopPositionPairs[position] as TooltipPosition;
    }

    /** Returns the opposite position, using angular position naming: top, bottom, start, end, center */
    private _getInversePosition(position: string): VerticalConnectionPos | HorizontalConnectionPos {
        const positionPairs: { [k: string]: VerticalConnectionPos | HorizontalConnectionPos } = {
            top: 'bottom',
            bottom: 'top',
            start: 'end',
            end: 'start',
            center: 'center',
        };
        return positionPairs[position];
    }

    /**
     * Returns an array of fallback positions for tooltip, following the algoritm:
     * 1) Slightly alternate preferred position if applicable. I.e. for 'top' try 'top-start' and 'top-end' positioning.
     * 2) Try the opposite position, i.e. for 'top' try 'bottom'.
     * 3) Slightly alternate opposite position, i.e. 'bottom-start', 'bottom-end'.
     * 4) All remaining positions from positions list.
     */
    private _getFallbackPositions(position: TooltipPosition, possiblePositions: TooltipPosition[] = this._possibleTooltipPositions): ConnectionPositionPair[] {
        if (!position) {
            return [];
        }
        const remainigPositions = possiblePositions.filter(possiblePosition => possiblePosition !== position);
        let fallbackPositions: ConnectionPositionPair[] = [];
        switch (position) {
            case 'top':
            case 'bottom': {
                fallbackPositions = this._getVerticalFallbackPositionPairs(position);
                break;
            }
            case 'left':
            case 'right': {
                fallbackPositions = this._getHorizontalFallbackPositionPairs(position);
                break;
            }
        }

        const inversePosition = this._getInverseTooltipPosition(position);
        const nextFallbackPosition = remainigPositions.includes(inversePosition) ? inversePosition : possiblePositions[0];
        return [...fallbackPositions, ...this._getFallbackPositions(nextFallbackPosition, remainigPositions)];
    }

    /** Calculates fallbacks for vertical tooltip positioning */
    private _getVerticalFallbackPositionPairs(position: TooltipVerticalPosition): ConnectionPositionPair[] {
        const isSelectedPosition = position === this.position;
        const verticalFallbackPositionPairs: ConnectionPositionPair[] = [];
        const basePositionPair = {
            ...this._getOrigin(position),
            ...this._getOverlayPosition(position),
            ...this._getOffset(position),
        };

        if (!isSelectedPosition) {
            // HINT: selected position matches basePosition, so we don't need to repeat it in fallback
            verticalFallbackPositionPairs.push(basePositionPair);
        }
        verticalFallbackPositionPairs.push(
            {
                ...basePositionPair,
                originX: 'start',
                overlayX: 'start',
            },
            {
                ...basePositionPair,
                originX: 'end',
                overlayX: 'end',
            },
        );
        return verticalFallbackPositionPairs;
    }

    /** Calculates fallbacks for horizontal tooltip positioning */
    private _getHorizontalFallbackPositionPairs(position: TooltipHorizontalPosition): ConnectionPositionPair[] {
        const offset = this._getOffset(position);

        return [
            {
                ...this._getOrigin(position),
                ...this._getOverlayPosition(position),
                ...offset,
            },
        ];
    }

    /** Updates the tooltip message and repositions the overlay according to the new message length */
    private _updateTooltipMessage() {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this._tooltipInstance) {
            this._tooltipInstance.message = this.message;

            this._ngZone.onMicrotaskEmpty
                .asObservable()
                .pipe(take(1), takeUntil(this._destroyed))
                .subscribe(() => {
                    if (this._tooltipInstance && this._overlayRef) {
                        this._overlayRef.updatePosition();
                    }
                });
        }
    }

    private _positionArrow(pair: ConnectionPositionPair) {
        if (!this._overlayRef || !this._tooltipInstance) {
            return;
        }
        const parentElementPositionX = this._elementRef.nativeElement.getBoundingClientRect().left;
        const parentElementWidth = this._elementRef.nativeElement.getBoundingClientRect().width / 2;
        const overlayElementLeftOffset = this._overlayRef.overlayElement.getBoundingClientRect().left;

        // calculation for x position of the parent element. In this case, overlay left offset is the one thing to consider.
        const targetPosition = parentElementPositionX + parentElementWidth - overlayElementLeftOffset;

        if (pair.originX === pair.overlayX) {
            const arrowStyle = { left: targetPosition + 'px' };
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

    _dirChangeHandler(value: Direction) {
        if (this._overlayRef) {
            this.hide(0);
            this._overlayRef.setDirection(value);
            this._updatePosition();
        }
    }

    get _isLtr(): boolean {
        return !this._dir || this._dir.value === 'ltr';
    }
}
