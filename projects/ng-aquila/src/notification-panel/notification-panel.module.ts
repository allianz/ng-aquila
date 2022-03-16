import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';

import { NxNotificationPanelItemComponent } from './notification-item/notification-item.component';
import {
    NxNotificationItemActionsDirective,
    NxNotificationItemContentDirective,
    NxNotificationItemHeaderDirective,
    NxNotificationItemMetadataDirective,
} from './notification-item/notification-item-slots';
import { NX_NOTIFICATION_PANEL_SCROLL_STRATEGY_PROVIDER, NxNotificationPanelTriggerDirective } from './notification-panel-trigger.directive';
import { NxNotificationPanelComponent } from './panel/notification-panel.component';

@NgModule({
    imports: [NxOverlayModule, RouterModule],
    exports: [
        NxNotificationPanelComponent,
        NxNotificationPanelItemComponent,
        NxNotificationPanelTriggerDirective,
        NxNotificationItemActionsDirective,
        NxNotificationItemContentDirective,
        NxNotificationItemMetadataDirective,
        NxNotificationItemHeaderDirective,
    ],
    declarations: [
        NxNotificationPanelComponent,
        NxNotificationPanelItemComponent,
        NxNotificationPanelTriggerDirective,
        NxNotificationItemActionsDirective,
        NxNotificationItemContentDirective,
        NxNotificationItemMetadataDirective,
        NxNotificationItemHeaderDirective,
    ],
    providers: [NX_NOTIFICATION_PANEL_SCROLL_STRATEGY_PROVIDER],
})
export class NxNotificationPanelModule {}
