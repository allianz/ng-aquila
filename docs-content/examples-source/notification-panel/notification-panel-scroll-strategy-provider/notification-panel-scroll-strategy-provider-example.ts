import { NX_NOTIFICATION_PANEL_SCROLL_STRATEGY } from '@allianz/ng-aquila/notification-panel';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close({ threshold: 100 });
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'notification-panel-scroll-strategy-provider-example',
    templateUrl: './notification-panel-scroll-strategy-provider-example.html',
    styleUrls: ['./notification-panel-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
})
export class NotificationPanelScrollStrategyProviderExampleComponent {}
