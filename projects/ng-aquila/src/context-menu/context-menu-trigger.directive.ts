import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { _getEventTarget } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    Optional,
    Output,
    Self,
    ViewContainerRef,
} from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { asapScheduler, fromEvent, merge, Observable, of as observableOf, Subject, Subscription } from 'rxjs';
import { delay, filter, map, take, takeUntil } from 'rxjs/operators';

import { NxContextMenuComponent } from './context-menu.component';
import { throwNxContextMenuMissingError } from './context-menu-errors';
import { NxContextMenuItemComponent } from './context-menu-item.component';

/** Default top padding of the menu panel. */
export const MENU_PANEL_TOP_PADDING = 8;

export const MENU_PANEL_OFFSET_Y = 8;

export const MENU_PANEL_OFFSET_X = 8;

export type NxContextMenuScrollStrategy = 'close' | 'reposition';

export type NxContextMenuMode = 'button' | 'cursor';

/** Injection token that determines the scroll handling while a context-menu is open. */
export const NX_CONTEXT_MENU_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-context-menu-scroll-strategy');

/** @docs-private */
export function NX_CONTEXT_MENU_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_CONTEXT_MENU_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_CONTEXT_MENU_SCROLL_STRATEGY,
    useFactory: NX_CONTEXT_MENU_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

interface Point {
    x: number;
    y: number;
}

/**
 * This directive is intended to be used in conjunction with an nx-context-menu tag.
 * It is responsible for toggling the display of the provided context menu instance.
 */
@Directive({
    selector: `[nxContextMenuTriggerFor]`,
    host: {
        'aria-haspopup': 'true',
        '[attr.aria-expanded]': 'contextMenuOpen || null',
        '(mousedown)': '_handleMousedown($event)',
        '(keydown)': '_handleKeydown($event)',
        '(click)': '_handleClick($event)',
        '(contextmenu)': '_handleRightClick($event)',
    },
    exportAs: 'nxContextMenuTrigger',
})
export class NxContextMenuTriggerDirective implements AfterContentInit, OnDestroy {
    private _portal!: TemplatePortal;
    private _overlayRef: OverlayRef | null = null;
    private _contextMenuOpen = false;
    private _closingActionsSubscription = Subscription.EMPTY;
    private _contextMenuCloseSubscription = Subscription.EMPTY;
    private readonly _documentClickObservable: Observable<MouseEvent>;

    /** Strategy factory that will be used to handle scrolling while the context-menu panel is open. */
    private _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    /** References the context menu instance that the trigger is associated with. */
    @Input('nxContextMenuTriggerFor') set contextMenu(contextMenu: NxContextMenuComponent) {
        if (contextMenu === this._contextMenu) {
            return;
        }

        this._contextMenu = contextMenu;
        this._contextMenuCloseSubscription.unsubscribe();

        if (contextMenu) {
            this._contextMenuCloseSubscription = contextMenu.closed.asObservable().subscribe(reason => {
                this._destroyMenu();

                // If a click closed the menu, we should close the entire chain of nested menus.
                if ((reason === 'click' || reason === 'tab') && this._parentMenu) {
                    this._parentMenu.closed.emit(reason);
                }
            });
        }
    }
    get contextMenu() {
        return this._contextMenu;
    }
    private _contextMenu!: NxContextMenuComponent;

    @Input() set scrollStrategy(value: NxContextMenuScrollStrategy | null | undefined) {
        if (this.#scrollStrategy !== value) {
            this.#scrollStrategy = value;
            this._scrollStrategyFactory = value ? this.getScrollStrtegyFactory(value) : this._defaultScrollStrategyFactory;
            this._cdr.markForCheck();
        }
    }
    get scrollStrategy(): NxContextMenuScrollStrategy | null | undefined {
        return this.#scrollStrategy;
    }
    #scrollStrategy?: NxContextMenuScrollStrategy | null;

    /** Whether the context menu is open. */
    get contextMenuOpen(): boolean {
        return this._contextMenuOpen;
    }

    /** The text direction of the containing app. */
    private get dir(): Direction {
        return this._dir?.value === 'rtl' ? 'rtl' : 'ltr';
    }

    /** Data to be passed along to any lazily-rendered content. */
    @Input('nxContextMenuTriggerData') contextMenuData!: object;

    /**
     * Sets the mode of this context menu trigger.
     * 'button' (default): Opens by clicking the trigger
     * 'cursor': Opens at the cursor position by right clicking anywhere on the trigger.
     */
    @Input('nxContextMenuTriggerMode') mode: NxContextMenuMode = 'button';

