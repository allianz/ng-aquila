import { Overlay, OverlayConfig, OverlayContainer, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, OnDestroy, Optional, SkipSelf, StaticProvider, TemplateRef } from '@angular/core';
import { defer, Observable, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NxModalConfig } from './modal-config';
import { NxModalContainer } from './modal-container.component';
import { NxModalRef } from './modal-ref';

/** Injection token that can be used to access the data that was passed in to a modal. */
export const NX_MODAL_DATA = new InjectionToken<any>('NxModalData');

/** Injection token that can be used to specify default modal options. */
export const NX_MODAL_DEFAULT_OPTIONS = new InjectionToken<NxModalConfig>('nx-modal-default-options');

/** Injection token that determines the scroll handling while a modal is open. */
export const NX_MODAL_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-modal-scroll-strategy');

/** @docs-private */
export function NX_MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const NX_MODAL_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_MODAL_SCROLL_STRATEGY,
    useFactory: NX_MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

/**
 * Service to open Material Design modal modals.
 */
@Injectable()
export class NxDialogService implements OnDestroy {
    private readonly _openModalsAtThisLevel: NxModalRef<any>[] = [];
    private readonly _afterAllClosedAtThisLevel = new Subject<void>();
    private readonly _afterOpenedAtThisLevel = new Subject<NxModalRef<any>>();
    private readonly _ariaHiddenElements = new Map<Element, string | null>();

    /** Keeps track of the currently-open modals. */
    get openModals(): NxModalRef<any>[] {
        return this._parentDialogService ? this._parentDialogService.openModals : this._openModalsAtThisLevel;
    }

    /** Stream that emits when a modal has been opened. */
    get afterOpened(): Subject<NxModalRef<any>> {
        return this._parentDialogService ? this._parentDialogService.afterOpened : this._afterOpenedAtThisLevel;
    }

    get _afterAllClosed(): Subject<void> {
        const parent = this._parentDialogService;
        return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
    }

