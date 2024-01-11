import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import {
    ConnectionPositionPair,
    FlexibleConnectedPositionStrategy,
    HorizontalConnectionPos,
    OriginConnectionPosition,
    Overlay,
    OverlayConfig,
    OverlayConnectionPosition,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy,
    VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    ViewContainerRef,
} from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NxPopoverComponent } from './popover.component';

export declare type PopoverVerticalDirection = 'top' | 'bottom';
export declare type PopoverHorizontalDirection = 'left' | 'right';
export declare type PopoverDirection = PopoverHorizontalDirection | PopoverVerticalDirection;
export declare type PopoverTriggerType = 'click' | 'hover' | 'manual';
export declare type PopoverTriggerScrollStrategy = 'close' | 'reposition';

let nextId = 0;
const BASE_OFFSET = 16;

/** Injection token that determines the scroll handling while a popover is open. */
export const NX_POPOVER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-popover-scroll-strategy');

/** @docs-private */
export function NX_POPOVER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
}

/** @docs-private */
export const NX_POPOVER_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_POPOVER_SCROLL_STRATEGY,
    useFactory: NX_POPOVER_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

/** Default `nxPopover` options that can be overridden. */
export interface PopoverDefaultOptions {
    /** Default width of popover */
    popoverWidth?: string | undefined;

    /** Default max-width of popover */
    popoverMaxWidth?: string | undefined;
}

/** Injection token to be used to override the default options for `nxPopover`. */
export const POPOVER_DEFAULT_OPTIONS = new InjectionToken<PopoverDefaultOptions>('popover-default-options', {
    providedIn: 'root',
    factory: POPOVER_DEFAULT_OPTIONS_FACTORY,
});

export function POPOVER_DEFAULT_OPTIONS_FACTORY(): PopoverDefaultOptions {
    return {
        popoverWidth: undefined,
        popoverMaxWidth: undefined,
    };
}

/**
 * Creates an error to be thrown if the user provided an invalid popover direction.
 * @docs-private
 */
export function getNxPopoverInvalidDirectionError(direction: string) {
    return Error(`Popover direction "${direction}" is invalid.`);
}

@Directive({
    selector: '[nxPopoverTriggerFor]',
    exportAs: 'nxPopoverTrigger',
    host: {
        '(click)': 'handleClick()',
        '[attr.aria-haspopup]': 'true',
        '[attr.aria-expanded]': 'isOpen',
        '[attr.aria-describedby]': 'isOpen ? id : null',
    },
})
export class NxPopoverTriggerDirective implements AfterViewInit, OnDestroy {
    private overlayRef!: OverlayRef | null;
    private portal!: TemplatePortal;
    private readonly _overlayDestroyed = new Subject<void>();
    private _positionStrategy!: PositionStrategy;
    private _embeddedViewRef!: EmbeddedViewRef<any> | null;
    /** The class that traps and manages focus within the popover. */
    private _focusTrap!: ConfigurableFocusTrap;
    /** Element that was focused before the Popover was opened. Save this to restore upon close. */
    private _elementFocusedBeforePopoverWasOpened: HTMLElement | null = null;
    private readonly _manualListeners = new Map<string, EventListenerOrEventListenerObject>();
    private readonly _possiblePopoverDirections: PopoverDirection[] = ['bottom', 'top', 'left', 'right'];

