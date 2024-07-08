import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxIconButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
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
    selector: 'notification-panel-mixed-example',
    templateUrl: './notification-panel-mixed-example.html',
    styleUrls: ['./notification-panel-mixed-example.css'],
    standalone: true,
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
