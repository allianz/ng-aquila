import { FocusKeyManager } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import {
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  HOME,
  END,
  hasModifierKey
} from '@angular/cdk/keycodes';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { nxContextMenuAnimations } from './context-menu-animations';
import { NxContextMenuContentDirective } from './context-menu-content.directive';
import { NxContextMenuItemComponent } from './context-menu-item.component';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'nx-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxContextMenu',
  animations: [
    nxContextMenuAnimations.transformContextMenu
  ]
})
export class NxContextMenuComponent
  implements AfterContentInit, OnDestroy {
  private _keyManager!: FocusKeyManager<NxContextMenuItemComponent>;

  /** Menu items inside the current menu. */
  private _items: NxContextMenuItemComponent[] = [];

  /** Emits whenever the amount of menu items changes. */
  private _itemChanges = new Subject<NxContextMenuItemComponent[]>();

  /** Subscription to tab events on the menu panel */
  private _tabSubscription = Subscription.EMPTY;

  /** Config object to be passed into the menu's ngClass */
  _classList: { [key: string]: boolean } = {};

  /** Current state of the panel animation. */
  _panelAnimationState: 'void' | 'enter' = 'void';

  /** Emits whenever an animation on the menu completes. */
  _animationDone = new Subject<AnimationEvent>();

  /** Whether the menu is animating. */
  _isAnimating: boolean = false;

  /** Parent menu of the current menu panel. */
  parentMenu: NxContextMenuComponent | undefined;

  /**
   * @docs-private
   * Layout direction of the menu.
   */
  direction: Direction = 'ltr';

  /** @docs-private */
  @ViewChild(TemplateRef)
  templateRef!: TemplateRef<any>;

  /**
   * Menu content that will be rendered lazily.
   * @docs-private
   */
  @ContentChild(NxContextMenuContentDirective)
  lazyContent!: NxContextMenuContentDirective;

  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'> = new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

  constructor(private _ngZone: NgZone) {}

  ngAfterContentInit() {
    this._keyManager = new FocusKeyManager<NxContextMenuItemComponent>(
        this._items
      )
      .withWrap()
      .withTypeAhead();
    this._tabSubscription = this._keyManager.tabOut.subscribe(() =>
      this.closed.emit('tab')
    );
  }

  ngOnDestroy() {
    this._tabSubscription.unsubscribe();
    this.closed.complete();
  }

  /** Stream that emits whenever the hovered menu item changes. */
  _hovered(): Observable<NxContextMenuItemComponent> {
    return this._itemChanges.pipe(
      startWith(this._items),
      switchMap(items => merge(...items.map(item => item._hovered)))
    );
  }

  /** Handle a keyboard event from the menu, delegating to the appropriate action. */
  _handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;

    switch (keyCode) {
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.closed.emit('keydown');
        }
        break;
      case LEFT_ARROW:
        if (this.parentMenu && this.direction === 'ltr') {
          this.closed.emit('keydown');
        }
        break;
      case RIGHT_ARROW:
        if (this.parentMenu && this.direction === 'rtl') {
          this.closed.emit('keydown');
        }
        break;
      case HOME:
      case END:
        if (!hasModifierKey(event)) {
          keyCode === HOME
            ? manager.setFirstItemActive()
            : manager.setLastItemActive();
          event.preventDefault();
        }
        break;
      default:
        manager.onKeydown(event);
    }
  }

  /**
   * Focus the first item in the menu.
   */
  focusFirstItem(): void {
    // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
    if (this.lazyContent) {
      this._ngZone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() =>
          this._keyManager.setFirstItemActive()
        );
    } else {
      this._keyManager.setFirstItemActive();
    }
  }

  /**
   * Resets the active item in the menu. This is used when the menu is opened, allowing
   * the user to start from the first option when pressing the down arrow.
   */
  resetActiveItem() {
    this._keyManager.setActiveItem(-1);
  }

  /**
   * Registers a menu item with the context menu.
   * @docs-private
   */
  addItem(item: NxContextMenuItemComponent) {
    // We register the items through this method, rather than picking them up through
    // `ContentChildren`, because we need the items to be picked up by their closest
    // `nx-context-menu` ancestor. If we used `@ContentChildren(NxContextMenuItem, {descendants: true})`,
    // all descendant items will bleed into the top-level menu in the case where the consumer
    // has `nx-context-menu` instances nested inside each other.
    if (this._items.indexOf(item) === -1) {
      this._items.push(item);
      this._itemChanges.next(this._items);
    }
  }

  /**
   * Removes an item from the context menu.
   * @docs-private
   */
  removeItem(item: NxContextMenuItemComponent) {
    const index = this._items.indexOf(item);

    if (this._items.indexOf(item) > -1) {
      this._items.splice(index, 1);
      this._itemChanges.next(this._items);
    }
  }

  /** Starts the enter animation. */
  _startAnimation() {
    this._panelAnimationState = 'enter';
  }

  /** Resets the panel animation to its initial state. */
  _resetAnimation() {
    this._panelAnimationState = 'void';
  }

  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(event: AnimationEvent) {
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  _onAnimationStart(event: AnimationEvent) {
    this._isAnimating = true;

    // Scroll the content element to the top as soon as the animation starts. This is necessary,
    // because we move focus to the first item while it's still being animated, which can throw
    // the browser off when it determines the scroll position. Alternatively we can move focus
    // when the animation is done, however moving focus asynchronously will interrupt screen
    // readers which are in the process of reading out the menu already. We take the `element`
    // from the `event` since we can't use a `ViewChild` to access the pane.
    if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
      event.element.scrollTop = 0;
    }
  }
}
