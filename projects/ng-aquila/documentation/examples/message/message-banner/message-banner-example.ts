import { Component } from '@angular/core';

/**
* @title Notification banner example
*/
@Component({
  templateUrl: './message-banner-example.html'
})
export class MessageBannerExampleComponent {
  infoBannerClosed: boolean = false;
  warningBannerClosed: boolean = false;
  errorBannerClosed: boolean = false;

  showAllBanners() {
    this.infoBannerClosed = false;
    this.warningBannerClosed = false;
    this.errorBannerClosed = false;
  }
}
