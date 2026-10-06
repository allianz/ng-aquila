import {
  NxButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  BANNER_ACTION_LAYOUT,
  NxMessageBannerActions,
  NxMessageBannerComponent,
} from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Notification banner configuration example
 */
@Component({
  selector: 'message-banner-configuration-example',
  templateUrl: './message-banner-configuration-example.html',
  styleUrls: ['./message-banner-configuration-example.css'],
  imports: [
    NxMessageBannerComponent,
    NxMessageBannerActions,
    NxButtonComponent,
    NxPlainButtonComponent,
  ],
})
export class MessageBannerConfigurationExampleComponent {
  showContextIcon = true;
  closable = true;
  actionLayout: BANNER_ACTION_LAYOUT = 'horizontal';

  toggleLayout() {
    this.actionLayout =
      this.actionLayout === 'horizontal' ? 'vertical' : 'horizontal';
  }
}
