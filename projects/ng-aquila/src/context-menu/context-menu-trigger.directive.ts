import { Direction, Directionality } from '@angular/cdk/bidi';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { asapScheduler, fromEvent, merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { delay, filter, map, take, takeUntil } from 'rxjs/operators';

import { throwNxContextMenuMissingError } from './context-menu-errors';
import { NxContextMenuItemComponent } from './context-menu-item.component';
import { NxContextMenuComponent } from './context-menu.component';

/** Default top padding of the menu panel. */
export const MENU_PANEL_TOP_PADDING = 16;

export const MENU_PANEL_OFFSET = 8;

export type NxContextMenuScrollStrategy = 'close' | 'reposition';

/** Options for binding a passive event listener. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});

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
    '(click)': '_handleClick($event)'
  },
  exportAs: 'nxContextMenuTrigger'
})
export class NxContextMenuTriggerDirective
  implements AfterContentInit, OnInit, OnDestroy {
  private _portal: TemplatePortal;
  private _overlayRef: OverlayRef | null = null;
  private _contextMenuOpen: boolean = false;
  private _closingActionsSubscription = Subscription.EMPTY;
  private _hoverSubscription = Subscription.EMPTY;
  private _contextMenuCloseSubscription = Subscription.EMPTY;
  private _dirChangeSubscription = Subscription.EMPTY;
  private _documentClickObservable: Observable<MouseEvent>;
  private _scrollStrategy: () => ScrollStrategy;

  /** References the context menu instance that the trigger is associated with. */
  @Input('nxContextMenuTriggerFor')
  get contextMenu() {
    return this._contextMenu;
  }
  set contextMenu(contextMenu: NxContextMenuComponent) {
    if (contextMenu === this._contextMenu) {
      return;
    }

    this._contextMenu = contextMenu;
    this._contextMenuCloseSubscription.unsubscribe();

    if (contextMenu) {
      this._contextMenuCloseSubscription = contextMenu.closed
        .asObservable()
        .subscribe(reason => {
          this._destroyMenu();

          // If a click closed the menu, we should close the entire chain of nested menus.
          if ((reason === 'click' || reason === 'tab') && this._parentMenu) {
            this._parentMenu.closed.emit(reason);
          }
        });
    }
  }
  private _contextMenu: NxContextMenuComponent;

  @Input()
  set scrollStrategy(value: NxContextMenuScrollStrategy) {
    if (value === 'close') {
      this._scrollStrategy = this._overlay.scrollStrategies.close;
    } else {
      this._scrollStrategy = this._overlay.scrollStrategies.reposition;
    }
  }

  /** Whether the context menu is open. */
  get contextMenuOpen(): boolean {
    return this._contextMenuOpen;
  }

  /** The text direction of the containing app. */
  private get dir(): Direction {
    return this._dir?.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Data to be passed along to any lazily-rendered content. */
  @Input('nxContextMenuTriggerData') contextMenuData: any;

  /** Event emitted when the associated context menu is opened. */
  @Output() readonly contextMenuOpened: EventEmitter<void> = new EventEmitter<void>();

  /** Event emitted when the associated context menu is closed. */
  @Output() readonly contextMenuClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
      private _overlay: Overlay,
      private _element: ElementRef<HTMLElement>,
      private _viewContainerRef: ViewContainerRef,
      @Optional() private _parentMenu: NxContextMenuComponent,
      @Optional()
      @Self()
      private _contextMenuItemInstance: NxContextMenuItemComponent,
      @Optional() private _dir: Directionality,
      @Optional() @Self() private _triggerButton: NxTriggerButton) {

    if (_contextMenuItemInstance) {
      _contextMenuItemInstance._triggersSubmenu = this.triggersSubmenu();
    }

    this._scrollStrategy = this._overlay.scrollStrategies.reposition;
    this._documentClickObservable = fromEvent<MouseEvent>(document, 'click');
  }

  ngOnInit() {
    this._dirChangeSubscription = this._dir.change.subscribe(() => {
      if (this.contextMenuOpen) {
        // HINT: closing menu on direction change.
        // When user re-opens it, the overlay and menu will be initialized properly, based on new direction.
        this.closeContextMenu();
      }
    });
  }

  ngAfterContentInit() {
    this._checkContextMenu();
    this._handleHover();
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._contextMenuCloseSubscription.unsubscribe();
    this._closingActionsSubscription.unsubscribe();
    this._hoverSubscription.unsubscribe();
    this._dirChangeSubscription.unsubscribe();
  }

  /** Whether the context menu triggers a sub-menu or a top-level one. */
  triggersSubmenu(): boolean {
    return !!(this._contextMenuItemInstance && this._parentMenu);
  }

  /** Toggles the context menu between the open and closed states. */
  toggleContextMenu(): void {
    return this.contextMenuOpen
      ? this.closeContextMenu()
      : this.openContextMenu();
  }

  /** Opens the context menu. */
  openContextMenu(): void {
    if (this.contextMenuOpen) {
      return;
    }

    this._checkContextMenu();

    const overlayRef = this._createOverlay();
    const overlayConfig = overlayRef.getConfig();

    this._setPosition(
      overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy
    );
    overlayRef.attach(this._getPortal());

    if (this.contextMenu.lazyContent) {
      this.contextMenu.lazyContent.attach(this.contextMenuData);
    }

    this._closingActionsSubscription = this._contextMenuClosingActions().subscribe(
      () => this.closeContextMenu()
    );
    this._initContextMenu();

    if (this.contextMenu instanceof NxContextMenuComponent) {
      this.contextMenu._startAnimation();
    }

    if (this._triggerButton) {
      this._triggerButton.setTriggerActive();
      this.contextMenu.closed.pipe(take(1)).subscribe(() => this._triggerButton.setTriggerInactive());
    }

    this._waitForClose();
  }

  /** Closes the context menu. */
  closeContextMenu(): void {
    this.contextMenu.closed.emit();
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
          takeUntil(contextMenu.lazyContent._attached)
        )
        .subscribe({
          next: () =>
            contextMenu.lazyContent && contextMenu.lazyContent.detach(),
          // No matter whether the content got re-attached, reset the menu.
          complete: () => this._resetContextMenu()
        });
    } else {
      this._resetContextMenu();
    }
  }

  /**
   * This method sets the context menu state to open and focuses the first item if
   * the context menu was opened via the keyboard.
   */
  private _initContextMenu(): void {
    this.contextMenu.parentMenu = this.triggersSubmenu()
      ? this._parentMenu
      : undefined;
    this.contextMenu.direction = this.dir;
    this._setIsContextMenuOpen(true);
    this.contextMenu.focusFirstItem();
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
    this._contextMenuOpen
      ? this.contextMenuOpened.emit()
      : this.contextMenuClosed.emit();

    if (this.triggersSubmenu()) {
      this._contextMenuItemInstance._highlighted = isOpen;
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
      this._overlayRef.keydownEvents().subscribe();
    }

    return this._overlayRef;
  }

  /**
   * This method builds the configuration object needed to create the overlay, the OverlayState.
   * @returns OverlayConfig
   */
  private _getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._element)
        .withLockedPosition()
        .withFlexibleDimensions(false)
        .withTransformOriginOn('.nx-context-menu'),
      scrollStrategy: this._scrollStrategy(),
      direction: this._dir
    });
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
    let offsetY = 0;

    if (this.triggersSubmenu()) {
      // When the menu is a sub-menu, it should always align itself
      // to the edges of the trigger, instead of overlapping it.
      overlayFallbackX = originX = 'end';
      originFallbackX = overlayX = 'start';
      offsetY = -MENU_PANEL_TOP_PADDING;
    } else {
      offsetY = MENU_PANEL_OFFSET;
      originY = 'bottom';
      originFallbackY = 'top';
    }

    positionStrategy.withPositions([
      { originX, originY, overlayX, overlayY, offsetY },
      {
        originX: originFallbackX,
        originY,
        overlayX: overlayFallbackX,
        overlayY,
        offsetY
      },
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      }
    ] as ConnectedPosition[]);
  }

  /**
   * Returns a stream that emits whenever an action that should close the context menu occurs. */
  private _contextMenuClosingActions() {
    let backdrop;
    let detachments;

    if (this._overlayRef) {
      backdrop = this._overlayRef.backdropClick();
      detachments = this._overlayRef.detachments();
    }

    const parentClose = this._parentMenu
      ? this._parentMenu.closed
      : observableOf();

    const hover = this._parentMenu
      ? this._parentMenu._hovered().pipe(
          filter(active => active !== this._contextMenuItemInstance),
          filter(() => this._contextMenuOpen)
        )
      : observableOf();

    return merge(backdrop, parentClose, hover, detachments);
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

  /** Handles key presses on the trigger. */
  _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (
      this.triggersSubmenu() &&
      ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
        (keyCode === LEFT_ARROW && this.dir === 'rtl'))
    ) {
      this.openContextMenu();
    }
  }

  /** Handles click events on the trigger. */
  _handleClick(event: MouseEvent): void {
    if (this.triggersSubmenu()) {
      // Stop event propagation to avoid closing the parent menu.
      event.stopPropagation();
      this.openContextMenu();
    } else {
      this.toggleContextMenu();
    }
  }

  /* Subscribes to document clicks to close the context menu on clicks on the background. */
  private _waitForClose() {
    return this._documentClickObservable
      .pipe(
        map(event => event.target),
        filter((target: Node) => !this._element.nativeElement.contains(target)),
        takeUntil(this.contextMenu.closed))
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

    this._hoverSubscription = this._parentMenu
      ._hovered()
      // Since we might have multiple competing triggers for the same menu (e.g. a sub-menu
      // with different data and triggers), we have to delay it by a tick to ensure that
      // it won't be closed immediately after it is opened.
      .pipe(
        filter(active => active === this._contextMenuItemInstance && !active.disabled),
        delay(0, asapScheduler)
      )
      .subscribe(() => {
        // If the same menu is used between multiple triggers, it might still be animating
        // while the new trigger tries to re-open it. Wait for the animation to finish
        // before doing so. Also interrupt if the user moves to another item.
        if (this.contextMenu._isAnimating) {
          // We need the `delay(0)` here in order to avoid
          // 'changed after checked' errors in some cases.
          this.contextMenu._animationDone
            .pipe(
              take(1),
              delay(0, asapScheduler),
              takeUntil(this._parentMenu._hovered())
            )
            .subscribe(() => this.openContextMenu());
        } else {
          this.openContextMenu();
        }
      });
  }

  /** Gets the portal that should be attached to the overlay. */
  private _getPortal(): TemplatePortal {
    // Note that we can avoid this check by keeping the portal on the context menu panel.
    // While it would be cleaner, we'd have to introduce another required method on
    // `NxContextMenuPanelComponent`, making it harder to consume.
    if (!this._portal ||
        this._portal.templateRef !== this.contextMenu.templateRef) {
      this._portal = new TemplatePortal(
        this.contextMenu.templateRef,
        this._viewContainerRef
      );
    }

    return this._portal;
  }
}
