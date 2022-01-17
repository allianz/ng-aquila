import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxNotificationPanelModule } from '@aposin/ng-aquila/notification-panel';
import { ExamplesSharedModule } from '../examples-shared.module';
import { NotificationPanelActionsExampleComponent } from './notification-panel-actions/notification-panel-actions-example';
import { NotificationPanelClickableExampleComponent } from './notification-panel-clickable/notification-panel-clickable-example';
import { NotificationPanelMixedExampleComponent } from './notification-panel-mixed/notification-panel-mixed-example';

const EXAMPLES = [
    NotificationPanelActionsExampleComponent,
    NotificationPanelClickableExampleComponent,
    NotificationPanelMixedExampleComponent,
];

@NgModule({
    imports: [
        NxMessageModule,
        NxNotificationPanelModule,
        NxIconModule,
        RouterModule,
        NxLinkModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class NotificationExamplesModule {
    static components() {
        return {
            'notification-panel-actions':
                NotificationPanelActionsExampleComponent,
            'notification-panel-clickable':
                NotificationPanelClickableExampleComponent,
            'notification-panel-mixed': NotificationPanelMixedExampleComponent,
        };
    }
}
