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
import { NxNotificationPanelTriggerDirective } from './notification-panel-trigger.directive';
import { NxNotificationPanelComponent } from './panel/notification-panel.component';

@NgModule({
    imports: [
        NxOverlayModule,
        RouterModule,
        NxNotificationPanelComponent,
        NxNotificationPanelItemComponent,
        NxNotificationPanelTriggerDirective,
        NxNotificationItemActionsDirective,
        NxNotificationItemContentDirective,
        NxNotificationItemMetadataDirective,
        NxNotificationItemHeaderDirective,
    ],
    exports: [
        NxNotificationPanelComponent,
        NxNotificationPanelItemComponent,
        NxNotificationPanelTriggerDirective,
        NxNotificationItemActionsDirective,
        NxNotificationItemContentDirective,
        NxNotificationItemMetadataDirective,
        NxNotificationItemHeaderDirective,
    ],
    providers: [],
})
export class NxNotificationPanelModule {}
