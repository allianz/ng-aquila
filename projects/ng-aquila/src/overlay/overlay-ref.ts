import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { FlexibleConnectedPositionStrategyOrigin, OverlayRef } from '@angular/cdk/overlay';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NxOverlayContainerComponent } from './overlay-container.component';
import { NxOverlayState } from './overlay-service';

// Id counter
let nextId = 0;

/**
 * Reference to a overlay opened via the NxDialogService.
 */
export class NxOverlayRef<T, R = any> {
    /** The instance of component opened into the overlay. */
    componentInstance!: T;

    /** Whether the user is allowed to close the overlay. */
    closeOnClickOutside?: boolean = this._containerInstance._config.closeOnClickOutside;

    /** Subject for notifying the user that the overlay has finished opening. */
    private readonly _afterOpened = new Subject<void>();

    /** Subject for notifying the user that the overlay has finished closing. */
    private readonly _afterClosed = new Subject<R | undefined>();

    /** Subject for notifying the user that the overlay has started closing. */
    private readonly _beforeClosed = new Subject<R | undefined>();

    private readonly _documentClickObservable: Observable<MouseEvent>;

    /** Result to be passed to afterClosed. */
    private _result?: R;

    /** Current state of the overlay. */
    private _state = NxOverlayState.OPEN;

    constructor(
        private readonly _overlayRef: OverlayRef,
        readonly _containerInstance: NxOverlayContainerComponent,
        readonly origin: FlexibleConnectedPositionStrategyOrigin,
        private readonly _router: Router,
        readonly id: string = `nx-overlay-${nextId++}`,
    ) {
        this._documentClickObservable = fromEvent<MouseEvent>(document, 'click');
        _overlayRef
            .backdropClick()
            .pipe(takeUntil(this._afterClosed))
            .subscribe(() => {
                if (this.closeOnClickOutside) {
                    this.close();
                }
            });

        // We have to defer that or the same click that opened an overlay
        // would immediately close it again.
        setTimeout(() => this.waitForClose());

        this._router.events.pipe(takeUntil(this.afterClosed())).subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.close();
            }
        });

        // Pass the id along to the container.
        _containerInstance._id = id;

        _overlayRef
            .detachments()
            .pipe(takeUntil(this._afterClosed))
            .subscribe(() => {
                this._beforeClosed.next(this._result);
                this._beforeClosed.complete();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null!;
                this._overlayRef.dispose();
            });

        _overlayRef
            .keydownEvents()
            .pipe(
                filter(event => event.keyCode === ESCAPE && !hasModifierKey(event)),
                takeUntil(this._afterClosed),
            )
            .subscribe(event => {
                event.preventDefault();
                this.close();
            });

        this._afterOpened.next();
        this._afterOpened.complete();
    }

    waitForClose() {
        this._documentClickObservable
            .pipe(
                map(event => event.target as Node),
                filter((target: Node) => !this._overlayRef.overlayElement?.contains(target)),
                takeUntil(this._afterClosed),
            )
            .subscribe(() => {
                if (this.closeOnClickOutside) {
                    this.close();
                }
            });
    }

    /**
     * Close the overlay.
     * @param overlayResult Optional result to return to the overlay opener.
     */
    close(overlayResult?: R): void {
        this._result = overlayResult;
        this._beforeClosed.next(overlayResult);
        this._beforeClosed.complete();
        this._overlayRef.dispose();
        this._state = NxOverlayState.CLOSED;
        this._containerInstance.restoreFocus();
        if (this._containerInstance._config.triggerButton) {
            this._containerInstance._config.triggerButton.setTriggerInactive();
        }
    }

    /**
     * Gets an observable that is notified when the overlay is finished opening.
     */
    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    /**
     * Gets an observable that is notified when the overlay is finished closing.
     */
    afterClosed(): Observable<R | undefined> {
        return this._afterClosed.asObservable();
    }

    /**
     * Gets an observable that is notified when the overlay has started closing.
     */
    beforeClosed(): Observable<R | undefined> {
        return this._beforeClosed.asObservable();
    }

    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick(): Observable<MouseEvent> {
        return this._overlayRef.backdropClick();
    }

    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents(): Observable<KeyboardEvent> {
        return this._overlayRef.keydownEvents();
    }

    /** Add a CSS class or an array of classes to the overlay pane. */
    addPanelClass(classes: string | string[]): this {
        this._overlayRef.addPanelClass(classes);
        return this;
    }

    /** Remove a CSS class or an array of classes from the overlay pane. */
    removePanelClass(classes: string | string[]): this {
        this._overlayRef.removePanelClass(classes);
        return this;
    }

    /** Gets the current state of the overlay's lifecycle. */
    getState(): NxOverlayState {
        return this._state;
    }
}
