import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import {
    NxIconButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NX_NOTIFICATION_PANEL_SCROLL_STRATEGY,
    NxNotificationItemActionsDirective,
    NxNotificationItemContentDirective,
    NxNotificationItemHeaderDirective,
    NxNotificationItemMetadataDirective,
    NxNotificationPanelComponent,
    NxNotificationPanelItemComponent,
    NxNotificationPanelTriggerDirective,
} from '@aposin/ng-aquila/notification-panel';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
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
    imports: [
        NxIconButtonComponent,
        NxNotificationPanelTriggerDirective,
        NxIconComponent,
        NxNotificationPanelComponent,
        NxNotificationItemHeaderDirective,
        NxCopytextComponent,
        NxPlainButtonComponent,
        NxNotificationPanelItemComponent,
        NxNotificationItemMetadataDirective,
        NxNotificationItemContentDirective,
        NxNotificationItemActionsDirective,
        NxLinkComponent,
    ],
})
export class NotificationPanelScrollStrategyProviderExampleComponent {}
