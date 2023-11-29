import { Direction, Directionality } from '@angular/cdk/bidi';
import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Injector, OnDestroy, Optional, SkipSelf, StaticProvider, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { NxOverlayConfig } from './overlay-config';
import { NxOverlayContainerComponent } from './overlay-container.component';
import { NxOverlayRef } from './overlay-ref';
import { NxOverlayPositionBuilder } from './position-builder';

/** Injection token that determines the scroll handling while a overlay is open. */
export const NX_OVERLAY_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-overlay-scroll-strategy');

/** @docs-private */
export function NX_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_OVERLAY_SCROLL_STRATEGY,
    useFactory: NX_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

/** Possible states of the lifecycle of a overlay. */
export const enum NxOverlayState {
    OPEN,
    CLOSED,
}

@Injectable()
export class NxOverlayService implements OnDestroy {
    private readonly _afterAllClosedAtThisLevel = new Subject<void>();
    private readonly _afterOpenedAtThisLevel = new Subject<NxOverlayRef<any>>();
    private readonly _openOverlaysAtThisLevel: NxOverlayRef<any>[] = [];

    /** Strategy factory that will be used to handle scrolling while an overlay panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    constructor(
        private readonly _overlay: Overlay,
        private readonly _injector: Injector,
        private readonly _router: Router,
        private readonly _positionBuilder: NxOverlayPositionBuilder,
        @Optional() @SkipSelf() private readonly _parentOverlayService: NxOverlayService | null,
        @Optional() private readonly _dir: Directionality | null,
        @Inject(NX_OVERLAY_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
    ) {}

    /** Keeps track of the currently-open overlays. */
    get openOverlays(): NxOverlayRef<any>[] {
        return this._parentOverlayService ? this._parentOverlayService.openOverlays : this._openOverlaysAtThisLevel;
    }

    /** The text direction of the containing app. */
    get dir(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    /**
     * Opens a panel containing the given component and attaches it to an element.
     * @param componentOrTemplateRef Type of the component to load into the dialog, or a TemplateRef to instantiate as the panel content.
     * @param origin Reference element for positioning.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened panel.
     */
    open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        origin: FlexibleConnectedPositionStrategyOrigin,
        config?: NxOverlayConfig<D>,
    ): NxOverlayRef<T, R> {
        config = _applyConfigDefaults(config, new NxOverlayConfig());

        if (config.id && this.getOverlayById(config.id)) {
            throw Error(`Overlay with id "${config.id}" exists already. The overlay id must be unique.`);
        }

        const cdkOverlayRef = this._createOverlay(config, origin);
        const overlayContainer = this._attachOverlayContainer(cdkOverlayRef, config);
        const overlayRef = this._attachOverlayContent<T, R>(componentOrTemplateRef, overlayContainer, cdkOverlayRef, config, origin);

        this.openOverlays.push(overlayRef);
        overlayRef.afterClosed().subscribe(() => this._removeOpenOverlay(overlayRef));

        if (config.triggerButton) {
            config.triggerButton.setTriggerActive();
        }
        return overlayRef;
    }

    /**
     * Finds an open overlay by its id.
     * @param id ID to use when looking up the overlay.
     */
    getOverlayById(id: string): NxOverlayRef<any> | undefined {
        return this.openOverlays.find(overlay => overlay.id === id);
    }

    ngOnDestroy(): void {
        // Only close the overlays at this level on destroy
        // since the parent service may still be active.
        this._closeOverlays(this._openOverlaysAtThisLevel);
        this._afterAllClosedAtThisLevel.complete();
        this._afterOpenedAtThisLevel.complete();
    }

