import { AnimationEvent } from '@angular/animations';
import { FocusMonitor, FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
} from '@angular/core';

import { NxModalAnimations } from './modal-animations';
import { NxModalConfig } from './modal-config';

/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalOutlet without an origin.
 * @docs-private
 */
export function throwNxDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach modal content after content is already attached');
}

/**
 * Internal component that wraps user-provided modal content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * @docs-private
 */
@Component({
    selector: 'nx-modal-container',
    templateUrl: 'modal-container.component.html',
    styleUrls: ['modal-container.component.scss'],
    // Using OnPush for modals caused some G3 sync issues. Disabled until we can track them down.
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [NxModalAnimations.modalContainer, NxModalAnimations.modalContainerFullscreen],
    host: {
        class: 'nx-modal__container',
        tabindex: '-1',
        'aria-modal': 'true',
        '[attr.id]': '_id',
        '[attr.role]': '_config.role',
        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
        '[attr.aria-label]': '_config.ariaLabel',
        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
        '[class.is-expert]': '_isExpert',
        '[@modalContainer]': '{ value: !_config.fullscreen ? _state : "" }',
        '(@modalContainer.start)': '_onAnimationStart($event)',
        '(@modalContainer.done)': '_onAnimationDone($event)',
        '[@slideInOut]': '{ value: _config.fullscreen ? _state : "" }',
        '(@slideInOut.start)': '_onAnimationStart($event)',
        '(@slideInOut.done)': '_onAnimationDone($event)',
    },
})
export class NxModalContainer extends BasePortalOutlet implements AfterViewInit, OnDestroy, OnInit {
    /** The portal outlet inside of this container into which the modal content will be loaded. */
    @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

    @ViewChild('closeButton') _closeButton!: ElementRef;

    /** The class that traps and manages focus within the modal. */
    private _focusTrap!: FocusTrap;

    /** Element that was focused before the modal was opened. Save this to restore upon close. */
    private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;

    /** State of the modal animation. */
    _state: 'void' | 'enter' | 'exit' = 'enter';

    /** Emits when an animation state changes. */
    readonly _animationStateChanged = new EventEmitter<AnimationEvent>();

    /** Emits when the close button (X) is clicked. */
    readonly _closeButtonClicked = new EventEmitter<any>();

    /** ID of the element that should be considered as the modal's label. */
    _ariaLabelledBy: string | null;

    /** ID for the container DOM element. */
    _id!: string;

    /** for appearance of modal */
    _isExpert = false;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusTrapFactory: FocusTrapFactory,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
        /** The modal configuration. */
        readonly _config: NxModalConfig,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        super();
        this._ariaLabelledBy = _config.ariaLabelledBy || null;
    }

    ngAfterViewInit(): void {
        if (this._config.showCloseIcon) {
            this._focusMonitor.monitor(this._closeButton);
        }
    }

    ngOnInit(): void {
        const appearance = this._config.appearance;
        this._isExpert = appearance === 'expert';
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._closeButton);
    }

    /**
     * Attach a ComponentPortal as content to this modal container.
     * @param portal Portal to be attached as the modal content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        if (this._portalOutlet.hasAttached()) {
            throwNxDialogContentAlreadyAttachedError();
        }

        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    }

    /**
     * Attach a TemplatePortal as content to this modal container.
     * @param portal Portal to be attached as the modal content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
        if (this._portalOutlet.hasAttached()) {
            throwNxDialogContentAlreadyAttachedError();
        }

        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    }

    /**
     * Attaches a DOM portal to the modal container.
     * @param portal Portal to be attached.
     * @deprecated To be turned into a method when changed in the CDK.
     */
    attachDomPortal = (portal: DomPortal) => {
        if (this._portalOutlet.hasAttached()) {
            throwNxDialogContentAlreadyAttachedError();
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

        // If we were to attempt to focus immediately, then the content of the modal would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady();
        } else {
            const activeElement = this._document?.activeElement;

            // Otherwise ensure that focus is on the modal container. It's possible that a different
            // component tried to move focus while the open animation was running. See:
            // https://github.com/angular/components/issues/16215. Note that we only want to do this
            // if the focus isn't inside the modal already, because it's possible that the consumer
            // turned off `autoFocus` in order to move focus themselves.
            if (activeElement !== element && !element.contains(activeElement)) {
                element.focus();
            }
        }
    }

    /** Restores focus to the element that was focused before the modal opened. */
    private _restoreFocus() {
        const toFocus = this._elementFocusedBeforeDialogWasOpened;

        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this._config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            const activeElement = _getFocusedElementPierceShadowDom();
            const element = this._elementRef.nativeElement;

            // Make sure that focus is still inside the modal or is on the body (usually because a
            // non-focusable element like the backdrop was clicked) before moving it. It's possible that
            // the consumer moved it themselves before the animation was done, in which case we shouldn't
            // do anything.
            if (!activeElement || activeElement === this._document?.body || activeElement === element || element.contains(activeElement)) {
                this._focusMonitor.focusVia(toFocus as HTMLElement, 'keyboard');
            }
        }

        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }

    /** Saves a reference to the element that was focused before the modal was opened. */
    private _savePreviouslyFocusedElement() {
        if (!this._document) {
            return;
        }
        this._elementFocusedBeforeDialogWasOpened = _getFocusedElementPierceShadowDom();

        // Note that there is no focus method when rendering on the server.
        if (this._elementRef.nativeElement.focus) {
            // Move focus onto the modal immediately in order to prevent the user from accidentally
            // opening multiple modals at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(() => this._elementRef.nativeElement.focus());
        }
    }

    /** Callback, invoked whenever an animation on the host completes. */
    _onAnimationDone(event: AnimationEvent) {
        if (event.toState === 'enter') {
            this._trapFocus();
        } else if (event.toState === 'exit') {
            this._restoreFocus();
        }

        this._animationStateChanged.emit(event);
    }

    /** Callback, invoked when an animation on the host starts. */
    _onAnimationStart(event: AnimationEvent) {
        this._animationStateChanged.emit(event);
    }

    /** Starts the modal exit animation. */
    _startExitAnimation(): void {
        this._state = 'exit';

        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._cdr.markForCheck();
    }

    _closeButtonClick() {
        this._closeButtonClicked.emit();
    }
}
