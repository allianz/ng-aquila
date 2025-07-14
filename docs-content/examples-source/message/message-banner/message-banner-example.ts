import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxMessageBannerComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Notification banner example
 */
@Component({
  selector: 'message-banner-example',
  templateUrl: './message-banner-example.html',
  styleUrls: ['./message-banner-example.css'],
  imports: [NxMessageBannerComponent, NxButtonComponent],
})
export class MessageBannerExampleComponent {
  infoBanner = true;
  warningBanner = true;
  errorBanner = true;

  showAllBanners() {
    this.infoBanner = true;
    this.warningBanner = true;
    this.errorBanner = true;
  }
}