    /** Event emitted when the associated context menu is opened. */
    @Output() readonly contextMenuOpened = new EventEmitter<void>();

    /** Event emitted when the associated context menu is closed. */
    @Output() readonly contextMenuClosed = new EventEmitter<void>();

    private readonly _destroyed = new Subject<void>();

    private _rightClicked = false;

    constructor(
        private readonly _overlay: Overlay,
        private readonly _element: ElementRef<HTMLElement>,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() private readonly _parentMenu: NxContextMenuComponent | null,
        @Optional() @Self() private readonly _contextMenuItemInstance: NxContextMenuItemComponent | null,
        @Optional() private readonly _dir: Directionality | null,
        @Optional() @Self() private readonly _triggerButton: NxTriggerButton | null,
        @Inject(NX_CONTEXT_MENU_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        if (_contextMenuItemInstance) {
            _contextMenuItemInstance._triggersSubmenu = this.triggersSubmenu();
        }
        this._documentClickObservable = fromEvent<MouseEvent>(document, 'click');

        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            if (this.contextMenuOpen) {
                // HINT: closing menu on direction change.
                // When user re-opens it, the overlay and menu will be initialized properly, based on new direction.
                this.closeContextMenu();
            }
        });
    }

    ngAfterContentInit(): void {
        this._checkContextMenu();
        this._handleHover();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();

        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }

        this._contextMenuCloseSubscription.unsubscribe();
        this._closingActionsSubscription.unsubscribe();
    }

    /** Whether the context menu triggers a sub-menu or a top-level one. */
    triggersSubmenu(): boolean {
        return !!(this._contextMenuItemInstance && this._parentMenu);
    }

    /** Toggles the context menu between the open and closed states. */
    toggleContextMenu(origin?: FocusOrigin): void {
        return this.contextMenuOpen ? this.closeContextMenu() : this.openContextMenu(origin);
    }

    /** Opens the context menu. */
    openContextMenu(origin?: FocusOrigin, position?: Point): void {
        if (this.contextMenuOpen) {
            return;
        }

        this._checkContextMenu();

        const overlayRef = this._createOverlay();
        const overlayConfig = overlayRef.getConfig();

        if (position) {
            this._setPositionToCursor(overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy, position);
        } else {
            this._setPosition(overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy);
        }

        overlayRef.attach(this._getPortal());

        if (this.contextMenu.lazyContent) {
            this.contextMenu.lazyContent.attach(this.contextMenuData);
        }

        this._closingActionsSubscription = this._contextMenuClosingActions().subscribe(() => this.closeContextMenu());

        this._initContextMenu(origin);

        if (this.contextMenu instanceof NxContextMenuComponent) {
            this.contextMenu._startAnimation();
        }

        if (this._triggerButton) {
            this._triggerButton.setTriggerActive();
            this.contextMenu.closed.pipe(take(1)).subscribe(() => this._triggerButton?.setTriggerInactive());
        }

        this._waitForClose();
    }

    /** Closes the context menu. */
    closeContextMenu(): void {
        this._rightClicked = false;
        this.contextMenu.closed.emit();
    }

    private getScrollStrtegyFactory(scrollStrategy: NxContextMenuScrollStrategy): () => ScrollStrategy {
        switch (scrollStrategy) {
            case 'close':
                return this._overlay.scrollStrategies.close;
            default:
                return this._overlay.scrollStrategies.reposition;
        }
    }

    /** Closes the context menu and does the necessary cleanup. */
    private _destroyMenu() {
        if (!this._overlayRef || !this.contextMenuOpen) {
            return;
        }

        const contextMenu = this.contextMenu;

        this._closingActionsSubscription.unsubscribe();
        this._overlayRef.detach();

        contextMenu._resetAnimation();

        if (contextMenu.lazyContent) {
            // Wait for the exit animation to finish before detaching the content.
            contextMenu._animationDone
                .pipe(
                    filter(event => event.toState === 'void'),
                    take(1),
                    // Interrupt if the content got re-attached.
                    takeUntil(contextMenu.lazyContent._attached),
                )
                .subscribe({
                    next: () => contextMenu.lazyContent?.detach(),
                    // No matter whether the content got re-attached, reset the menu.
                    complete: () => this._resetContextMenu(),
                });
        } else {
            this._resetContextMenu();
        }
    }

    /**
     * This method sets the context menu state to open and focuses the first item if
     * the context menu was opened via the keyboard.
     */
    private _initContextMenu(origin?: FocusOrigin): void {
        this.contextMenu.parentMenu = this.triggersSubmenu() ? this._parentMenu ?? undefined : undefined;
        this.contextMenu.direction = this.dir;
        this._setIsContextMenuOpen(true);
        setTimeout(() => {
            this.contextMenu.focusFirstItem(origin);
        });
    }

    /**
     * Focuses the context menu trigger.
     */
    focus() {
        this._element.nativeElement.focus();
    }

    /**
     * This method resets the context menu when it's closed, most importantly restoring
     * focus to the context menu trigger if the context menu was opened via the keyboard.
     */
    private _resetContextMenu(): void {
        this._setIsContextMenuOpen(false);
        this.focus();
    }

    /** Set state rather than toggle to support triggers sharing a menu. */
    private _setIsContextMenuOpen(isOpen: boolean): void {
        this._contextMenuOpen = isOpen;
        this._contextMenuOpen ? this.contextMenuOpened.emit() : this.contextMenuClosed.emit();

        if (this.triggersSubmenu()) {
            this._contextMenuItemInstance!._highlighted = isOpen;
        }
    }

    /**
     * This method checks that a valid instance of NxContextMenuComponent has been passed into
     * nxContextMenuTriggerFor. If not, an exception is thrown.
     */
    private _checkContextMenu() {
        if (!this.contextMenu) {
            throwNxContextMenuMissingError();
        }
    }

    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openContextMenu is called.
     */
    private _createOverlay(): OverlayRef {
        if (!this._overlayRef) {
            const config = this._getOverlayConfig();
            this._overlayRef = this._overlay.create(config);

            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe();
        }

        return this._overlayRef;
    }

    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     */
    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._overlay
                .position()
                .flexibleConnectedTo(this._element)
                .withLockedPosition()
                .withFlexibleDimensions(false)
                .withTransformOriginOn('.nx-context-menu'),
            scrollStrategy: this._scrollStrategyFactory(),
            direction: this._dir ?? undefined,
        });
    }

    /**
     * Sets the position on a position strategy so the overlay is placed at the cursor.
     * @param positionStrategy Strategy whose position to update.
     * @param cursorPosition Position of the cursor.
     */
    private _setPositionToCursor(positionStrategy: FlexibleConnectedPositionStrategy, cursorPosition: Point) {
        positionStrategy.setOrigin(cursorPosition);
        positionStrategy.withPositions([
            {
                overlayX: 'start',
                overlayY: 'top',
                originX: 'center',
                originY: 'center',
            },
            {
                overlayX: 'start',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'center',
            },
            {
                overlayX: 'end',
                overlayY: 'top',
                originX: 'center',
                originY: 'center',
            },
            {
                overlayX: 'end',
                overlayY: 'bottom',
                originX: 'center',
                originY: 'center',
            },
        ]);
    }

    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    private _setPosition(positionStrategy: FlexibleConnectedPositionStrategy) {
        let originX = 'start';
        let originFallbackX = 'end';
        const overlayY = 'top';
        const overlayFallbackY = 'bottom';
        let originY = overlayY;
        let originFallbackY = overlayFallbackY;
        let overlayX = originX;
        let overlayFallbackX = originFallbackX;
        let offsetX = 0;
        let offsetY = 0;

        if (this.triggersSubmenu()) {
            // When the menu is a sub-menu, it should always align itself
            // to the edges of the trigger, instead of overlapping it.
            overlayFallbackX = originX = 'end';
            originFallbackX = overlayX = 'start';
            offsetX = this.dir === 'rtl' ? -MENU_PANEL_OFFSET_X : MENU_PANEL_OFFSET_X;
            offsetY = -MENU_PANEL_TOP_PADDING;
        } else {
            offsetY = MENU_PANEL_OFFSET_Y;
            originY = 'bottom';
            originFallbackY = 'top';
        }

        positionStrategy.withPositions([
            { originX, originY, overlayX, overlayY, offsetX, offsetY },
            {
                originX: originFallbackX,
                originY,
                overlayX: overlayFallbackX,
                overlayY,
                offsetX: -offsetX,
                offsetY,
            },
            {
                originX,
                originY: originFallbackY,
                overlayX,
                overlayY: overlayFallbackY,
                offsetX,
                offsetY: -offsetY,
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetX: -offsetX,
                offsetY: -offsetY,
            },
        ] as ConnectedPosition[]);
    }

    /**
     * Returns a stream that emits whenever an action that should close the context menu occurs.
     */
    private _contextMenuClosingActions() {
        let backdrop: Observable<MouseEvent>;
        let detachments: Observable<void>;

        if (this._overlayRef) {
            backdrop = this._overlayRef.backdropClick();
            detachments = this._overlayRef.detachments();
        }

        const parentClose = this._parentMenu ? this._parentMenu.closed : observableOf();

        const hover = this._parentMenu
            ? this._parentMenu._hovered().pipe(
                  filter(active => active !== this._contextMenuItemInstance),
                  filter(() => this._contextMenuOpen),
              )
            : observableOf();

        return merge(backdrop!, parentClose, hover, detachments!);
    }

    /** Handles mouse presses on the trigger. */
    _handleMousedown(event: MouseEvent): void {
        // Since right or middle button clicks won't trigger the `click` event,
        // we shouldn't consider the menu as opened by mouse in those cases.
        // this._openedBy = event.button === 0 ? 'mouse' : null;

        // Since clicking on the trigger won't close the menu if it opens a sub-menu,
        // we should prevent focus from moving onto it via click to avoid the
        // highlight from lingering on the menu item.
        if (this.triggersSubmenu()) {
            event.preventDefault();
        }
    }

    _handleRightClick(event: MouseEvent) {
        if (this.mode !== 'cursor') {
            return;
        }
        this._rightClicked = true;

        event.preventDefault();
        if (this._contextMenuOpen) {
            this.closeContextMenu();
        }
        const position = {
            x: event.clientX,
            y: event.clientY,
        };
        this.openContextMenu('mouse', position);
    }

    /** Handles key presses on the trigger. */
    _handleKeydown(event: KeyboardEvent): void {
        if (this.mode !== 'button') {
            return;
        }

        const keyCode = event.keyCode;

        if (this.triggersSubmenu() && ((keyCode === RIGHT_ARROW && this.dir === 'ltr') || (keyCode === LEFT_ARROW && this.dir === 'rtl'))) {
            this.openContextMenu('keyboard');
        }
    }

    /** Handles click events on the trigger. */
    _handleClick(event: MouseEvent): void {
        if (this.mode !== 'button') {
            return;
        }
        event.preventDefault();

        const origin: FocusOrigin = event.detail ? 'program' : 'keyboard';

        if (this.triggersSubmenu()) {
            // Stop event propagation to avoid closing the parent menu.
            event.stopPropagation();
            this.openContextMenu(origin);
        } else {
            this.toggleContextMenu(origin);
        }
    }

    /* Subscribes to document clicks to close the context menu on clicks on the background. */
    private _waitForClose() {
        if (this._rightClicked) {
            return this._documentClickObservable
                .pipe(
                    filter(event => !event.defaultPrevented),
                    takeUntil(this.contextMenu.closed),
                )
                .subscribe(() => {
                    this.closeContextMenu();
                });
        }

        return this._documentClickObservable
            .pipe(
                map(event => _getEventTarget(event)),
                filter(target => !this._element.nativeElement.contains(target as Node | null)),
                takeUntil(this.contextMenu.closed),
            )
            .subscribe(() => {
                this.closeContextMenu();
            });
    }

    /** Handles the cases where the user hovers over the trigger. */
    private _handleHover() {
        // Subscribe to changes in the hovered item in order to toggle the panel.
        if (!this.triggersSubmenu()) {
            return;
        }

        this._parentMenu!._hovered()
            // Since we might have multiple competing triggers for the same menu (e.g. a sub-menu
            // with different data and triggers), we have to delay it by a tick to ensure that
            // it won't be closed immediately after it is opened.
            .pipe(
                filter(active => active === this._contextMenuItemInstance && !active.disabled),
                delay(0, asapScheduler),
                takeUntil(this._destroyed), // TODO this may not be sufficient, subscriptions may be piling up
            )
            .subscribe(() => {
                // If the same menu is used between multiple triggers, it might still be animating
                // while the new trigger tries to re-open it. Wait for the animation to finish
                // before doing so. Also interrupt if the user moves to another item.
                if (this.contextMenu._isAnimating) {
                    // We need the `delay(0)` here in order to avoid
                    // 'changed after checked' errors in some cases.
                    this.contextMenu._animationDone
                        .pipe(take(1), delay(0, asapScheduler), takeUntil(this._parentMenu!._hovered()))
                        .subscribe(() => this.openContextMenu('mouse'));
                } else {
                    this.openContextMenu('mouse');
                }
            });
    }

    /** Gets the portal that should be attached to the overlay. */
    private _getPortal(): TemplatePortal {
        // Note that we can avoid this check by keeping the portal on the context menu panel.
        // While it would be cleaner, we'd have to introduce another required method on
        // `NxContextMenuPanelComponent`, making it harder to consume.
        if (!this._portal || this._portal.templateRef !== this.contextMenu.templateRef) {
            this._portal = new TemplatePortal(this.contextMenu.templateRef, this._viewContainerRef);
        }

        return this._portal;
    }
}