    closeOnLeftViewport = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    this._ngZone.run(() => this.overlayRef?.detach());
                }
                this.closeOnLeftViewport.disconnect();
            });
        },
        { threshold: 0.2 },
    );

    /** @docs-private */
    id = 'nx-popover-' + nextId++;

    /** An event is emitted if the visibility status of the popover changes. */
    @Output('nxPopoverShowChange') readonly changeShow = new EventEmitter<boolean>();

    /** Whether to show or hide the popover. */
    @Input('nxPopoverShow') set show(value: BooleanInput) {
        value = coerceBooleanProperty(value);
        if (this._show !== value) {
            this._show = value;
            if (this._show) {
                if (this.popover.templateRef) {
                    this.openPopover();
                } else {
                    setTimeout(() => {
                        this.openPopover();
                    });
                }
            } else {
                this.closePopover();
            }
        }
    }
    get show() {
        return this._show;
    }
    private _show = false;

    /** Whether to show a close button. By default a close icon is only shown for trigger type click. Can't be used for trigger type hover. */
    @Input('nxPopoverCloseable') set closeable(value: BooleanInput) {
        this._closeable = coerceBooleanProperty(value);

        if (this.popover) {
            this.popover.showCloseButton = this.isCloseable();
        }
    }
    get closeable(): boolean {
        return this._closeable!;
    }
    private _closeable: boolean | null = null;

    /** Whether the popover should be closed on click outside of the popover in the trigger modes 'manual' and 'click'. */
    @Input() set closeOnClickOutside(value: BooleanInput) {
        this._closeOnClickOutside = coerceBooleanProperty(value);
    }
    get closeOnClickOutside(): boolean {
        return this._closeOnClickOutside;
    }
    private _closeOnClickOutside = true;

    /** Whether to show the popover arrow. By default set to true */
    @Input() set hidePopoverArrow(value: BooleanInput) {
        this._hidearrow = coerceBooleanProperty(value);

        if (this.popover) {
            this.popover.hidePopoverArrow = this._hidearrow;
        }
    }
    get hidePopoverArrow(): boolean {
        return this._hidearrow!;
    }
    private _hidearrow: boolean | null = null;

    /** Popover width */
    @Input('nxPopoverWidth') set popoverWidth(value: string | undefined) {
        this._popoverWidth = value;
    }
    get popoverWidth(): string | undefined {
        return this._popoverWidth || this._defaultOptions?.popoverWidth;
    }
    private _popoverWidth: string | undefined;

    /** Popover max-width */
    @Input('nxPopoverMaxWidth') set popoverMaxWidthh(value: string | undefined) {
        this._popoverMaxWidth = value;
    }
    get popoverMaxWidth(): string | undefined {
        return this._popoverMaxWidth || this._defaultOptions?.popoverMaxWidth;
    }
    private _popoverMaxWidth: string | undefined;

    /** Links the trigger with the popover to open. */
    @Input('nxPopoverTriggerFor') popover!: NxPopoverComponent;

    /** Sets the desired direction to open the popover. E.g., right, left, bottom, top */
    @Input('nxPopoverDirection') direction: PopoverDirection = 'right';

    /** Whether the popover will be opened automatically. */
    @Input('nxPopoverInitialVisible') popoverInitialVisible = false;

    /** An event is emitted when the visibility of the popopver changes. */
    @Input('nxPopoverVisibleChange') visibleChange = new EventEmitter<boolean>(); // TODO this should be an output

    /** Whether the popover opens in modal state. */
    @Input('nxPopoverModal') set modal(value: BooleanInput) {
        this._modal = coerceBooleanProperty(value);
    }
    get modal(): boolean {
        return this._modal;
    }
    private _modal = false;

    // If nxPopoverTrigger equals to 'hover' the popover opens on mouseenter and closes on mouseout.
    // If nxPopoverTrigger equals to 'click' the popover opens on click and closes on a click of the close icon or pressing ESC key.
    // If nxPopoverTrigger equals to 'manual' the popover opens only when programatically requested.
    /** Sets the way to trigger the popover. Options are hover, click, manual */
    @Input('nxPopoverTrigger') trigger: PopoverTriggerType = 'click';

    /** Sets the scroll strategy. 'close' closes the popover on scroll while 'reposition' scrolls the popover with the origin. */
    @Input('nxPopoverScrollStrategy') set scrollStrategy(value: PopoverTriggerScrollStrategy | null | undefined) {
        if (this.#scrollStrategy !== value) {
            this.#scrollStrategy = value;
            this._scrollStrategyFactory = value ? this.getScrollStrategyFactory(value) : this._defaultScrollStrategyFactory;
            this._cdr.markForCheck();
        }
    }
    get scrollStrategy(): PopoverTriggerScrollStrategy | null | undefined {
        return this.#scrollStrategy;
    }
    #scrollStrategy?: PopoverTriggerScrollStrategy | null;

    private readonly _destroyed = new Subject<void>();

    /** Strategy factory that will be used to handle scrolling while the popover panel is open. */
    private _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    constructor(
        private readonly overlay: Overlay,
        private readonly elementRef: ElementRef,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly eventManager: EventManager,
        private readonly _focusTrapFactory: ConfigurableFocusTrapFactory,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _ngZone: NgZone,
        private readonly _platform: Platform,
        @Optional() private readonly _dir: Directionality | null,
        @Optional() @Inject(POPOVER_DEFAULT_OPTIONS) private readonly _defaultOptions: PopoverDefaultOptions | null,
        @Inject(NX_POPOVER_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        const element: HTMLElement = elementRef.nativeElement;
        if (!this._platform.IOS && !this._platform.ANDROID) {
            this._manualListeners
                .set('mouseenter', () => {
                    if (this.trigger === 'hover') {
                        this.show = true;
                    }
                })
                .set('mouseleave', () => {
                    if (this.trigger === 'hover') {
                        this.show = false;
                    }
                })
                .set('keydown', (event: any) => {
                    switch (event.keyCode) {
                        case SPACE:
                            if (event?.target?.tagName !== 'BUTTON') {
                                event?.preventDefault();
                            }
                            this.handleClick();
                            break;
                        case ENTER:
                            event?.preventDefault();
                            this.handleClick();
                            break;
                        case TAB:
                            if (this.trigger === 'hover') {
                                this.show = !this.isOpen;
                            }
                            break;
                        default:
                    }
                });
        } else {
            this._manualListeners.set('touchstart', () => {
                if (this.trigger === 'hover') {
                    this.show = true;
                }
            });
        }

        this._manualListeners.forEach((listener, event) => element.addEventListener(event, listener));

        this._focusMonitor
            .monitor(element, true)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
                if (origin === 'keyboard' && this.trigger === 'hover') {
                    this._ngZone.run(() => (this.show = true));
                }
            });

        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(this._dirChangeHandler.bind(this));
    }

    ngAfterViewInit(): void {
        this.popover.id = this.id;

        this.popover.closeButtonClick.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.show = false;
        });

        if (this.popoverInitialVisible || this._show) {
            this.show = true;
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this.show = false;
        this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        // Clean up the event listeners set in the constructor
        this._manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this._manualListeners.clear();
        this._overlayDestroyed.next();
        this._overlayDestroyed.complete();
    }

    /** @docs-private */
    get isOpen() {
        return this.overlayRef && this.createOverlay().hasAttached();
    }

    /** @docs-private */
    isCloseable(): boolean {
        return (this.trigger === 'click' && this._closeable === null) || (!!this._closeable && this.trigger !== 'hover');
    }

    /** Update the popover with the given position strategy. */
    updatePosition() {
        if (this._positionStrategy) {
            this._positionStrategy.apply();
        }
    }

    /** @docs-private */
    handleClick() {
        if (this.trigger === 'click') {
            this.show = !this.isOpen;
        } else if (this.trigger === 'hover') {
            this.show = true;
        }
    }

    /** Open the popover instance. */
    open(): void {
        this.show = true;
    }

    /** Close the popover instance. */
    close(): void {
        this.show = false;
    }

    /** Toggle the popover instance. */
    toggle(): void {
        this.show = !this.show;
    }

    private openPopover(): void {
        if (!this.createOverlay().hasAttached()) {
            this.setPopoverProperties();

            this._embeddedViewRef = this.createOverlay().attach(this.portal);

            if (this.trigger !== 'hover') {
                const element = this.getPopoverContainer()!;

                this._focusTrap = this._focusTrapFactory.create(element);

                this._elementFocusedBeforePopoverWasOpened = this.elementRef.nativeElement;
                this._focusMonitor.monitor(element.querySelector('.nx-popover__content')!);
                const closeIcon: HTMLElement = element.querySelector('.nx-popover__close-icon')!;

                if (closeIcon) {
                    this._focusMonitor.monitor(closeIcon);
                }

                setTimeout(() => {
                    // prevent page scroll, when it lose focus from trigger element.
                    this._autoFocusFirstTabbableElement(element);
                });

                // attach a close click listener only if it makes sense (ignore it on hover e.g.)
                if (this.closeOnClickOutside) {
                    this.waitForClose();
                }
            }
        }
    }

    /** Sets some popover component properties that are needed to render it properly. */
    private setPopoverProperties() {
        this.popover.triggerType = this.trigger;
        this.popover.showCloseButton = this.isCloseable();
    }

    /**
     * Autofocus the first tabbable element inside of the popover, if there is not a tabbable element,
     * focus the popover instead.
     */
    private _autoFocusFirstTabbableElement(element: HTMLElement) {
        this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
            // If we didn't find any focusable elements inside the popover, focus the
            // container so the user can't tab into other elements behind it.
            if (!hasMovedFocus) {
                element.focus();
            }
        });
    }

    // detaches the overlay
    // we are listening to the detachments observable which will then emit the nxClosed event
    // on the popover component
    private closePopover(): void {
        if (this.overlayRef!.hasAttached()) {
            if (this.trigger !== 'hover') {
                const element = this.getPopoverContainer();
                this._focusMonitor.stopMonitoring(element!.querySelector('.nx-popover__content')!);
                this._focusMonitor.stopMonitoring(element!.querySelector('.nx-popover__close-icon')!);

                setTimeout(() => {
                    this._returnFocusAfterPopover();
                });
            }

            this.overlayRef!.detach();
            this._embeddedViewRef = null;

            if (this._focusTrap) {
                this._focusTrap.destroy();
            }
        }
    }

    private getScrollStrategyFactory(scrollStrategy: PopoverTriggerScrollStrategy): () => ScrollStrategy {
        switch (scrollStrategy) {
            case 'reposition':
                return this.overlay.scrollStrategies.reposition;
            default:
                return this.overlay.scrollStrategies.close;
        }
    }

    private createOverlay(): OverlayRef {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.popover.templateRef, this.viewContainerRef);
            const overlayState = new OverlayConfig();
            overlayState.width = this.popoverWidth;
            overlayState.maxWidth = this.popoverMaxWidth;
            overlayState.positionStrategy = this.getPosition();
            this._positionStrategy = overlayState.positionStrategy;

            overlayState.scrollStrategy = this._scrollStrategyFactory();

            overlayState.scrollStrategy.enable();
            overlayState.direction = this._dir?.value || 'ltr';

            if (this._modal) {
                overlayState.hasBackdrop = true;
            }

            this.overlayRef = this.overlay.create(overlayState);
            this.subscribeToPositions(overlayState.positionStrategy as FlexibleConnectedPositionStrategy);
            this._subscribeToAttach();
            this._subscribeToDetach();
            this._subscribeToKeypress();

            if (this._modal && this._closeOnClickOutside) {
                this._subscribeToBackdropClick();
            }
        }
        return this.overlayRef;
    }

    private subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
        position.positionChanges.pipe(takeUntil(this._overlayDestroyed)).subscribe(change => {
            const pair = change.connectionPair;
            this.positionOverlay(pair);
            this.positionArrow(pair);

            this.closeOnLeftViewport.observe(this.elementRef.nativeElement);

            // These position changes arrive too late,
            // We have to trigger the change detection manually
            // as it's detached from any render hierarchy
            // and only updated by the overlay when attached.
            if (this._embeddedViewRef && !this._embeddedViewRef.destroyed) {
                this._embeddedViewRef.detectChanges();
            }
        });
    }

    // for modal popovers close the popover on backdrop clicks
    private _subscribeToBackdropClick() {
        this.overlayRef!.backdropClick()
            .pipe(takeUntil(this._overlayDestroyed))
            .subscribe(event => {
                this.show = false;
            });
    }

    // Emit the nxClosed and the show status change event on the popover component when the overlay detaches
    private _subscribeToDetach() {
        this.overlayRef!.detachments()
            .pipe(takeUntil(this._overlayDestroyed))
            .subscribe(data => {
                // This is an exception: when the popover is closed by a scrolling event,
                // then only the detached method is called but the show state variable remains unchanged.
                if (this.show) {
                    this.show = false;
                }
                this.changeShow.emit(this._show);
                this.popover.emitClosedEvent();
            });
    }

    private _subscribeToAttach() {
        this.overlayRef!.attachments()
            .pipe(takeUntil(this._overlayDestroyed))
            .subscribe(data => {
                this.changeShow.emit(this._show);
            });
    }

    private _subscribeToKeypress() {
        this.overlayRef!.keydownEvents()
            .pipe(
                filter(event => event.keyCode === ESCAPE),
                takeUntil(this._overlayDestroyed),
            )
            .subscribe(event => {
                if (this.isOpen) {
                    this.show = false;
                }
            });
    }

    // subscribe to document clicks when trigger='click' to close the popover on clicks on the background
    private waitForClose() {
        return this.overlayRef!.outsidePointerEvents()
            .pipe(
                map(event => event.target),
                filter(target => !this.elementRef.nativeElement.contains(target)),
                takeUntil(this.popover.closed),
            )
            .subscribe(() => {
                this.show = false;
            });
    }

    private positionOverlay(pair: ConnectionPositionPair) {
        if (pair.originX === 'end' && pair.overlayX === 'start') {
            this.popover.direction = this.isRtl ? 'left' : 'right';
        } else if (pair.originY === 'bottom' && pair.overlayY === 'top') {
            this.popover.direction = 'bottom';
        } else if (pair.originX === 'start' && pair.overlayX === 'end') {
            this.popover.direction = this.isRtl ? 'right' : 'left';
        } else if (pair.originY === 'top' && pair.overlayY === 'bottom') {
            this.popover.direction = 'top';
        }
    }

    private positionArrow(pair: ConnectionPositionPair) {
        const parentElementPositionX = this.elementRef.nativeElement.getBoundingClientRect().left;
        const parentElementWidth = this.elementRef.nativeElement.getBoundingClientRect().width / 2;
        const parentElementLeftOffset = this.overlayRef!.overlayElement.parentElement!.offsetLeft;
        const overlayElementLeftOffset = this.overlayRef!.overlayElement.offsetLeft;

        // calculation for x position of the parent element. In this case, overlay left offset is the one thing to consider.
        const targetPosition = parentElementPositionX + parentElementWidth - (parentElementLeftOffset + overlayElementLeftOffset);
        if (pair.originX === pair.overlayX) {
            const direction = 'left';
            const arrowStyle = { left: '0' };

            arrowStyle[direction] = targetPosition + 'px';
            this.popover.arrowStyle = arrowStyle;
        }
        if ((pair.originY === 'bottom' || pair.originY === 'top') && pair.overlayX === 'center') {
            this.popover.arrowStyle = { left: targetPosition + 'px' };
        }

        if ((pair.originX === 'end' || pair.originX === 'start') && pair.overlayY === 'center') {
            this.popover.arrowStyle = { top: '50%' };
        }
    }

    private getPosition(): FlexibleConnectedPositionStrategy {
        const origin = this._getOrigin(this.direction);
        const overlay = this._getOverlayPosition(this.direction);
        const offset = this._getOffset(this.direction);
        const fallbacks = this._getFallbackPositions(this.direction);
        return this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withPositions([
                {
                    ...origin,
                    ...overlay,
                    ...offset,
                },
                ...fallbacks,
            ])
            .withFlexibleDimensions(false);
    }

    /** Returns the focus to the element focused before the Popover was open. */
    private _returnFocusAfterPopover() {
        const toFocus = this._elementFocusedBeforePopoverWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    }

    /** Returns the main popover container of the injected content. */
    private getPopoverContainer(): HTMLElement | null {
        return this.overlayRef!.overlayElement.querySelector('.nx-popover');
    }

    /**
     * Returns the origin position based on the user's direction preference.
     */
    _getOrigin(direction: PopoverDirection): OriginConnectionPosition {
        switch (direction) {
            case 'top':
            case 'bottom': {
                return {
                    originX: 'center',
                    originY: direction,
                };
            }
            case 'left': {
                return {
                    originX: this.isRtl ? 'end' : 'start',
                    originY: 'center',
                };
            }
            case 'right': {
                return {
                    originX: this.isRtl ? 'start' : 'end',
                    originY: 'center',
                };
            }
            default: {
                throw getNxPopoverInvalidDirectionError(direction);
            }
        }
    }

    /** Returns the overlay position based on the user's direction preference */
    _getOverlayPosition(direction: PopoverDirection): OverlayConnectionPosition {
        switch (direction) {
            case 'top':
            case 'bottom': {
                return {
                    overlayX: 'center',
                    overlayY: this._getInversePosition(direction) as VerticalConnectionPos,
                };
            }
            case 'left': {
                return {
                    overlayX: this.isRtl ? 'start' : 'end',
                    overlayY: 'center',
                };
            }
            case 'right': {
                return {
                    overlayX: this.isRtl ? 'end' : 'start',
                    overlayY: 'center',
                };
            }
            default: {
                throw getNxPopoverInvalidDirectionError(direction);
            }
        }
    }

    /** Returns the overlay offset required by the user's direction preference */
    private _getOffset(direction: PopoverDirection) {
        switch (direction) {
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
                throw getNxPopoverInvalidDirectionError(direction);
            }
        }
    }

    /** Returns the opposite direction, using aquila popover direction naming: top, right, bottom, left */
    private _getInversePopoverDirection(direction: PopoverDirection): PopoverDirection {
        const popoverDirectionPairs = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        };
        return popoverDirectionPairs[direction] as PopoverDirection;
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
     * Returns an array of fallback positions for popover, following the algoritm:
     * 1) Slightly alternate preferred position if applicable. I.e. for 'top' try 'top-start' and 'top-end' positioning.
     * 2) Try the opposite position, i.e. for 'top' try 'bottom'.
     * 3) Slightly alternate opposite position, i.e. 'bottom-start', 'bottom-end'.
     * 4) All remaining positions from positions list.
     */
    private _getFallbackPositions(
        direction: PopoverDirection,
        possibleDirections: PopoverDirection[] = this._possiblePopoverDirections,
    ): ConnectionPositionPair[] {
        if (!direction) {
            return [];
        }
        const remainigDirections = possibleDirections.filter(possibleDirection => possibleDirection !== direction);
        let fallbackPositions: ConnectionPositionPair[] = [];
        switch (direction) {
            case 'top':
            case 'bottom': {
                fallbackPositions = this._getVerticalFallbackPositionPairs(direction);
                break;
            }
            case 'left':
            case 'right': {
                fallbackPositions = this._getHorizontalFallbackPositionPairs(direction);
                break;
            }
        }

        const inverseDirection = this._getInversePopoverDirection(direction);
        const nextFallbackPosition = remainigDirections.includes(inverseDirection) ? inverseDirection : possibleDirections[0];
        return [...fallbackPositions, ...this._getFallbackPositions(nextFallbackPosition, remainigDirections)];
    }

    /** Calculates fallbacks for vertical popover positioning */
    private _getVerticalFallbackPositionPairs(direction: PopoverVerticalDirection): ConnectionPositionPair[] {
        const isSelectedDirection = direction === this.direction;
        const verticalFallbackPositionPairs: ConnectionPositionPair[] = [];
        const basePositionPair = {
            ...this._getOrigin(direction),
            ...this._getOverlayPosition(direction),
            ...this._getOffset(direction),
        };

        if (!isSelectedDirection) {
            // HINT: selected direction matches basePosition, so we don't need to repeat it in fallback
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

    /** Calculates fallbacks for horizontal popover positioning */
    private _getHorizontalFallbackPositionPairs(direction: PopoverHorizontalDirection): ConnectionPositionPair[] {
        const offset = this._getOffset(direction);

        return [
            {
                ...this._getOrigin(direction),
                ...this._getOverlayPosition(direction),
                ...offset,
            },
        ];
    }

    private _dirChangeHandler() {
        if (this.overlayRef) {
            this.closePopover();
            this.overlayRef.dispose();
            this.overlayRef = null;
            this._overlayDestroyed.next();
        }
    }

    get isRtl(): boolean {
        return this._dir?.value === 'rtl';
    }
}
