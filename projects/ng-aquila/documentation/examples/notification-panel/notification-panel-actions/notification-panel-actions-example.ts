import {
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxNotificationItemActionsDirective,
  NxNotificationItemContentDirective,
  NxNotificationItemHeaderDirective,
  NxNotificationItemMetadataDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent,
  NxNotificationPanelTriggerDirective,
} from '@allianz/ng-aquila/notification-panel';
import { Component } from '@angular/core';

/**
 * @title Notification Panel
 */
@Component({
  selector: 'notification-panel-actions-example',
  templateUrl: './notification-panel-actions-example.html',
  styleUrls: ['./notification-panel-actions-example.css'],
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
export class NotificationPanelActionsExampleComponent {}