    /**
     * Stream that emits when all open modal have finished closing.
     * Will emit on subscribe if there are no open modals to begin with.
     */
    readonly afterAllClosed: Observable<void> = defer(() =>
        this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined)),
    ) as Observable<any>;

    private readonly _destroyed = new Subject<void>();

    /** Strategy factory that will be used to handle scrolling while the modal panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    constructor(
        private readonly _overlay: Overlay,
        private readonly _injector: Injector,
        @Optional() @Inject(NX_MODAL_DEFAULT_OPTIONS) private readonly _defaultOptions: NxModalConfig | null,
        @Optional() @SkipSelf() private readonly _parentDialogService: NxDialogService | null,
        private readonly _overlayContainer: OverlayContainer,
        @Inject(NX_MODAL_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
    ) {}

    /**
     * Opens a modal modal containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog, or a TemplateRef to instantiate as the modal content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened modal.
     */
    open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: NxModalConfig<D>): NxModalRef<T, R> {
        config = _applyConfigDefaults(config, this._defaultOptions || new NxModalConfig());

        if (config.id && this.getModalById(config.id)) {
            throw Error(`Modal with id "${config.id}" exists already. The modal id must be unique.`);
        }

        const overlayRef = this._createOverlay(config);
        const modalContainer = this._attachModalContainer(overlayRef, config);
        const modalRef = this._attachModalContent<T, R>(componentOrTemplateRef, modalContainer, overlayRef, config);

        // If this is the first modal that we're opening, hide all the non-overlay content.
        if (!this.openModals.length) {
            this._hideNonModalContentFromAssistiveTechnology();
        }

        this.openModals.push(modalRef);
        modalRef.afterClosed().subscribe(() => this._removeOpenModal(modalRef));
        this.afterOpened.next(modalRef);

        return modalRef;
    }

    /**
     * Closes all of the currently-open modals.
     */
    closeAll(): void {
        this._closeModals(this.openModals);
    }

    /**
     * Finds an open modal by its id.
     * @param id ID to use when looking up the modal.
     */
    getModalById(id: string): NxModalRef<any> | undefined {
        return this.openModals.find(modal => modal.id === id);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();

        // Only close the modals at this level on destroy
        // since the parent service may still be active.
        this._closeModals(this._openModalsAtThisLevel);
        this._afterAllClosedAtThisLevel.complete();
        this._afterOpenedAtThisLevel.complete();
    }

    /**
     * Creates the overlay into which the modal will be loaded.
     * @param config The modal configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    private _createOverlay(config: NxModalConfig): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    /**
     * Creates an overlay config from a modal config.
     * @param modalConfig The modal configuration.
     * @returns The overlay configuration.
     */
    private _getOverlayConfig(modalConfig: NxModalConfig): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: modalConfig.scrollStrategy || this._scrollStrategyFactory(),
            panelClass: modalConfig.panelClass,
            hasBackdrop: modalConfig.hasBackdrop,
            minWidth: modalConfig.minWidth,
            minHeight: modalConfig.minHeight,
            maxWidth: modalConfig.maxWidth,
            maxHeight: modalConfig.maxHeight,
            disposeOnNavigation: modalConfig.closeOnNavigation,
            direction: modalConfig.direction,
        });

        if (modalConfig.backdropClass) {
            state.backdropClass = modalConfig.backdropClass;
        }

        if (modalConfig.fullscreen) {
            state.maxWidth = '';
            state.maxHeight = '';
        }

        return state;
    }

    /**
     * Attaches an NxModalContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The modal configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    private _attachModalContainer(overlay: OverlayRef, config: NxModalConfig): NxModalContainer {
        const userInjector = config?.viewContainerRef?.injector;
        const injector = Injector.create({
            parent: userInjector || this._injector,
            providers: [{ provide: NxModalConfig, useValue: config }],
        });

        const containerPortal = new ComponentPortal(NxModalContainer, config.viewContainerRef, injector, config.componentFactoryResolver);
        const containerRef = overlay.attach<NxModalContainer>(containerPortal);

        return containerRef.instance;
    }

    /**
     * Attaches the user-provided component to the already-created NxModalContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog, or a TemplateRef to instantiate as the content.
     * @param modalContainer Reference to the wrapping NxModalContainer.
     * @param overlayRef Reference to the overlay in which the modal resides.
     * @param config The modal configuration.
     * @returns A promise resolving to the NxModalRef that should be returned to the user.
     */
    private _attachModalContent<T, R>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        modalContainer: NxModalContainer,
        overlayRef: OverlayRef,
        config: NxModalConfig,
    ): NxModalRef<T, R> {
        // Create a reference to the modal we're creating in order to give the user a handle
        // to modify and close it.
        const modalRef = new NxModalRef<T, R>(overlayRef, modalContainer, config.id);

        // If fullscreen is set to true, set the width and height to be the the fullscreen with and height
        // Add a class for styling the fullscreen modal
        if (config.fullscreen) {
            config.width = '100%';
            config.height = '100%';
            overlayRef.addPanelClass('is-fullscreen');
        }

        // When the modal backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef
                .backdropClick()
                .pipe(takeUntil(this._destroyed))
                .subscribe(() => {
                    if (!modalRef.disableClose) {
                        modalRef.close();
                    }
                });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            modalContainer.attachTemplatePortal(new TemplatePortal<T>(componentOrTemplateRef, null!, { $implicit: config.data, modalRef } as any));
        } else {
            const injector = this._createInjector<T>(config, modalRef, modalContainer);
            const contentRef = modalContainer.attachComponentPortal<T>(new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector));
            modalRef.componentInstance = contentRef.instance;
        }

        modalRef.updateSize(config.width, config.height).updatePosition(config.position);

        return modalRef;
    }

    /**
     * Creates a custom injector to be used inside the modal. This allows a component loaded inside
     * of a modal to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the modal.
     * @param modalRef Reference to the modal.
     * @param modalContainer Modal container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the modal.
     */
    private _createInjector<T>(config: NxModalConfig, modalRef: NxModalRef<T>, modalContainer: NxModalContainer): Injector {
        const userInjector = config?.viewContainerRef?.injector;

        // The NxModalContainer is injected in the portal as the NxModalContainer and the dialog's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the NxModalContainer is explicitly
        // added to the injection tokens.
        const providers: StaticProvider[] = [
            { provide: NxModalContainer, useValue: modalContainer },
            { provide: NX_MODAL_DATA, useValue: config.data },
            { provide: NxModalRef, useValue: modalRef },
        ];

        return Injector.create({ parent: userInjector || this._injector, providers });
    }

    /**
     * Removes a modal from the array of open modals.
     * @param modalRef Modal to be removed.
     */
    private _removeOpenModal(modalRef: NxModalRef<any>) {
        const index = this.openModals.indexOf(modalRef);

        if (index > -1) {
            this.openModals.splice(index, 1);

            // If all the modals were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openModals.length) {
                this._ariaHiddenElements.forEach((previousValue, element) => {
                    if (previousValue) {
                        element.setAttribute('aria-hidden', previousValue);
                    } else {
                        element.removeAttribute('aria-hidden');
                    }
                });

                this._ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    }

    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     */
    private _hideNonModalContentFromAssistiveTechnology() {
        const overlayContainer = this._overlayContainer.getContainerElement();

        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            const siblings = overlayContainer.parentElement.children;

            for (let i = siblings.length - 1; i > -1; i--) {
                const sibling = siblings[i];

                if (sibling !== overlayContainer && sibling.nodeName !== 'SCRIPT' && sibling.nodeName !== 'STYLE' && !sibling.hasAttribute('aria-live')) {
                    this._ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    }

    /** Closes all of the modals in an array. */
    private _closeModals(modals: NxModalRef<any>[]) {
        let i = modals.length;

        while (i--) {
            // The `_openModals` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            modals[i].close();
        }
    }
}

/**
 * Applies default options to the modal config.
 * @param config Config to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(config?: NxModalConfig, defaultOptions?: NxModalConfig): NxModalConfig {
    return { ...defaultOptions, ...config };
}
