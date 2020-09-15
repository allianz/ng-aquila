import { Injectable, Injector, ComponentRef, TemplateRef, InjectionToken, Inject, Optional, SkipSelf, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { NxMessageToastComponent } from './message-toast.component';
import { NxMessageToastConfig, NxMessageToastData } from './message-toast-config';
import { NxMessageToastRef } from './message-toast-ref';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NxMessageModule } from '../message.module';

/** Injection token that can be used to specify default message toast. */
export const NX_MESSAGE_TOAST_DEFAULT_CONFIG =
  new InjectionToken<NxMessageToastConfig>('NX_MESSAGE_TOAST_DEFAULT_CONFIG');

/** A service for dispatching and displaying toast messages. */
@Injectable({ providedIn: NxMessageModule })
export class NxMessageToastService implements OnDestroy {

/**
 * Reference to the current message toast in the view *at this level* (in the Angular injector tree).
 * If there is a parent message toast service, all operations should delegate to that parent
 * via `_oldToastMessageRef`.
 */
  private _toastRefAtThisLevel: NxMessageToastRef | null = null;

  /** Reference to the currently opened message toastat *any* level. */
  get _oldToastMessageRef(): NxMessageToastRef | null {
    const parent = this._parentMessageToastService;
    return parent ? parent._oldToastMessageRef : this._toastRefAtThisLevel;
  }

  set _oldToastMessageRef(value: NxMessageToastRef | null) {
    if (this._parentMessageToastService) {
      this._parentMessageToastService._oldToastMessageRef = value;
    } else {
      this._toastRefAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    private _live: LiveAnnouncer,
    @Optional() @SkipSelf() private _parentMessageToastService: NxMessageToastService,
    @Optional() @Inject(NX_MESSAGE_TOAST_DEFAULT_CONFIG) private _defaultConfig: NxMessageToastConfig) { }

  /** Creates and dispatches a message toastwith a custom text.
   *
   * @param text Text to be used for the message toast.
   * @param config Extra configuration for the message toast.
  */
  open(text: string, config?: NxMessageToastConfig): NxMessageToastRef {
    const currentConfig = { ...new NxMessageToastConfig(), ...this._defaultConfig, ...config };
    const overlayRef = this._createOverlay(currentConfig);
    const injector = this._createInjector(currentConfig, new NxMessageToastData(text), this._injector);

    const componentPortal = new ComponentPortal(NxMessageToastComponent, undefined, injector);
    const componentRef = overlayRef.attach(componentPortal);
    const toastRef = new NxMessageToastRef(componentRef.instance, overlayRef);

    this._animateToast(toastRef, currentConfig);
    this._oldToastMessageRef = toastRef;
    return this._oldToastMessageRef;
  }

  /** Creates and dispatches a message toastwith a custom template for the content.
   *
   * @param template Template to be used for the message toast.
   * @param config Extra configuration for the message toast.
  */
  openFromTemplate(template: TemplateRef<any>, config?: NxMessageToastConfig): NxMessageToastRef {
    const currentConfig = { ...new NxMessageToastConfig(), ...this._defaultConfig, ...config };
    const overlayRef = this._createOverlay(currentConfig);
    const container = this._attachToastComponent(overlayRef, currentConfig);
    const toastRef = new NxMessageToastRef(container, overlayRef);
    const portal = new TemplatePortal(template, null!, toastRef);

    container.attachTemplatePortal(portal);
    this._animateToast(toastRef, currentConfig);
    this._oldToastMessageRef = toastRef;
    return this._oldToastMessageRef;
  }

  // Attaches the message toastcontainer component to the overlay.
  private _attachToastComponent(overlayRef: OverlayRef, config: NxMessageToastConfig): NxMessageToastComponent {
    const injector = this._createInjector(config, null, this._injector);
    const containerPortal = new ComponentPortal(NxMessageToastComponent, null, injector);
    const containerRef: ComponentRef<NxMessageToastComponent> = overlayRef.attach(containerPortal);
    containerRef.instance.config = config;

    return containerRef.instance;
  }

  // Creates a new overlay and places it in the correct place.
  private _createOverlay(config: NxMessageToastConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    const positionStrategy = this._overlay.position().global();

    positionStrategy.bottom('0');
    positionStrategy.centerHorizontally();
    overlayConfig.positionStrategy = positionStrategy;

    return this._overlay.create(overlayConfig);
  }

  /** Animates the old message toastout and the new one in. */
  private _animateToast(toastRef: NxMessageToastRef, config: NxMessageToastConfig) {
    // When the message toastis dismissed, clear the reference to it.
    toastRef.afterDismissed().subscribe(() => {
      // Clear the message toastref if it hasn't already been replaced by a newer message toast.
      if (this._oldToastMessageRef === toastRef) {
        this._oldToastMessageRef = null;
      }

      if (config.announcementMessage) {
        this._live.clear();
      }
    });

    if (this._oldToastMessageRef) {
      // If a message toastis opened, dismiss it and enter the
      // new message toastafter exit animation is complete.
      this._oldToastMessageRef.afterDismissed().subscribe(() => {
        toastRef.toastInstance.enter();
    });
      this._oldToastMessageRef.dismiss();

    } else {
      // If no message toastis in view, enter the message toast.
      toastRef.toastInstance.enter();
    }

    // If a message toastduration is provided, set up dismiss based on after the message toastis opened.
    if (config.duration && config.duration > 0) {
      toastRef.afterOpened().subscribe(() => toastRef._dismissAfter(config.duration!));
    }

    if (config.announcementMessage) {
      this._live.announce(config.announcementMessage, config.politeness);
    }
  }

  private _createInjector(config: NxMessageToastConfig, data: NxMessageToastData, injector: Injector): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(NxMessageToastConfig, config);
    tokens.set(NxMessageToastData, data);

    return new PortalInjector(injector, tokens);
  }

  /**
   * Dismisses the currently visible message toast.
   */
  dismiss(): void {
    if (this._oldToastMessageRef) {
      this._oldToastMessageRef.dismiss();
    }
  }

  ngOnDestroy() {
    if (this._toastRefAtThisLevel) {
      this._toastRefAtThisLevel.dismiss();
    }
  }
}
