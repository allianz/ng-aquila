import { Component } from '@angular/core';

/**
* @title Notification banner example
*/
@Component({
  selector: 'message-banner-example',
  templateUrl: './message-banner-example.html',
  styleUrls: ['./message-banner-example.css']
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
