import { Component } from '@angular/core';
import {
    NxIconButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxNotificationItemActionsDirective,
    NxNotificationItemContentDirective,
    NxNotificationItemHeaderDirective,
    NxNotificationItemMetadataDirective,
    NxNotificationPanelComponent,
    NxNotificationPanelItemComponent,
    NxNotificationPanelTriggerDirective,
} from '@aposin/ng-aquila/notification-panel';

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