    /**
     * Creates the overlay into which the overlay will be loaded.
     * @param config The overlay configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    private _createOverlay(config: NxOverlayConfig, origin: FlexibleConnectedPositionStrategyOrigin): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config, origin);
        return this._overlay.create(overlayConfig);
    }

    /**
     * Creates a CDK overlay configuration from the overlay service config.
     * @param overlayConfig The nx overlay service configuration.
     * @returns The CDK overlay configuration.
     */
    private _getOverlayConfig(overlayConfig: NxOverlayConfig, origin: FlexibleConnectedPositionStrategyOrigin): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: overlayConfig.positionStrategy || this._positionBuilder.createPositionStrategy(origin, overlayConfig),
            scrollStrategy: overlayConfig.scrollStrategy || this._scrollStrategyFactory(),
            panelClass: overlayConfig.panelClass,
            hasBackdrop: overlayConfig.hasBackdrop,
            width: overlayConfig.width,
            height: overlayConfig.height,
            minWidth: overlayConfig.minWidth,
            minHeight: overlayConfig.minHeight,
            maxWidth: overlayConfig.maxWidth,
            maxHeight: overlayConfig.maxHeight,
            disposeOnNavigation: overlayConfig.closeOnNavigation,
            direction: this.dir,
        });

        if (overlayConfig.backdropClass) {
            state.backdropClass = overlayConfig.backdropClass;
        }

        return state;
    }

    get isRtl(): boolean {
        return this._dir?.value === 'rtl';
    }

    /**
     * Attaches an NxOverlayContainer to the already-created overlay.
     * @param cdkOverlay Reference to the dialog's underlying overlay.
     * @param config The overlay configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    private _attachOverlayContainer(cdkOverlay: OverlayRef, config: NxOverlayConfig): NxOverlayContainerComponent {
        const userInjector = config?.viewContainerRef?.injector;
        const injector = Injector.create({
            parent: userInjector || this._injector,
            providers: [{ provide: NxOverlayConfig, useValue: config }],
        });

        const containerPortal = new ComponentPortal(NxOverlayContainerComponent, config.viewContainerRef, injector, config.componentFactoryResolver);
        const containerRef = cdkOverlay.attach<NxOverlayContainerComponent>(containerPortal);

        return containerRef.instance;
    }

    /**
     * Attaches the user-provided component to the already-created NxOverlayContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog, or a TemplateRef to instantiate as the content.
     * @param overlayContainer Reference to the wrapping NxOverlayContainer.
     * @param cdkOverlayRef Reference to the overlay in which the overlay resides.
     * @param config The overlay configuration.
     * @returns A promise resolving to the NxOverlayRef that should be returned to the user.
     */
    private _attachOverlayContent<T, R>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        overlayContainer: NxOverlayContainerComponent,
        cdkOverlayRef: OverlayRef,
        config: NxOverlayConfig,
        origin: FlexibleConnectedPositionStrategyOrigin,
    ): NxOverlayRef<T, R> {
        // Create a reference to the overlay we're creating in order to give the user a handle
        // to modify and close it.
        const overlayRef = new NxOverlayRef<T, R>(cdkOverlayRef, overlayContainer, origin, this._router, config.id);

        if (componentOrTemplateRef instanceof TemplateRef) {
            overlayContainer.attachTemplatePortal(new TemplatePortal<T>(componentOrTemplateRef, null!, { $implicit: overlayRef } as any));
        } else {
            const injector = this._createInjector<T>(config, overlayRef, overlayContainer);
            const contentRef = overlayContainer.attachComponentPortal<T>(new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector));
            overlayRef.componentInstance = contentRef.instance;
        }

        return overlayRef;
    }

    /**
     * Creates a custom injector to be used inside the overlay. This allows a component loaded inside
     * of a overlay to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the overlay.
     * @param overlayRef Reference to the overlay.
     * @param overlayContainer Overlay container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the overlay.
     */
    private _createInjector<T>(config: NxOverlayConfig, overlayRef: NxOverlayRef<T>, overlayContainer: NxOverlayContainerComponent): Injector {
        const userInjector = config?.viewContainerRef?.injector;

        // The NxOverlayContainer is injected in the portal as the NxOverlayContainer and the overlays's
        // content are created out of the same ViewContainerRef and as such, are siblings for injector
        // purposes. To allow the hierarchy that is expected, the NxOverlayContainer is explicitly
        // added to the injection tokens.
        const providers: StaticProvider[] = [
            { provide: NxOverlayContainerComponent, useValue: overlayContainer },
            { provide: NxOverlayRef, useValue: overlayRef },
        ];

        return Injector.create({ parent: userInjector || this._injector, providers });
    }

    /**
     * Removes a overlay from the array of open overlays.
     * @param overlayRef Overlay to be removed.
     */
    private _removeOpenOverlay(overlayRef: NxOverlayRef<any>) {
        const index = this.openOverlays.indexOf(overlayRef);

        if (index > -1) {
            this.openOverlays.splice(index, 1);
        }
    }

    /** Closes all of the overlays in an array. */
    private _closeOverlays(overlays: NxOverlayRef<any>[]) {
        let i = overlays.length;

        while (i--) {
            // The `_openOverlays` property isn't updated after close until the rxjs subscription
            // runs on the next microtask, in addition to modifying the array as we're going
            // through it. We loop through all of them and call close without assuming that
            // they'll be removed from the list instantaneously.
            overlays[i].close();
        }
    }
}

/**
 * Applies default options to the overlay config.
 * @param config Config to be modified.
 * @param defaultOptions Default options provided.
 * @returns The new configuration object.
 */
function _applyConfigDefaults(config?: NxOverlayConfig, defaultOptions?: NxOverlayConfig): NxOverlayConfig {
    return { ...defaultOptions, ...config };
}
