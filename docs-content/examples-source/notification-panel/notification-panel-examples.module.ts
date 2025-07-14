import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxNotificationPanelModule } from '@allianz/ng-aquila/notification-panel';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamplesSharedModule } from '../examples-shared.module';
import { NotificationPanelActionsExampleComponent } from './notification-panel-actions/notification-panel-actions-example';
import { NotificationPanelClickableExampleComponent } from './notification-panel-clickable/notification-panel-clickable-example';
import { NotificationPanelMixedExampleComponent } from './notification-panel-mixed/notification-panel-mixed-example';
import { NotificationPanelScrollStrategyProviderExampleComponent } from './notification-panel-scroll-strategy-provider/notification-panel-scroll-strategy-provider-example';

const EXAMPLES = [
  NotificationPanelActionsExampleComponent,
  NotificationPanelClickableExampleComponent,
  NotificationPanelMixedExampleComponent,
  NotificationPanelScrollStrategyProviderExampleComponent,
];

@NgModule({
  imports: [
    NxMessageModule,
    NxNotificationPanelModule,
    NxIconModule,
    RouterModule,
    NxLinkModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class NotificationExamplesModule {
  static components() {
    return {
      'notification-panel-actions': NotificationPanelActionsExampleComponent,
      'notification-panel-clickable':
        NotificationPanelClickableExampleComponent,
      'notification-panel-mixed': NotificationPanelMixedExampleComponent,
      'notification-panel-scroll-strategy-provider':
        NotificationPanelScrollStrategyProviderExampleComponent,
    };
  }
}
