import { AnimationEvent } from '@angular/animations';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, ComponentRef, EmbeddedViewRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { messageToastAnimations } from './message-toast-animations';
import { NxMessageToastConfig, NxMessageToastContext, NxMessageToastData } from './message-toast-config';

/**
 * Internal component that wraps user-provided message toast content.
 * @docs-private
 */
@Component({
    selector: 'nx-message-toast',
    templateUrl: './message-toast.component.html',
    styleUrls: ['./message-toast.component.scss'],
    host: {
        '[attr.role]': '_role',
        '[@state]': '_animationState',
        '(@state.done)': 'onAnimationEnd($event)',
    },
    animations: [messageToastAnimations.toastState],
})
export class NxMessageToastComponent extends BasePortalOutlet implements OnDestroy {
    /** Whether the component has been destroyed. */
    private _destroyed = false;

    /** The portal outlet inside of this container into which the message toast content will be loaded. */
    @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

    /** Subject for notifying that the message toast has exited from view. */
    readonly _onExit = new Subject<any>();

    /** Subject for notifying that the message toast has finished entering the view. */
    readonly _onEnter = new Subject<any>();

    /** The state of the message toast animations. */
    _animationState = 'void';

    /** ARIA role for the message toast container. */
    _role: 'alert' | 'status' | null = null;

    _context: NxMessageToastContext;

    constructor(
        private readonly _ngZone: NgZone,
        private readonly _cdr: ChangeDetectorRef,
        /** The message toast configuration. */
        public config: NxMessageToastConfig,
        /** Injected data into the notifciation. */
        readonly data?: NxMessageToastData,
    ) {
        super();

        this._context = this.config.context!;
        this._setAriaLabels();
    }

    /** Attach a component portal as content to this message toast container. */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        this._assertNotAttached();
        return this._portalOutlet.attachComponentPortal(portal);
    }

    /** Attach a template portal as content to this message toast container. */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        this._assertNotAttached();
        return this._portalOutlet.attachTemplatePortal(portal);
    }

    /** Handle end of animations, updating the state of the notification. */
    onAnimationEnd(event: AnimationEvent) {
        const { fromState, toState } = event;

        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._completeExit();
        }

        if (toState === 'visible') {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            const onEnter = this._onEnter;

            this._ngZone.run(() => {
                onEnter.next();
                onEnter.complete();
            });
        }
    }

    /** Begin animation of message toast entrance into view. */
    enter(): void {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._cdr.detectChanges();
        }
    }

    /** Begin animation of the message toast exiting from view. */
    exit() {
        // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
        // where multiple notifications are opened in quick succession (e.g. two consecutive calls to
        // `NxMessageToastService.open`).
        this._animationState = 'hidden';
    }

    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy(): void {
        this._destroyed = true;
        this._completeExit();
    }

    /**
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    private _completeExit() {
        this._ngZone.onMicrotaskEmpty
            .asObservable()
            .pipe(take(1))
            .subscribe(() => {
                this._onExit.next();
                this._onExit.complete();
            });
    }

    /** Asserts that no content is already attached to the container. */
    private _assertNotAttached() {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach message toast content after content is already attached');
        }
    }

    _setAriaLabels() {
        // Based on the ARIA spec, `alert` and `status` roles have an
        // implicit `assertive` and `polite` politeness respectively.
        if (this.config.politeness === 'assertive' && !this.config.announcementMessage) {
            this._role = 'alert';
        } else if (this.config.politeness === 'off') {
            this._role = null;
        } else {
            this._role = 'status';
        }
    }
}
