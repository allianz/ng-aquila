import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MessageBannerExampleComponent } from './message-banner/message-banner-example';
import { MessageBannerConfigurationExampleComponent } from './message-banner-configuration/message-banner-configuration-example';
import { MessageClosableExampleComponent } from './message-closable/message-closable-example';
import { MessageContainedExampleComponent } from './message-contained/message-contained-example';
import { MessageContextsExampleComponent } from './message-contexts/message-contexts-example';
import { MessagePlainExampleComponent } from './message-plain/message-plain-example';
import { MessageShowContextIconExampleComponent } from './message-show-context-icon/message-show-context-icon-example';
import { MessageToastContextsExampleComponent } from './message-toast-contexts/message-toast-contexts-example';
import { MessageToastCustomSettingsExampleComponent } from './message-toast-custom-settings/message-toast-custom-settings-example';
import { MessageToastOpeningExampleComponent } from './message-toast-opening/message-toast-opening-example';

const EXAMPLES = [
  MessageBannerExampleComponent,
  MessageClosableExampleComponent,
  MessageContainedExampleComponent,
  MessageBannerConfigurationExampleComponent,
  MessageContextsExampleComponent,
  MessagePlainExampleComponent,
  MessageShowContextIconExampleComponent,
  MessageToastContextsExampleComponent,
  MessageToastCustomSettingsExampleComponent,
  MessageToastOpeningExampleComponent,
];

@NgModule({
  imports: [
    NxMessageModule,
    NxErrorModule,
    NxButtonModule,
    CommonModule,
    NxHeadlineModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class MessageExamplesModule {
  static components() {
    return {
      'message-banner': MessageBannerExampleComponent,
      'message-closable': MessageClosableExampleComponent,
      'message-contained': MessageContainedExampleComponent,
      'message-banner-configuration':
        MessageBannerConfigurationExampleComponent,
      'message-contexts': MessageContextsExampleComponent,
      'message-plain': MessagePlainExampleComponent,
      'message-show-context-icon': MessageShowContextIconExampleComponent,
      'message-toast-contexts': MessageToastContextsExampleComponent,
      'message-toast-custom-settings':
        MessageToastCustomSettingsExampleComponent,
      'message-toast-opening': MessageToastOpeningExampleComponent,
    };
  }
}
