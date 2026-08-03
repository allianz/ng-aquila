import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MessageBannerExampleComponent } from './message-banner/message-banner-example';
import { MessageClosableExampleComponent } from './message-closable/message-closable-example';
import { MessageContainedExampleComponent } from './message-contained/message-contained-example';
import { MessagePlainExampleComponent } from './message-plain/message-plain-example';
import { MessageToastCustomSettingsExampleComponent } from './message-toast-custom-settings/message-toast-custom-settings-example';
import { MessageToastOpeningExampleComponent } from './message-toast-opening/message-toast-opening-example';

const EXAMPLES = [
  MessageBannerExampleComponent,
  MessageClosableExampleComponent,
  MessageContainedExampleComponent,
  MessagePlainExampleComponent,
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
      'message-plain': MessagePlainExampleComponent,
      'message-toast-custom-settings':
        MessageToastCustomSettingsExampleComponent,
      'message-toast-opening': MessageToastOpeningExampleComponent,
    };
  }
}
