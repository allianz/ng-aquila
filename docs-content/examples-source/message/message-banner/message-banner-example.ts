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
  positiveBanner = true;
  warningBanner = true;
  criticalBanner = true;

  get allBannersVisible(): boolean {
    return (
      this.infoBanner &&
      this.positiveBanner &&
      this.warningBanner &&
      this.criticalBanner
    );
  }

  showAllBanners() {
    this.infoBanner = true;
    this.positiveBanner = true;
    this.warningBanner = true;
    this.criticalBanner = true;
  }
}
