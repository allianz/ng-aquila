import {
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxNotificationItemContentDirective,
  NxNotificationItemHeaderDirective,
  NxNotificationItemMetadataDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent,
  NxNotificationPanelTriggerDirective,
} from '@allianz/ng-aquila/notification-panel';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Notification Panel
 */
@Component({
  selector: 'notification-panel-mixed-example',
  templateUrl: './notification-panel-mixed-example.html',
  styleUrls: ['./notification-panel-mixed-example.css'],
  imports: [
    NxIconButtonComponent,
    NxNotificationPanelTriggerDirective,
    NxIconComponent,
    NxNotificationPanelComponent,
    NxNotificationItemHeaderDirective,
    NxCopytextComponent,
    NxPlainButtonComponent,
    NxNotificationPanelItemComponent,
    RouterLink,
    NxNotificationItemMetadataDirective,
    NxNotificationItemContentDirective,
  ],
})
export class NotificationPanelMixedExampleComponent {}
