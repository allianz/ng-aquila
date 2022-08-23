import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentRef, ElementRef, EmbeddedViewRef, Inject, Optional, ViewChild } from '@angular/core';

import { NxOverlayConfig } from './overlay-config';

/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalOutlet without an origin.
 * @docs-private
 */
export function throwNxOverlayContentAlreadyAttachedError() {
    throw Error('Attempting to attach overlay content after content is already attached');
}

/**
 * Internal component that wraps user-provided overlay content.
 */
@Component({
    selector: 'nx-overlay-container',
    templateUrl: 'overlay-container.component.html',
    styleUrls: ['overlay-container.component.scss'],
    // Using OnPush for overlays caused some G3 sync issues. Disabled until we can track them down.
    changeDetection: ChangeDetectionStrategy.Default,
    host: {
        class: 'nx-overlay-container',
        '[attr.id]': '_id',
        '[attr.role]': '_config.role',
        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
        '[attr.aria-label]': '_config.ariaLabel',
        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
    },
})
export class NxOverlayContainerComponent extends BasePortalOutlet {
    /** The portal outlet inside of this container into which the overlay content will be loaded. */
    @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

    /** The class that traps and manages focus within the overlay. */
    private _focusTrap!: ConfigurableFocusTrap;

    /** Element that was focused before the overlay was opened. Save this to restore upon close. */
    private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    /** ID of the element that should be considered as the overlay's label. */
    _ariaLabelledBy: string | null;

    /** ID for the container DOM element. */
    _id!: string;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusTrapFactory: ConfigurableFocusTrapFactory,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
        /** The overlay configuration. */
        readonly _config: NxOverlayConfig,
    ) {
        super();
        this._ariaLabelledBy = _config.ariaLabelledBy || null;
    }

    get elementRef() {
        return this._elementRef;
    }

    /**
     * Attach a ComponentPortal as content to this overlay container.
     * @param portal Portal to be attached as the overlay content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this._portalOutlet.hasAttached()) {
            throwNxOverlayContentAlreadyAttachedError();
        }

        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    }

    /**
     * Attach a TemplatePortal as content to this overlay container.
     * @param portal Portal to be attached as the overlay content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this._portalOutlet.hasAttached()) {
            throwNxOverlayContentAlreadyAttachedError();
        }
        this._trapFocus();

        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    }

    /**
     * Attaches a DOM portal to the overlay container.
     * @param portal Portal to be attached.
     * @deprecated To be turned into a method when changed in the CDK.
     */
    attachDomPortal = (portal: DomPortal) => {
        if (this._portalOutlet.hasAttached()) {
            throwNxOverlayContentAlreadyAttachedError();
        }

        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachDomPortal(portal);
    };

    /** Moves the focus inside the focus trap. */
    private _trapFocus() {
        const element = this._elementRef.nativeElement;

        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(element);
        }

        // If we were to attempt to focus immediately, then the content of the overlay would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady();
        } else {
            const activeElement = this._document?.activeElement;

            // Otherwise ensure that focus is on the overlay container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the overlay already, because it's possible that the consumer
            // turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    }

    /** Restores focus to the element that was focused before the overlay opened. */
    restoreFocus() {
        const toFocus = this._elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this._config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            const activeElement = this._document?.activeElement;
            const element = this._elementRef.nativeElement;

            // Make sure that focus is still inside the overlay or is on the body (usually because a
            // non-focusable element like the backdrop was clicked) before moving it. It's possible that
            // the consumer moved it themselves before the animation was done, in which case we shouldn't
            // do anything.
            if (!activeElement || activeElement === this._document?.body || activeElement === element || element.contains(activeElement)) {
                toFocus.focus();
            }
        }

        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }

    /** Saves a reference to the element that was focused before the overlay was opened. */
    private _savePreviouslyFocusedElement() {
        if (!this._document) {
            return;
        }
        this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;

        // Note that there is no focus method when rendering on the server.
        if (this._elementRef.nativeElement.focus) {
            // Move focus onto the overlay immediately in order to prevent the user from accidentally
            // opening multiple overlays at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(() => this._elementRef.nativeElement.focus());
        }
    }
}
