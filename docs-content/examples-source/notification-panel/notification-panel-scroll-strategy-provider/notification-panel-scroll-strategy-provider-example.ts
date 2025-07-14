import {
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NX_NOTIFICATION_PANEL_SCROLL_STRATEGY,
  NxNotificationItemActionsDirective,
  NxNotificationItemContentDirective,
  NxNotificationItemHeaderDirective,
  NxNotificationItemMetadataDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent,
  NxNotificationPanelTriggerDirective,
} from '@allianz/ng-aquila/notification-panel';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

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
