import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MessageBannerExampleComponent } from './message-banner/message-banner-example';
import { MessageClosableExampleComponent } from './message-closable/message-closable-example';
import { MessageErrorExampleComponent } from './message-error/message-error-example';
import { MessageInfoExampleComponent } from './message-info/message-info-example';
import { MessageSuccessExampleComponent } from './message-success/message-success-example';
import { MessageToastCustomSettingsExampleComponent } from './message-toast-custom-settings/message-toast-custom-settings-example';
import { MessageToastOpeningExampleComponent } from './message-toast-opening/message-toast-opening-example';
import { MessageWarningExampleComponent } from './message-warning/message-warning-example';

const EXAMPLES = [
  MessageBannerExampleComponent,
  MessageClosableExampleComponent,
  MessageErrorExampleComponent,
  MessageInfoExampleComponent,
  MessageSuccessExampleComponent,
  MessageToastCustomSettingsExampleComponent,
  MessageToastOpeningExampleComponent,
  MessageWarningExampleComponent,
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
      'message-error': MessageErrorExampleComponent,
      'message-info': MessageInfoExampleComponent,
      'message-success': MessageSuccessExampleComponent,
      'message-toast-custom-settings':
        MessageToastCustomSettingsExampleComponent,
      'message-toast-opening': MessageToastOpeningExampleComponent,
      'message-warning': MessageWarningExampleComponent,
    };
  }
}
