import { RouterModule } from '@angular/router';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';
import { NgModule } from '@angular/core';

import { NxNotificationItemActionsDirective, NxNotificationItemContentDirective, NxNotificationItemHeaderDirective, NxNotificationItemMetadataDirective } from './notification-item/notification-item-slots';
import { NxNotificationPanelItemComponent } from './notification-item/notification-item.component';
import { NxNotificationPanelTriggerDirective } from './notification-panel-trigger.directive';
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
    providers: [],
})
export class NxNotificationPanelModule {}
