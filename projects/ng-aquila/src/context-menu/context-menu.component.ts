import { AnimationEvent } from '@angular/animations';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { END, ESCAPE, hasModifierKey, HOME, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostListener,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { merge, Observable, ReplaySubject, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { nxContextMenuAnimations } from './context-menu-animations';
import { NxContextMenuContentDirective } from './context-menu-content.directive';
import { NxContextMenuItemComponent, NxContextMenuItemWrapComponent } from './context-menu-item.component';

@Component({
    selector: 'nx-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nxContextMenu',
    animations: [nxContextMenuAnimations.transformContextMenu],
})
export class NxContextMenuComponent implements AfterContentInit, OnDestroy {
    private _keyManager!: FocusKeyManager<NxContextMenuItemComponent>;

    @ContentChildren(NxContextMenuItemComponent) private _items!: QueryList<NxContextMenuItemComponent>;

    @ContentChild(NxContextMenuItemWrapComponent) private _wrap!: NxContextMenuItemWrapComponent;

    private readonly _init = new ReplaySubject<void>(1);

    /** Config object to be passed into the menu's ngClass */
    _classList: { [key: string]: boolean } = {};

    /** Current state of the panel animation. */
    _panelAnimationState: 'void' | 'enter' = 'void';

    /** Emits whenever an animation on the menu completes. */
    readonly _animationDone = new Subject<AnimationEvent>();

    /** Whether the menu is animating. */
    _isAnimating = false;

    /** Parent menu of the current menu panel. */
    parentMenu?: NxContextMenuComponent;

    /**
     * Layout direction of the menu.
     * @docs-private
     */
    direction: Direction = 'ltr';

    /** @docs-private */
    @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

    /**
     * Menu content that will be rendered lazily.
     * @docs-private
     */
    @ContentChild(NxContextMenuContentDirective) lazyContent!: NxContextMenuContentDirective;

    /** Event emitted when the menu is closed. */
    @Output() readonly closed = new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

    private readonly _destroyed = new Subject<void>();

    @HostListener('click')
    private _onClick(event: Event) {
        event.preventDefault();
    }

    constructor(private readonly _ngZone: NgZone) {}

    ngAfterContentInit(): void {
        this._items = this._wrap ? this._wrap?._items : this._items;
        this._keyManager = new FocusKeyManager<NxContextMenuItemComponent>(this._items).withWrap().withTypeAhead().setFocusOrigin('keyboard');
        this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(() => this.closed.emit('tab'));
        this._init.next();
    }
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this.closed.complete();
        this._init.complete();
    }

    /** Stream that emits whenever the hovered menu item changes. */
    _hovered(): Observable<NxContextMenuItemComponent> {
        return this._init.pipe(
            switchMap(() => this._items.changes.pipe(startWith(this._items))),
            switchMap((items: QueryList<NxContextMenuItemComponent>) => merge(...items.map(item => item._hovered))),
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
                    keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
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
    focusFirstItem(origin?: FocusOrigin): void {
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
                this._keyManager.setFirstItemActive();
                this._keyManager.activeItem?.focus(origin);
            });
    }

    /**
     * Resets the active item in the menu. This is used when the menu is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem() {
        this._keyManager.setActiveItem(-1);
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
