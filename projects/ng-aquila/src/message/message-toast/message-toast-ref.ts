import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { NxMessageToastComponent } from './message-toast.component';

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = 2 ** 31 - 1;

export class NxMessageToastRef {
    /** Subject for notifying the user that the message toast has been dismissed. */
    private readonly _afterDismissed = new Subject<any>();

    /** Subject for notifying the user that the message toast has opened and appeared. */
    private readonly _afterOpened = new Subject<void>();

    /**
     * Timeout ID for the duration setTimeout call. Used to clear the timeout if the message toast is
     * dismissed before the duration passes.
     */
    private _durationTimeoutId: any;

    constructor(
        /**
         * The instance of the component making up the content of the message toast.
         * @docs-private
         */
        public toastInstance: NxMessageToastComponent,
        private readonly _overlayRef: OverlayRef,
        private readonly _componentRef: ComponentRef<any>,
    ) {
        toastInstance._onExit.pipe(take(1)).subscribe(() => this._finishDismiss());
    }

    /** Dismisses the message toast. */
    dismiss(): void {
        if (!this._afterDismissed.closed) {
            this.toastInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    }

    /** Dismisses the message toast after some duration */
    _dismissAfter(duration: number): void {
        // Note that we need to cap the duration to the maximum value for setTimeout, because
        // it'll revert to 1 if somebody passes in something greater (e.g. `Infinity`). See #17234.
        this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
    }

    /** Marks the message toast as opened */
    _open(): void {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }

    /** Cleans up the DOM after closing. */
    private _finishDismiss(): void {
        this._overlayRef.dispose();

        this._afterDismissed.next();
        this._afterDismissed.complete();
    }

    /** Gets an observable that is notified when the message toast is finished closing. */
    afterDismissed(): Observable<any> {
        return this._afterDismissed.asObservable();
    }

    /** Gets an observable that is notified when the message toast has opened and appeared. */
    afterOpened(): Observable<void> {
        return this.toastInstance._onEnter;
    }
}
