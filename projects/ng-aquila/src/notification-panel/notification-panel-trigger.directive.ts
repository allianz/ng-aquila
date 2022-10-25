import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Directive, ElementRef, Inject, InjectionToken, Input, Optional, Self, TemplateRef } from '@angular/core';
import { NxOverlayConfig, NxOverlayRef, NxOverlayService, NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { take } from 'rxjs/operators';

/** Injection token that determines the scroll handling while a notification-panel is open. */
export const NX_NOTIFICATION_PANEL_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-notification-panel-scroll-strategy');

/** @docs-private */
export function NX_NOTIFICATION_PANEL_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_NOTIFICATION_PANEL_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY,
    useFactory: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

const DEFAULT_CONFIG: NxOverlayConfig = {
    direction: 'bottom-start',
    fallbackOrientation: 'vertical',
    autoFocus: true,
    offset: 8,
};

@Directive({
    selector: '[nxNotificationPanelTriggerFor]',
    host: {
        '(click)': 'open()',
    },
})
export class NxNotificationPanelTriggerDirective {
    private _overlayRef!: NxOverlayRef<any> | null;

    @Input('nxNotificationPanelTriggerFor') set notificationPanel(value: TemplateRef<any>) {
        this._panelTemplate = value;
    }
    get notificationPanel() {
        return this._panelTemplate;
    }
    private _panelTemplate!: TemplateRef<any>;

    /** Strategy factory that will be used to handle scrolling while the notification-panel panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    constructor(
        private readonly _nxOverlay: NxOverlayService,
        private readonly _element: ElementRef<HTMLElement>,
        @Optional() @Self() private readonly _triggerButton: NxTriggerButton | null,
        @Inject(NX_NOTIFICATION_PANEL_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
    ) {}

    open() {
        if (this._overlayRef) {
            return;
        }
        const config: NxOverlayConfig = { ...DEFAULT_CONFIG, scrollStrategy: this._scrollStrategyFactory(), triggerButton: this._triggerButton ?? undefined };
        this._overlayRef = this._nxOverlay.open(this._panelTemplate, this._element, config);
        this._overlayRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => this.close());
    }

    close() {
        if (this._overlayRef) {
            this._overlayRef.close();
            this._overlayRef = null;
        }
    }
}
